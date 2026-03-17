export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Blobs - Warmer & Softer */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/5 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-stone-400/10 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-stone-100/20 blur-[100px] rounded-full -z-10" />
      
      <main className="w-full max-w-md bg-white border border-stone-100 rounded-[3rem] p-12 z-10 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)]">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none">
            Destec<span className="text-primary italic">Planner</span>
          </h1>
          <div className="h-1 w-12 bg-primary/20 mx-auto mt-4 rounded-full" />
        </div>
        {children}
      </main>
    </div>
  );
}
