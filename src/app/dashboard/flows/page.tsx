'use client';

import { useState, useEffect } from 'react';
import FlowBuilder from '@/components/FlowBuilder';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function FlowsPage() {
    const [nodes, setNodes] = useState<any[]>([]);
    const [edges, setEdges] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFlow = async () => {
            if (!isFirebaseConfigured) {
                setLoading(false);
                return;
            }
            try {
                const docRef = doc(db, 'flows', 'default-flow');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setNodes(data.nodes || []);
                    setEdges(data.edges || []);
                }
            } catch (error) {
                console.error("Error loading flow:", error);
            } finally {
                setLoading(false);
            }
        };

        loadFlow();
    }, []);

    const handleSaveTrigger = () => {
        window.dispatchEvent(new Event('SAVE_FLOW'));
    };

    const handleSave = async (nodes: any[], edges: any[]) => {
        if (!isFirebaseConfigured) {
            alert('Flow saved locally (Firebase not configured)');
            return;
        }
        try {
            await setDoc(doc(db, 'flows', 'default-flow'), {
                nodes,
                edges,
                updatedAt: new Date().toISOString()
            });
            alert('Flow saved successfully!');
        } catch (error) {
            console.error("Error saving flow:", error);
            alert('Failed to save flow.');
        }
    };

    if (loading) return <div style={{ padding: '2rem', color: 'white' }}>Loading flow...</div>;

    return (
        <div style={{ height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column' }}>
            <header style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Flow Builder</h1>
                    <p style={{ color: '#94a3b8' }}>Design your conversation paths.</p>
                </div>
                <button className="btn-primary" onClick={handleSaveTrigger}>Save Flow</button>
            </header>

            <div className="glass-panel" style={{ flex: 1, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <FlowBuilder initialNodes={nodes} initialEdges={edges} onSave={handleSave} />
            </div>
        </div>
    );
}
