'use client';

import Link from 'next/link';
import { Zap, Twitter, Instagram, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-900 py-16 px-6 lg:px-12 bg-slate-950/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6 group">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center glow-teal">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Destec<span className="text-teal-500">Planner</span>
            </span>
          </Link>
          <p className="text-slate-400 text-sm max-w-sm mb-8 leading-relaxed">
            The intelligent booking ecosystem for premium businesses. Elite precision in every appointment, ensuring your vision scales seamlessly.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-teal-400 transition-all">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-teal-400 transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-teal-400 transition-all">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Marketplace</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link href="/explore" className="hover:text-teal-400 transition-colors">Explore Businesses</Link></li>
            <li><Link href="/explore?category=beauty" className="hover:text-teal-400 transition-colors">Beauty & Spa</Link></li>
            <li><Link href="/explore?category=health" className="hover:text-teal-400 transition-colors">Health & Wellness</Link></li>
            <li><Link href="/explore?category=consulting" className="hover:text-teal-400 transition-colors">Consulting</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link href="/pricing" className="hover:text-teal-400 transition-colors">Pricing</Link></li>
            <li><Link href="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
            <li><Link href="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 flex flex-col md:row items-center justify-between gap-4">
        <p className="text-slate-600 text-xs text-center">
          © 2026 DestecPlanner. Design for visionaries, by visionaries.
        </p>
      </div>
    </footer>
  );
}
