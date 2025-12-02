'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquare, GitMerge, BarChart2, Settings, LogOut } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Flow Builder', icon: GitMerge, href: '/dashboard/flows' },
    { name: 'Simulator', icon: MessageSquare, href: '/dashboard/simulator' },
    { name: 'Analytics', icon: BarChart2, href: '/dashboard/analytics' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export default function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname();

    return (
        <aside className={`sidebar ${className || ''}`}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px' }}></div>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>OmniFlow</span>
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                color: isActive ? 'white' : '#94a3b8',
                                background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                border: isActive ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid transparent',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <item.icon size={20} />
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

        </aside>
    );
}
