'use client';

export default function AnalyticsPage() {
    return (
        <div className="p-8 space-y-12">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-zinc-500 mt-2">Deep dive into your meeting performance and usage</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Usage Chart Placeholder */}
                <div className="bg-zinc-900/40 border border-zinc-900 p-8 rounded-3xl space-y-6">
                    <h3 className="text-xl font-bold">Transcription Volume</h3>
                    <div className="h-64 flex items-end gap-2">
                        {[40, 65, 30, 85, 55, 90, 70].map((h, i) => (
                            <div key={i} className="flex-1 bg-purple-600/20 rounded-t-xl relative group">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-purple-600 rounded-t-xl transition-all group-hover:bg-purple-400"
                                    style={{ height: `${h}%` }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-zinc-500 font-medium">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                    </div>
                </div>

                {/* Meeting Type Distribution */}
                <div className="bg-zinc-900/40 border border-zinc-900 p-8 rounded-3xl space-y-6">
                    <h3 className="text-xl font-bold">Platform Distribution</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Google Meet', value: 65, color: 'bg-blue-500' },
                            { label: 'Zoom', value: 25, color: 'bg-purple-500' },
                            { label: 'Mobile App', value: 10, color: 'bg-emerald-500' },
                        ].map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">{item.label}</span>
                                    <span className="text-zinc-200 font-bold">{item.value}%</span>
                                </div>
                                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Insights Section */}
            <div className="bg-purple-600/5 border border-purple-500/20 p-8 rounded-3xl space-y-4">
                <h3 className="text-xl font-bold text-purple-400">AI Insights</h3>
                <p className="text-zinc-400 leading-relaxed">
                    Based on your last 10 meetings, your team is spending <span className="text-white font-bold">15% more time</span> in technical discussions compared to last week. The most frequent topics are <span className="text-white font-bold">Rust Architecture, React Native Bridge,</span> and <span className="text-white font-bold">NDK Configuration</span>.
                </p>
            </div>
        </div>
    );
}
