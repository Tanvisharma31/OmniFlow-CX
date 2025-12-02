'use client';

import { useEffect, useState } from 'react';
import { Users, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalSessions: 0,
        intentMatchRate: 0,
        fallbackRate: 0,
        avgResponseTime: 0,
        intents: [] as { name: string, count: number, percent: number }[],
        chartData: { labels: [], data: [] } as { labels: string[], data: number[] }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!isFirebaseConfigured) {
                setLoading(false);
                return;
            }

            try {
                // Fetch recent events
                const q = query(collection(db, 'analytics_events'), orderBy('timestamp', 'desc'), limit(200));
                const snapshot = await getDocs(q);

                const sessions = new Set();
                const intentCounts: Record<string, number> = {};
                let totalIntents = 0;
                let fallbackCount = 0;

                // For chart (group by date)
                const dateCounts: Record<string, number> = {};

                snapshot.forEach(doc => {
                    const data = doc.data();
                    if (data.sessionId) sessions.add(data.sessionId);

                    if (data.type === 'bot_response' && data.intent) {
                        totalIntents++;
                        intentCounts[data.intent] = (intentCounts[data.intent] || 0) + 1;
                        if (data.intent === 'unknown' || data.intent === 'fallback') {
                            fallbackCount++;
                        }
                    }

                    if (data.timestamp) {
                        const date = new Date(data.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                        dateCounts[date] = (dateCounts[date] || 0) + 1;
                    }
                });

                // Calculate metrics
                const totalSessions = sessions.size;
                const fallbackRate = totalIntents > 0 ? (fallbackCount / totalIntents) * 100 : 0;
                const matchRate = 100 - fallbackRate;

                // Process Intents
                const sortedIntents = Object.entries(intentCounts)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([name, count]) => ({
                        name,
                        count,
                        percent: totalIntents > 0 ? Math.round((count / totalIntents) * 100) : 0
                    }));

                // Process Chart Data
                // Sort dates chronologically
                const chartLabels = Object.keys(dateCounts).sort((a, b) => {
                    // Simple sort for "MMM D" format might fail across years, but fine for MVP
                    return new Date(a + " " + new Date().getFullYear()).getTime() - new Date(b + " " + new Date().getFullYear()).getTime();
                });
                const chartValues = chartLabels.map(date => dateCounts[date]);

                setStats({
                    totalSessions,
                    intentMatchRate: Math.round(matchRate * 10) / 10,
                    fallbackRate: Math.round(fallbackRate * 10) / 10,
                    avgResponseTime: 240, // Mock for now
                    intents: sortedIntents,
                    chartData: { labels: chartLabels, data: chartValues }
                });

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: { color: '#94a3b8' }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: { color: '#94a3b8' }
            }
        }
    };

    const chartData = {
        labels: stats.chartData.labels.length > 0 ? stats.chartData.labels : ['No Data'],
        datasets: [
            {
                fill: true,
                label: 'Interactions',
                data: stats.chartData.data.length > 0 ? stats.chartData.data : [0],
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
            },
        ],
    };

    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Dashboard</h1>
                <p style={{ color: '#94a3b8' }}>Overview of your virtual agent's performance.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard title="Total Sessions" value={stats.totalSessions.toString()} change={stats.totalSessions > 0 ? "Active" : "-"} icon={Users} color="var(--primary)" />
                <StatCard title="Intent Match Rate" value={`${stats.intentMatchRate}%`} change="Avg" icon={CheckCircle} color="var(--secondary)" />
                <StatCard title="Fallback Rate" value={`${stats.fallbackRate}%`} change={stats.fallbackRate < 10 ? "Good" : "High"} icon={AlertCircle} color="var(--accent)" />
                <StatCard title="Avg Response Time" value={`${stats.avgResponseTime}ms`} change="Est." icon={MessageSquare} color="#10b981" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', minHeight: '400px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Interaction Volume</h3>
                    <div style={{ height: '300px', width: '100%' }}>
                        {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : <Line options={chartOptions} data={chartData} />}
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Top Intents</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
                            stats.intents.length > 0 ?
                                stats.intents.map((intent, i) => (
                                    <IntentRow key={i} name={intent.name} count={intent.count} percent={intent.percent} />
                                )) :
                                <p style={{ color: '#94a3b8' }}>No intents recorded yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, change, icon: Icon, color }: any) {
    const isPositive = change === 'Active' || change === 'Good' || change === 'Avg';
    return (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{title}</p>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{value}</h3>
                </div>
                <div style={{ padding: '0.5rem', borderRadius: '8px', background: `${color}20` }}>
                    <Icon size={20} color={color} />
                </div>
            </div>
            <div style={{ fontSize: '0.875rem', color: isPositive ? '#10b981' : '#f43f5e' }}>
                {change} <span style={{ color: '#94a3b8' }}>status</span>
            </div>
        </div>
    );
}

function IntentRow({ name, count, percent }: any) {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                <span>{name}</span>
                <span style={{ color: '#94a3b8' }}>{count}</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${percent}%`, background: 'var(--primary)', borderRadius: '3px' }}></div>
            </div>
        </div>
    );
}
