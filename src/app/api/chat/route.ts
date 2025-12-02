import { NextResponse } from 'next/server';
import { model } from '@/lib/gemini';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const { message, history, flowContext, sessionId = uuidv4() } = await req.json();

        // 1. Log User Message to Analytics (if configured)
        if (isFirebaseConfigured) {
            try {
                await addDoc(collection(db, 'analytics_events'), {
                    sessionId,
                    type: 'user_message',
                    content: message,
                    timestamp: new Date().toISOString()
                });
            } catch (e) {
                console.warn('Failed to log user message to Firestore', e);
            }
        }

        // Construct the prompt
        const systemPrompt = `
      You are an advanced AI assistant for a Customer Experience (CX) simulation.
      Your goal is to simulate a contact center agent.
      
      Context:
      - Current Flow: ${JSON.stringify(flowContext || 'No specific flow active')}
      - Conversation History: ${JSON.stringify(history || [])}
      
      Tools:
      - You can simulate checking an order status. If the user provides an Order ID, pretend to check it.
      - Mock Data: Order 12345 is Shipped. Order 67890 is Processing.
      
      Instructions:
      1. Identify the user's intent.
      2. If the intent matches a node in the flow, guide the user along that path.
      3. If the user asks for Order Status, ask for the Order ID if not provided.
      4. If Order ID is provided, use the mock data to respond.
      5. Return the response in JSON format: { "intent": "string", "response": "string", "suggested_actions": [] }
    `;

        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: 'model',
                    parts: [{ text: 'Understood. I am ready to simulate the CX agent.' }],
                }
            ],
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.candidates?.[0].content.parts[0].text;

        // Attempt to parse JSON response from Gemini
        let jsonResponse;
        try {
            const cleanText = text?.replace(/```json/g, '').replace(/```/g, '').trim() || '{}';
            jsonResponse = JSON.parse(cleanText);
        } catch (e) {
            jsonResponse = {
                intent: 'unknown',
                response: text || "I'm sorry, I didn't catch that.",
                suggested_actions: []
            };
        }

        // 2. Log Bot Response to Analytics (if configured)
        if (isFirebaseConfigured) {
            try {
                await addDoc(collection(db, 'analytics_events'), {
                    sessionId,
                    type: 'bot_response',
                    intent: jsonResponse.intent,
                    content: jsonResponse.response,
                    timestamp: new Date().toISOString()
                });

                // 3. Save Session State
                await setDoc(doc(db, 'sessions', sessionId), {
                    updatedAt: new Date().toISOString(),
                    lastMessage: message,
                    lastResponse: jsonResponse.response
                }, { merge: true });
            } catch (e) {
                console.warn('Failed to log bot response to Firestore', e);
            }
        }

        return NextResponse.json({ ...jsonResponse, sessionId });
    } catch (error: any) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
