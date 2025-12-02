import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface FlowPropertiesPanelProps {
    selectedNode: any;
    onClose: () => void;
    onUpdate: (nodeId: string, data: any) => void;
}

export default function FlowPropertiesPanel({ selectedNode, onClose, onUpdate }: FlowPropertiesPanelProps) {
    const [label, setLabel] = useState('');
    const [response, setResponse] = useState('');
    const [intent, setIntent] = useState('');

    useEffect(() => {
        if (selectedNode) {
            setLabel(selectedNode.data.label || '');
            setResponse(selectedNode.data.response || '');
            setIntent(selectedNode.data.intent || '');
        }
    }, [selectedNode]);

    const handleSave = () => {
        onUpdate(selectedNode.id, {
            ...selectedNode.data,
            label,
            response,
            intent
        });
    };

    if (!selectedNode) return null;

    return (
        <div className="glass-panel" style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '300px',
            padding: '1.5rem',
            zIndex: 10,
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid var(--border)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Node Properties</h3>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                    <X size={20} />
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Node Name</label>
                    <input
                        type="text"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Trigger Intent (Optional)</label>
                    <input
                        type="text"
                        value={intent}
                        onChange={(e) => setIntent(e.target.value)}
                        placeholder="e.g. order_status"
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Bot Response</label>
                    <textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        rows={4}
                        placeholder="What should the bot say?"
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white', resize: 'vertical' }}
                    />
                </div>

                <button onClick={handleSave} className="btn-primary" style={{ marginTop: '0.5rem' }}>
                    Update Node
                </button>
            </div>
        </div>
    );
}
