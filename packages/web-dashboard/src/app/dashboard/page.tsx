'use client';

export default function DashboardOverview() {
    const stats = [
        { label: 'Total Meetings', value: '24', trend: '+12%', color: 'purple' },
        { label: 'Transcription Hrs', value: '18.5', trend: '+4.2h', color: 'blue' },
        { label: 'Avg Accuracy', value: '98.2%', trend: '+0.5%', color: 'emerald' },
        { label: 'Tokens Used', value: '142k', trend: '72% limit', color: 'orange' },
    ];

    return (
        <div className="p-8 space-y-12">
            <header>
                <h1 className="text-4xl font-bold tracking-tighter">Good morning, Team</h1>
                <p className="text-zinc-500 mt-2 text-lg">Here's what happened while you were away.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-zinc-900/40 border border-zinc-900 p-8 rounded-3xl hover:bg-zinc-900/60 transition-all group">
                        <p className="text-zinc-500 text-sm font-medium">{stat.label}</p>
                        <h3 className="text-3xl font-bold mt-2 group-hover:scale-105 transition-transform origin-left">{stat.value}</h3>
                        <div className="mt-4 inline-flex items-center px-2 py-1 rounded-lg bg-zinc-800 text-xs font-bold text-zinc-400">
                            {stat.trend}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-zinc-900/20 border border-transparent hover:border-zinc-800 hover:bg-zinc-900/40 transition-all group">
                                <div className="h-14 w-14 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-purple-600/20 transition-all">
                                    <div className="w-6 h-6 rounded-full border-2 border-purple-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Sync Completed: Engineering Huddle</h4>
                                    <p className="text-sm text-zinc-500">2 hours ago • 14 participants</p>
                                </div>
                                <div className="ml-auto">
                                    <button className="text-sm font-medium text-purple-400 hover:text-purple-300">View</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Center */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold">Quick Actions</h2>
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-3xl shadow-2xl space-y-4 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                        <h3 className="text-xl font-bold">Capture Web Meeting</h3>
                        <p className="text-purple-100 text-sm opacity-80">Use the browser extension to start transcribing directly from Meet or Zoom.</p>
                        <button className="w-full py-4 bg-white text-purple-700 rounded-2xl font-bold hover:bg-purple-50 transition-all shadow-lg active:scale-95">
                            Launch Extension
                        </button>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl space-y-4">
                        <h3 className="text-xl font-bold">Invite Team</h3>
                        <p className="text-zinc-500 text-sm">Collaborate on meeting notes and summaries with your whole team.</p>
                        <button className="w-full py-4 border border-zinc-700 rounded-2xl font-bold hover:bg-zinc-800 transition-all">
                            Generate Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
