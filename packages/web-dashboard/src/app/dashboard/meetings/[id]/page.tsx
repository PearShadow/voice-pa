'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function MeetingDetailPage() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<'TRANSCRIPT' | 'NOTES' | 'SUMMARY'>('TRANSCRIPT');

    const mockTranscript = [
        { speaker: 'Speaker A', time: '00:01', text: 'Welcome everyone to the Voice PA project sync.' },
        { speaker: 'Speaker B', time: '00:05', text: 'Thanks. I have some updates on the Rust core integration.' },
        { speaker: 'Speaker A', time: '00:12', text: 'Great, let\'s dive into the iOS framework status.' },
        { speaker: 'Speaker B', time: '00:15', text: 'The XCFramework is ready and we\'ve successfully bridged the recorder to React Native.' },
    ];

    return (
        <div className="flex flex-col h-full bg-black text-white p-8">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold italic">Engineering Sync - Feb 7</h1>
                    <p className="text-zinc-500 text-sm">Created via Google Meet • 12:45 Duration</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm font-medium transition-all">
                        Share
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-medium transition-all">
                        Export PDF
                    </button>
                </div>
            </header>

            <div className="flex gap-1 border-b border-zinc-800 mb-8">
                {['TRANSCRIPT', 'SUMMARY', 'NOTES'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-6 py-3 text-sm font-medium transition-all border-b-2 ${activeTab === tab ? 'border-purple-500 text-white' : 'border-transparent text-zinc-500 hover:text-white'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-zinc-800">
                {activeTab === 'TRANSCRIPT' && (
                    <div className="space-y-8 max-w-4xl mx-auto">
                        {mockTranscript.map((entry, i) => (
                            <div key={i} className="flex group">
                                <div className="w-32 flex-shrink-0">
                                    <span className="text-purple-400 font-bold block">{entry.speaker}</span>
                                    <span className="text-zinc-500 text-xs">{entry.time}</span>
                                </div>
                                <div className="flex-1 group-hover:bg-zinc-900/50 p-4 rounded-2xl transition-all cursor-text">
                                    <p className="text-zinc-200 leading-relaxed">{entry.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'SUMMARY' && (
                    <div className="max-w-2xl mx-auto prose prose-invert">
                        <h2 className="text-xl font-bold mb-4">AI-Generated Meeting Summary</h2>
                        <p className="text-zinc-400">This meeting was focused on the technical integration of the Rust Core library into the mobile application architecture.</p>
                        <ul className="list-disc list-inside text-zinc-400 mt-4 space-y-2">
                            <li>Completed iOS XCFramework build</li>
                            <li>Successfully implemented Swift Native Module bridge</li>
                            <li>Pending Android NDK toolchain configuration</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
