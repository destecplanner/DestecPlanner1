import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="glass-nav px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-gradient">
        DestecPlanner
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/explore" className="hover:text-teal-400 transition-colors">Marketplace</Link>
        <Link href="/pricing" className="hover:text-teal-400 transition-colors">Pricing</Link>
        <Link href="/auth/login" className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 transition-colors font-medium">
          Sign In
        </Link>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-gradient mb-4">DestecPlanner</h3>
          <p className="text-slate-400 text-sm">Premium booking ecosystem for modern businesses.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li><Link href="/explore">Marketplace</Link></li>
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
