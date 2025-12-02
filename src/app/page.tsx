import Link from 'next/link';
import { MessageSquare, Zap, BarChart3, Layers } from 'lucide-react';

export default function Home() {
  return (
    <main className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '4rem 0' }}>

      <div style={{ marginBottom: '2rem' }}>
        <span style={{
          background: 'rgba(99, 102, 241, 0.1)',
          color: 'var(--primary)',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: 600,
          border: '1px solid rgba(99, 102, 241, 0.2)'
        }}>
          Free-Tier Contact Center AI Simulation
        </span>
      </div>

      <h1 style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
        <span className="text-gradient">OmniFlow CX</span>
      </h1>

      <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', marginBottom: '3rem' }}>
        Build, test, and simulate enterprise-grade conversational AI flows without the enterprise price tag. Powered by Vertex AI & Gemini.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '5rem' }}>
        <Link href="/dashboard" className="btn-primary">
          Launch Console
        </Link>
        <Link href="/docs" style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          color: 'white',
          fontWeight: 600
        }}>
          View Documentation
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%' }}>
        <FeatureCard
          icon={<MessageSquare size={24} color="var(--primary)" />}
          title="Vertex AI Powered"
          description="Intent classification and response generation using Google's Gemini Flash Lite models."
        />
        <FeatureCard
          icon={<Layers size={24} color="var(--secondary)" />}
          title="Visual Flow Builder"
          description="Design complex conversation paths with a drag-and-drop interface similar to Dialogflow CX."
        />
        <FeatureCard
          icon={<BarChart3 size={24} color="var(--accent)" />}
          title="Real-time Analytics"
          description="Track intent hits, fallback rates, and session metrics with BigQuery integration."
        />
      </div>

    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'left' }}>
      <div style={{ marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white' }}>{title}</h3>
      <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{description}</p>
    </div>
  );
}
