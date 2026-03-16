export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-900/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-900/40 blur-[120px] rounded-full" />
      
      <main className="w-full max-w-md glass-card p-8 z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient">DestecPlanner</h1>
        </div>
        {children}
      </main>
    </div>
  );
}
