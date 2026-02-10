'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BarChart3,
    LayoutDashboard,
    Mic2,
    Settings,
    Search,
    Bell,
    Command
} from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Meetings', href: '/dashboard/meetings', icon: Mic2 },
        { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
        { label: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 border-r border-white/5 flex flex-col bg-zinc-950/50 backdrop-blur-3xl relative z-20">
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-2 group cursor-pointer mb-12">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center transition-transform group-hover:rotate-6">
                            <div className="w-4 h-4 bg-black rounded-sm" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Voice PA</span>
                    </div>

                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                        ? 'bg-white/5 text-white border border-white/10'
                                        : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.02]'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-purple-400' : 'group-hover:text-purple-400'}`} />
                                    {item.label}
                                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* User Profile Hook */}
                <div className="mt-auto p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-sm shadow-lg group-hover:scale-105 transition-transform">
                            MV
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate text-white">Menil Vukovic</p>
                            <p className="text-[10px] uppercase tracking-wider text-purple-400 font-bold">Pro Plan ✨</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-black glow-mesh">
                {/* Topbar */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md relative z-10">
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-xl group focus-within:border-purple-500/50 transition-all w-96">
                        <Search className="w-4 h-4 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search meetings, transcripts..."
                            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-zinc-600"
                        />
                        <div className="hidden sm:flex items-center gap-1 border border-white/10 px-1.5 py-0.5 rounded-md bg-white/5">
                            <Command className="w-3 h-3 text-zinc-500" />
                            <span className="text-[10px] text-zinc-500 font-bold">K</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors relative">
                            <Bell className="w-4 h-4 text-zinc-400" />
                            <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-purple-500 rounded-full border-2 border-black" />
                        </button>
                        <button className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-zinc-200 transition-all active:scale-95">
                            New Recording
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </main>
        </div>
    );
}

