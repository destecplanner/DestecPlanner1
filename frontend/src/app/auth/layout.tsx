export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
        {children}
      </div>
    </div>
  );
}
