'use client';

export default function SettingsPage() {
    return (
        <div className="p-8 space-y-12">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-zinc-500 mt-2">Manage your account and platform preferences</p>
            </header>

            <div className="max-w-xl space-y-8">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Profile</h3>
                    <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-3xl space-y-4">
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Display Name</label>
                            <input type="text" className="w-full mt-2 bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-purple-500" defaultValue="Main User" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email</label>
                            <input type="text" className="w-full mt-2 bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-zinc-400 outline-none" defaultValue="user@example.com" disabled />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Integrations</h3>
                    <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-3xl space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold">Google Calendar</p>
                                <p className="text-sm text-zinc-500">Sync meeting titles and participants</p>
                            </div>
                            <button className="px-4 py-2 bg-purple-600 rounded-xl text-sm font-bold">Connect</button>
                        </div>
                        <div className="h-[1px] bg-zinc-800" />
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold">Slack</p>
                                <p className="text-sm text-zinc-500">Send meeting summaries to channels</p>
                            </div>
                            <button className="px-4 py-2 bg-zinc-800 rounded-xl text-sm font-bold">Connected</button>
                        </div>
                    </div>
                </div>

                <button className="w-full py-4 text-red-500 font-bold hover:bg-red-500/5 rounded-2xl transition-all">
                    Sign Out
                </button>
            </div>
        </div>
    );
}
