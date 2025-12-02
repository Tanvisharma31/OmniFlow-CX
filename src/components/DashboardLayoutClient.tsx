'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import { UserButton } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="dashboard-wrapper">
            <Sidebar className={isSidebarOpen ? 'open' : ''} />

            {/* Overlay for mobile */}
            <div
                className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            <div className="main-content">
                <header className="header">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="mobile-toggle"
                        >
                            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    <div style={{ marginLeft: 'auto' }}>
                        <UserButton />
                    </div>
                </header>
                <main style={{
                    padding: '2rem',
                    flex: 1,
                    background: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.03), transparent 40%)'
                }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
