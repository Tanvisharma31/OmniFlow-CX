import { Users, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';

export default function Dashboard() {
    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Dashboard</h1>
                <p style={{ color: '#94a3b8' }}>Overview of your virtual agent's performance.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard title="Total Sessions" value="1,284" change="+12%" icon={Users} color="var(--primary)" />
                <StatCard title="Intent Match Rate" value="94.2%" change="+2.1%" icon={CheckCircle} color="var(--secondary)" />
                <StatCard title="Fallback Rate" value="5.8%" change="-1.4%" icon={AlertCircle} color="var(--accent)" />
                <StatCard title="Avg Response Time" value="240ms" change="-12ms" icon={MessageSquare} color="#10b981" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', minHeight: '400px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Recent Conversations</h3>
                    <div style={{ color: '#94a3b8', textAlign: 'center', marginTop: '4rem' }}>
                        Chart placeholder (Chart.js integration coming soon)
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Top Intents</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <IntentRow name="Check Order Status" count={452} percent={35} />
                        <IntentRow name="Refund Request" count={284} percent={22} />
                        <IntentRow name="Technical Support" count={192} percent={15} />
                        <IntentRow name="Product Info" count={145} percent={11} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, change, icon: Icon, color }: any) {
    const isPositive = change.startsWith('+');
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
                {change} <span style={{ color: '#94a3b8' }}>vs last month</span>
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
