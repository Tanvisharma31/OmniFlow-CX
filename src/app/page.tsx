import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare, Zap, BarChart3, Layers, ArrowRight, CheckCircle2, Bot, Shield } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(5, 5, 7, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container" style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px' }}></div>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>OmniFlow CX</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div className="hidden-mobile" style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: 500, color: '#94a3b8' }}>
              <Link href="#features" style={{ transition: 'color 0.2s' }} className="hover:text-white">Features</Link>
              <Link href="#how-it-works" style={{ transition: 'color 0.2s' }} className="hover:text-white">How it Works</Link>
              <Link href="/docs" style={{ transition: 'color 0.2s' }} className="hover:text-white">Docs</Link>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <SignedOut>
                <SignInButton mode="modal">
                  <button style={{
                    padding: '0.5rem 1rem',
                    color: 'white',
                    background: 'transparent',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}>
                    Sign In
                  </button>
                </SignInButton>
                <Link href="/sign-up" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                  Get Started
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                  Go to Console
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: '180px', paddingBottom: '100px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ marginBottom: '2rem', display: 'inline-block' }}>
            <span style={{
              background: 'rgba(99, 102, 241, 0.1)',
              color: 'var(--primary)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: 600,
              border: '1px solid rgba(99, 102, 241, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Zap size={14} />
              Powered by Google Vertex AI & Gemini
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em'
          }}>
            Build Enterprise AI Agents <br />
            <span className="text-gradient">Without The Enterprise Cost</span>
          </h1>

          <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
            Design, simulate, and deploy intelligent conversational flows.
            The open-source alternative to Dialogflow CX for modern developers.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '5rem' }}>
            <Link href="/dashboard" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Start Building Free <ArrowRight size={20} />
            </Link>
            <Link href="/docs" style={{
              padding: '1rem 2rem',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'white',
              fontWeight: 600,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              View Documentation
            </Link>
          </div>

          {/* Hero Image / Dashboard Preview */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            border: '1px solid var(--glass-border)',
            background: 'var(--glass)',
            padding: '1rem',
            boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{
              borderRadius: '12px',
              aspectRatio: '16/9',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <Image
                src="/image.png"
                alt="OmniFlow CX Dashboard"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Everything you need to build great agents</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Powerful tools for the entire conversational AI lifecycle.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <FeatureCard
              icon={<Bot size={32} color="var(--primary)" />}
              title="LLM-Native NLU"
              description="Forget manual training phrases. Our Gemini-powered NLU understands intent and context out of the box with zero-shot classification."
            />
            <FeatureCard
              icon={<Layers size={32} color="var(--secondary)" />}
              title="Visual Flow Builder"
              description="Map out complex non-linear conversations with our intuitive drag-and-drop editor. Visualize paths, slots, and fulfillment."
            />
            <FeatureCard
              icon={<MessageSquare size={32} color="var(--accent)" />}
              title="Interactive Simulator"
              description="Test your agent in real-time. Debug flows, inspect state variables, and refine responses without leaving the dashboard."
            />
            <FeatureCard
              icon={<BarChart3 size={32} color="#10b981" />}
              title="Deep Analytics"
              description="Gain insights into user behavior. Track containment rates, sentiment analysis, and drop-off points to optimize performance."
            />
            <FeatureCard
              icon={<Shield size={32} color="#f59e0b" />}
              title="Enterprise Security"
              description="Built with security first. Role-based access control, audit logs, and data encryption at rest and in transit."
            />
            <FeatureCard
              icon={<Zap size={32} color="#8b5cf6" />}
              title="One-Click Deploy"
              description="Deploy your agents to web, mobile, or telephony channels instantly. Webhook integrations for backend fulfillment."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '4rem 0', background: '#020203' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '24px', height: '24px', background: 'var(--primary)', borderRadius: '6px' }}></div>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>OmniFlow CX</span>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>© 2025 OmniFlow CX. All rights reserved.</p>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="https://linkedin.com/in/tanvisharma31" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>By Tanvi Sharma</a>
              <a href="https://github.com/Tanvisharma31/OmniFlow-CX" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-panel" style={{
      padding: '2.5rem',
      textAlign: 'left',
      transition: 'transform 0.2s',
      cursor: 'default'
    }}>
      <div style={{
        marginBottom: '1.5rem',
        background: 'rgba(255,255,255,0.05)',
        width: 'fit-content',
        padding: '1rem',
        borderRadius: '12px'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'white' }}>{title}</h3>
      <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '1rem' }}>{description}</p>
    </div>
  );
}
