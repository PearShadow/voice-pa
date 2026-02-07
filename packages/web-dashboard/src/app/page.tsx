export default function DashboardPage() {
  const meetings = [
    { id: 1, title: 'Project Sync', platform: 'Google Meet', date: 'Today, 10:00 AM', status: 'COMPLETED' },
    { id: 2, title: 'Product Review', platform: 'Zoom', date: 'Yesterday, 2:30 PM', status: 'COMPLETED' },
    { id: 3, title: 'Engineering Huddle', platform: 'In-Person', date: 'Feb 6, 9:00 AM', status: 'COMPLETED' },
  ];

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 flex flex-col p-4 bg-white dark:bg-black">
        <div className="text-xl font-bold text-purple-600 mb-8 px-2">Voice PA</div>

        <nav className="space-y-1">
          <button className="w-full text-left px-3 py-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium">
            Dashboard
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
            All Meetings
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
            Analytics
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
            Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-bottom border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold">Welcome back, User</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500" />
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-zinc-50 dark:bg-zinc-950">
          <div className="max-w-6xl mx-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Total Meetings', value: '42' },
                { label: 'Minutes Transcribed', value: '1,284' },
                { label: 'Active Projects', value: '8' },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <p className="text-sm text-zinc-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Meetings */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <h2 className="font-semibold text-lg">Recent Meetings</h2>
                <button className="text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors">View all</button>
              </div>
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {meetings.map((meeting) => (
                  <div key={meeting.id} className="p-6 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        {meeting.platform === 'Google Meet' && 'M'}
                        {meeting.platform === 'Zoom' && 'Z'}
                        {meeting.platform === 'In-Person' && 'P'}
                      </div>
                      <div>
                        <p className="font-medium">{meeting.title}</p>
                        <p className="text-sm text-zinc-500">{meeting.platform} • {meeting.date}</p>
                      </div>
                    </div>
                    <div className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                      {meeting.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
