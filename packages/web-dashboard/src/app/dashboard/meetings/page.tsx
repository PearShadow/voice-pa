'use client';

import Link from 'next/link';

const MOCK_MEETINGS = [
    { id: '1', title: 'Product Design Sync', date: 'Feb 7, 2026', duration: '45:12', participants: 4, type: 'Meet' },
    { id: '2', title: 'Engineering Huddle', date: 'Feb 6, 2026', duration: '12:05', participants: 8, type: 'Zoom' },
    { id: '3', title: 'In-person Client Interview', date: 'Feb 5, 2026', duration: '28:45', participants: 2, type: 'Mobile' },
    { id: '4', title: 'Sprint Planning', date: 'Feb 4, 2026', duration: '1:12:00', participants: 12, type: 'Meet' },
];

export default function MeetingsPage() {
    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Meeting History</h1>
                    <p className="text-zinc-500 mt-2">View and search through your past sessions</p>
                </div>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Search meetings..."
                        className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 w-64"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {MOCK_MEETINGS.map((meeting) => (
                    <Link
                        key={meeting.id}
                        href={`/dashboard/meetings/${meeting.id}`}
                        className="group block bg-zinc-900/40 border border-zinc-900 hover:border-purple-500/30 hover:bg-zinc-900/60 p-6 rounded-3xl transition-all"
                    >
                        <div className="flex justify-between items-center text-zinc-400 text-xs mb-4 uppercase tracking-widest font-semibold">
                            <span>{meeting.date} • {meeting.type}</span>
                            <span>{meeting.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold group-hover:text-purple-400 transition-all">{meeting.title}</h3>
                                <p className="text-zinc-500 text-sm mt-1">{meeting.participants} Participants</p>
                            </div>
                            <div className="h-12 w-12 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-purple-600/20 group-hover:text-purple-400 transition-all">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
