
'use client';

import { useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function SettingsPage() {
    const [systemPrompt, setSystemPrompt] = useState('');
    const [agentName, setAgentName] = useState('OmniBot');

    const [welcomeMessage, setWelcomeMessage] = useState('Hello! How can I help you?');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            if (!isFirebaseConfigured) {
                setLoading(false);
                return;
            }
            try {
                const docRef = doc(db, 'settings', 'global');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setSystemPrompt(data.systemPrompt || '');
                    setAgentName(data.agentName || 'OmniBot');
                    setWelcomeMessage(data.welcomeMessage || 'Hello! How can I help you?');
                }
            } catch (e) {
                console.error("Error loading settings", e);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        if (!isFirebaseConfigured) {
            alert('Settings saved locally (Firebase not configured)');
            return;
        }
        try {
            await setDoc(doc(db, 'settings', 'global'), {
                systemPrompt,
                agentName,
                welcomeMessage,
                updatedAt: new Date().toISOString()
            }, { merge: true });
            alert('Settings saved!');
        } catch (e) {
            alert('Error saving settings');
        }
    };

    return (
        <div style={{ maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>System Settings</h1>

            {!isFirebaseConfigured && (
                <div style={{ padding: '1rem', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: '8px', marginBottom: '2rem', color: '#f43f5e' }}>
                    Firebase is not configured. Settings will not persist.
                </div>
            )}

            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Agent Identity</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Agent Name</label>
                            <input
                                type="text"
                                value={agentName}
                                onChange={(e) => setAgentName(e.target.value)}
                                style={{
                                    width: '100%',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px',
                                    padding: '0.75rem',
                                    color: 'white',
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Welcome Message</label>
                            <input
                                type="text"
                                value={welcomeMessage}
                                onChange={(e) => setWelcomeMessage(e.target.value)}
                                style={{
                                    width: '100%',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px',
                                    padding: '0.75rem',
                                    color: 'white',
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Global System Prompt</h3>
                    <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
                        Define the persona and base instructions for your AI agent.
                    </p>

                    <textarea
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        rows={10}
                        placeholder="You are a helpful assistant..."
                        style={{
                            width: '100%',
                            background: 'rgba(0,0,0,0.2)',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            padding: '1rem',
                            color: 'white',
                            fontFamily: 'monospace'
                        }}
                    />
                </div>

                <button className="btn-primary" onClick={handleSave} disabled={loading} style={{ alignSelf: 'flex-start' }}>
                    Save Configuration
                </button>
            </div>
        </div>
    );
}
