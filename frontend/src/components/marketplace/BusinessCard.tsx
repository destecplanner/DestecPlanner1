import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Star, MapPin, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface BusinessCardProps {
  business: {
    id: string;
    name: string;
    slug: string;
    description: string;
    logo_url?: string;
    banner_url?: string;
    rating?: number;
    review_count?: number;
    address?: string;
    category?: { name: string };
  };
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <motion.div
      className="premium-card h-full flex flex-col group overflow-hidden"
    >
        <div className="aspect-[16/10] relative bg-white overflow-hidden">
          {business.banner_url ? (
            <img 
              src={business.banner_url} 
              alt={business.name} 
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-100 bg-slate-50">
              <SparklesIcon className="w-16 h-16 opacity-30" />
            </div>
          )}
          <div className="absolute top-5 left-5">
            <Badge variant="glass" className="bg-white/80 backdrop-blur-md border-white/50 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
              {business.category?.name || 'GENEL'}
            </Badge>
          </div>
          {business.rating && (
            <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-xl px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm border border-slate-100">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-black text-slate-900">{business.rating.toFixed(1)}</span>
              <span className="text-[11px] text-slate-400 font-bold tracking-tight">({business.review_count})</span>
            </div>
          )}
        </div>
        
        <CardHeader className="p-10 pb-2">
          <CardTitle className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">
            {business.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 min-h-[44px] mt-3 text-slate-500 text-base font-bold leading-relaxed opacity-70">
            {business.description || 'Hizmet detayları ve randevu için tıklayın.'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-10 pt-4 flex-1 flex flex-col justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                <MapPin className="w-3.5 h-3.5 text-primary opacity-80" />
              </div>
              <span className="truncate">{business.address || 'Konum bilgisi mevcut'}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                <Clock className="w-3.5 h-3.5 text-primary opacity-80" />
              </div>
              <span>Yarın müsait randevu var</span>
            </div>
          </div>
          
          <Button asChild className="w-full h-14 rounded-full group/btn relative overflow-hidden">
            <Link href={`/explore/${business.slug}`}>
              Profili İncele
              <ArrowUpRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
          </Button>
        </CardContent>
    </motion.div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
