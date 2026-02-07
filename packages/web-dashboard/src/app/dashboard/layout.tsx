'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { label: 'Overview', href: '/dashboard' },
        { label: 'Meetings', href: '/dashboard/meetings' },
        { label: 'Analytics', href: '/dashboard/analytics' },
        { label: 'Settings', href: '/dashboard/settings' },
    ];

    return (
        <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-900 flex flex-col p-6 bg-zinc-950">
                <div className="text-2xl font-bold text-purple-600 mb-12 italic tracking-tighter px-2">
                    Voice PA
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center px-4 py-3 rounded-2xl text-sm font-medium transition-all ${isActive
                                        ? 'bg-purple-600/10 text-purple-500 shadow-sm border border-purple-500/20'
                                        : 'text-zinc-500 hover:text-white hover:bg-zinc-900 border border-transparent'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile Hook */}
                <div className="mt-auto pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-4 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg" />
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate text-zinc-200">User Profile</p>
                            <p className="text-xs text-zinc-600 truncate">Free Plan</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 h-full overflow-hidden bg-zinc-950">
                <div className="h-full overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
