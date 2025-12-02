'use client';

'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, RefreshCw } from 'lucide-react';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface Message {
    role: 'user' | 'model';
    text: string;
    timestamp: number;
    suggested_actions?: string[];
}

export default function SimulatorPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: 'Hello! I am your virtual agent. How can I assist you today?', timestamp: Date.now() }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [flowContext, setFlowContext] = useState<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load the current flow context on mount to pass to the API
    useEffect(() => {
        const loadFlow = async () => {
            if (!isFirebaseConfigured) return;
            try {
                const docRef = doc(db, 'flows', 'default-flow');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFlowContext(docSnap.data());
                }
            } catch (e) {
                console.error("Failed to load flow context", e);
            }
        };
        loadFlow();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || loading) return;

        const userMsg: Message = { role: 'user', text: text, timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg.text,
                    history: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
                    flowContext: flowContext
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const botMsg: Message = {
                role: 'model',
                text: data.response || "I'm sorry, I couldn't process that.",
                timestamp: Date.now(),
                suggested_actions: data.suggested_actions
            };
            setMessages(prev => [...prev, botMsg]);

        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { role: 'model', text: "Error: Could not connect to the agent.", timestamp: Date.now() }]);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = () => sendMessage(input);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div style={{ height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column' }}>
            <header style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Simulator</h1>
                    <p style={{ color: '#94a3b8' }}>Test your agent in real-time.</p>
                </div>
                <button
                    className="btn-primary"
                    onClick={() => setMessages([{ role: 'model', text: 'Hello! I am your virtual agent. How can I assist you today?', timestamp: Date.now() }])}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <RefreshCw size={16} /> Reset
                </button>
            </header>

            <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--border)' }}>

                {/* Chat Area */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            style={{
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '70%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                gap: '0.5rem'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                gap: '0.75rem',
                                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
                            }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: msg.role === 'user' ? 'var(--primary)' : 'var(--secondary)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    {msg.role === 'user' ? <User size={16} color="white" /> : <Bot size={16} color="white" />}
                                </div>

                                <div style={{
                                    background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    borderTopRightRadius: msg.role === 'user' ? '2px' : '12px',
                                    borderTopLeftRadius: msg.role === 'model' ? '2px' : '12px',
                                    color: 'white',
                                    lineHeight: 1.5
                                }}>
                                    {msg.text}
                                </div>
                            </div>

                            {/* Suggested Actions */}
                            {msg.role === 'model' && msg.suggested_actions && msg.suggested_actions.length > 0 && (
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginLeft: '3rem' }}>
                                    {msg.suggested_actions.map((action, i) => (
                                        <button
                                            key={i}
                                            onClick={() => sendMessage(action)}
                                            style={{
                                                background: 'transparent',
                                                border: '1px solid var(--primary)',
                                                color: 'var(--primary)',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '20px',
                                                fontSize: '0.875rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'}
                                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div style={{ alignSelf: 'flex-start', marginLeft: '3rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                            Agent is typing...
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                            style={{
                                flex: 1,
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                padding: '0.75rem 1rem',
                                color: 'white',
                                outline: 'none',
                                fontSize: '1rem'
                            }}
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            className="btn-primary"
                            style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
