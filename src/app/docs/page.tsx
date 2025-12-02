"use client"
import Link from 'next/link';
import { Book, Code, Terminal, Zap, Layers, MessageSquare, ArrowRight, Menu, X } from 'lucide-react';

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-[#050507] text-white">
            {/* Navigation */}
            <nav style={{
                borderBottom: '1px solid var(--border)',
                padding: '1rem 0',
                background: 'rgba(5, 5, 7, 0.8)',
                backdropFilter: 'blur(12px)',
                position: 'sticky',
                top: 0,
                zIndex: 50
            }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '28px', height: '28px', background: 'var(--primary)', borderRadius: '6px' }}></div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>OmniFlow Docs</span>
                    </Link>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link href="/" style={{ fontSize: '0.9rem', color: '#94a3b8' }} className="hover:text-white">Home</Link>
                        <Link href="/dashboard" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                            Go to Console
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="container" style={{ display: 'flex', gap: '4rem', paddingTop: '3rem', position: 'relative' }}>
                {/* Sidebar Navigation */}
                <aside className="docs-sidebar" style={{
                    width: '240px',
                    position: 'sticky',
                    top: '100px',
                    height: 'calc(100vh - 100px)',
                    overflowY: 'auto',
                    paddingRight: '1rem',
                    display: 'none' // Hidden on mobile by default, handled by media query in CSS ideally, but inline for now we'll assume desktop first
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <Section title="Getting Started">
                            <NavLink href="#introduction" active>Introduction</NavLink>
                            <NavLink href="#quickstart">Quickstart</NavLink>
                            <NavLink href="#architecture">Architecture</NavLink>
                        </Section>
                        <Section title="Core Concepts">
                            <NavLink href="#intents">Intents & NLU</NavLink>
                            <NavLink href="#flows">Flow Builder</NavLink>
                            <NavLink href="#fulfillment">Fulfillment</NavLink>
                            <NavLink href="#analytics">Analytics</NavLink>
                        </Section>
                        <Section title="API Reference">
                            <NavLink href="#rest-api">REST API</NavLink>
                            <NavLink href="#webhooks">Webhooks</NavLink>
                            <NavLink href="#sdk">Client SDKs</NavLink>
                        </Section>
                    </div>
                </aside>

                {/* Main Content */}
                <main style={{ flex: 1, maxWidth: '800px', paddingBottom: '4rem', minWidth: 0 }}>

                    {/* Introduction */}
                    <section id="introduction" style={{ marginBottom: '4rem', scrollMarginTop: '120px' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Documentation</span>
                            <h1 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '0.5rem', marginBottom: '1.5rem' }}>Introduction</h1>
                            <p style={{ fontSize: '1.25rem', color: '#94a3b8', lineHeight: 1.7 }}>
                                OmniFlow CX is a developer-first platform for building conversational AI agents.
                                It combines the power of Large Language Models (LLMs) with the control of deterministic state machines.
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'start', marginBottom: '2rem', background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.05), rgba(5, 5, 7, 0.4))' }}>
                            <Zap className="text-yellow-400 shrink-0" size={32} />
                            <div>
                                <h3 style={{ fontWeight: 600, marginBottom: '0.75rem', fontSize: '1.25rem' }}>Why OmniFlow?</h3>
                                <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6 }}>
                                    Traditional NLU platforms (like Dialogflow ES) are rigid and hard to scale.
                                    Pure LLM agents are unpredictable. OmniFlow gives you the best of both worlds:
                                    <strong> LLM-powered understanding</strong> with <strong>precise flow control</strong>.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Quickstart */}
                    <section id="quickstart" style={{ marginBottom: '4rem', scrollMarginTop: '120px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Terminal size={28} color="var(--secondary)" /> Quickstart
                        </h2>
                        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                            Get your first agent running in less than 5 minutes using our CLI tool.
                        </p>

                        <div style={{ background: '#0f0f13', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></div>
                            </div>
                            <div style={{ padding: '1.5rem', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <span style={{ color: '#64748b' }}># Create a new project</span>
                                    <div style={{ color: '#e2e8f0', marginTop: '0.25rem' }}>
                                        <span style={{ color: 'var(--accent)' }}>npx</span> create-omniflow-app@latest my-agent
                                    </div>
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <span style={{ color: '#64748b' }}># Navigate to directory</span>
                                    <div style={{ color: '#e2e8f0', marginTop: '0.25rem' }}>
                                        <span style={{ color: 'var(--accent)' }}>cd</span> my-agent
                                    </div>
                                </div>
                                <div>
                                    <span style={{ color: '#64748b' }}># Start the development server</span>
                                    <div style={{ color: '#e2e8f0', marginTop: '0.25rem' }}>
                                        <span style={{ color: 'var(--accent)' }}>npm</span> run dev
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Architecture */}
                    <section id="architecture" style={{ marginBottom: '4rem', scrollMarginTop: '120px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Layers size={28} color="var(--primary)" /> Architecture
                        </h2>
                        <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1.1rem' }}>
                            OmniFlow agents are composed of three main building blocks that work together to handle complex conversations.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                            <Card title="Flows" icon={<Layers size={20} />}>
                                A Flow represents a high-level conversation topic (e.g., "Returns", "Booking"). Flows contain pages and handle the overall state of a specific task.
                            </Card>
                            <Card title="Pages" icon={<Book size={20} />}>
                                Pages are individual states within a flow (e.g., "Collect Order ID", "Confirm Date"). They collect information and execute logic.
                            </Card>
                            <Card title="Intents" icon={<MessageSquare size={20} />}>
                                Intents map user input to actions. Powered by Gemini, they can understand context and variations without extensive training data.
                            </Card>
                        </div>
                    </section>

                    {/* Flow Builder */}
                    <section id="flows" style={{ marginBottom: '4rem', scrollMarginTop: '120px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Flow Builder</h2>
                        <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                            The visual flow builder allows you to design conversation paths using a drag-and-drop interface.
                        </p>
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Key Concepts</h3>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <ListItem>
                                    <strong>Start Page:</strong> The entry point of any flow.
                                </ListItem>
                                <ListItem>
                                    <strong>Routes:</strong> Logic that determines which page to transition to next based on user input or session parameters.
                                </ListItem>
                                <ListItem>
                                    <strong>Parameters:</strong> Variables stored in the session (e.g., <code>$session.params.order_id</code>).
                                </ListItem>
                            </ul>
                        </div>
                    </section>

                </main>
            </div>

            <style jsx global>{`
        @media (min-width: 1024px) {
          .docs-sidebar {
            display: block !important;
          }
        }
      `}</style>
        </div>
    );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                {title}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', borderLeft: '1px solid var(--border)', paddingLeft: '1rem' }}>
                {children}
            </div>
        </div>
    );
}

function NavLink({ href, children, active }: { href: string, children: React.ReactNode, active?: boolean }) {
    return (
        <Link href={href} style={{
            color: active ? 'var(--primary)' : '#94a3b8',
            fontSize: '0.9rem',
            fontWeight: active ? 600 : 400,
            transition: 'all 0.2s',
            display: 'block',
            padding: '0.25rem 0'
        }} className="hover:text-white">
            {children}
        </Link>
    );
}

function Card({ title, children, icon }: { title: string, children: React.ReactNode, icon: React.ReactNode }) {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                {icon}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>{title}</h3>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {children}
            </p>
        </div>
    );
}

function ListItem({ children }: { children: React.ReactNode }) {
    return (
        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'start', color: '#cbd5e1', lineHeight: 1.6 }}>
            <div style={{ marginTop: '0.4rem', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }}></div>
            <div>{children}</div>
        </li>
    );
}
