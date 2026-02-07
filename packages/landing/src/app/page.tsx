export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-black selection:bg-purple-500/30">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-purple-300 mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          Phase 7 Live
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
          <span className="text-white">Your Dedicated</span><br />
          <span className="text-gradient">Voice Assistant</span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
          High-performance recording and transcription for Google Meet, Zoom, and in-person meetings. Powered by a lightning-fast Rust core and OpenAI Whisper.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-2xl hover:bg-zinc-200 transition-all active:scale-95 text-lg">
            Get Started
          </button>
          <button className="px-8 py-4 bg-white/5 text-white font-semibold rounded-2xl border border-white/10 hover:bg-white/10 transition-all active:scale-95 text-lg backdrop-blur-sm">
            View Demo
          </button>
        </div>

        {/* Feature Preview Card */}
        <div className="mt-24 w-full glass-card p-1 md:p-2 animate-float shadow-2xl shadow-purple-500/10">
          <div className="bg-zinc-950 rounded-[20px] w-full overflow-hidden border border-white/5 aspect-[16/9] flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10" />
            <div className="text-zinc-500 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-medium">Experience Voice PA in Action</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="mt-32 w-full max-w-6xl px-6 pb-24">
        <p className="text-center text-sm font-medium text-zinc-500 uppercase tracking-widest mb-12">
          Integrated with your workflow
        </p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Placeholders for logos */}
          <div className="text-2xl font-bold text-white">Google Meet</div>
          <div className="text-2xl font-bold text-white">Zoom</div>
          <div className="text-2xl font-bold text-white">Slack</div>
          <div className="text-2xl font-bold text-white">Discord</div>
        </div>
      </div>
    </main>
  );
}
