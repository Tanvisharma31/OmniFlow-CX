'use client';

import { useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
} from 'chart.js';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

export default function AnalyticsPage() {
    const [stats, setStats] = useState({
        totalSessions: 0,
        intentCounts: {} as Record<string, number>,
        messagesOverTime: [] as any[]
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!isFirebaseConfigured) {
                setLoading(false);
                return;
            }
            try {
                const q = query(collection(db, 'analytics_events'), orderBy('timestamp', 'desc'), limit(100));
                const querySnapshot = await getDocs(q);

                let sessions = new Set();
                let intents: Record<string, number> = {};

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.sessionId) sessions.add(data.sessionId);
                    if (data.intent) {
                        intents[data.intent] = (intents[data.intent] || 0) + 1;
                    }
                });

                setStats({
                    totalSessions: sessions.size,
                    intentCounts: intents,
                    messagesOverTime: [] // Placeholder
                });
            } catch (error) {
                console.error("Error fetching analytics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    const intentData = {
        labels: Object.keys(stats.intentCounts),
        datasets: [
            {
                label: '# of Intents',
                data: Object.values(stats.intentCounts),
                backgroundColor: [
                    'rgba(99, 102, 241, 0.5)',
                    'rgba(6, 182, 212, 0.5)',
                    'rgba(244, 114, 182, 0.5)',
                    'rgba(16, 185, 129, 0.5)',
                ],
                borderColor: [
                    'rgba(99, 102, 241, 1)',
                    'rgba(6, 182, 212, 1)',
                    'rgba(244, 114, 182, 1)',
                    'rgba(16, 185, 129, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const lineData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Messages',
                data: [12, 19, 3, 5, 2, 3, 15], // Mock data
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Analytics Dashboard</h1>

            {!isFirebaseConfigured && (
                <div style={{ padding: '1rem', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: '8px', marginBottom: '2rem', color: '#f43f5e' }}>
                    Firebase is not configured. Analytics are disabled.
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Total Sessions (Sample)</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 700 }}>{loading ? '...' : stats.totalSessions}</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Intent Distribution</h3>
                    {loading ? <p>Loading...</p> : (
                        Object.keys(stats.intentCounts).length > 0 ?
                            <Doughnut data={intentData} /> :
                            <p style={{ color: '#94a3b8' }}>No data available yet.</p>
                    )}
                </div>

                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Activity Volume</h3>
                    <Line options={{ responsive: true }} data={lineData} />
                </div>
            </div>
        </div>
    );
}
