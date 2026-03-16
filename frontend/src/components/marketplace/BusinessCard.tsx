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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group overflow-hidden border-slate-800/50 hover:border-teal-500/30 transition-all h-full flex flex-col">
        <div className="aspect-[16/9] relative bg-slate-900 overflow-hidden">
          {business.banner_url ? (
            <img 
              src={business.banner_url} 
              alt={business.name} 
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-800">
              <SparklesIcon className="w-12 h-12 opacity-20" />
            </div>
          )}
          <div className="absolute top-4 left-4">
            <Badge variant="glass" className="backdrop-blur-md">
              {business.category?.name || 'General'}
            </Badge>
          </div>
          {business.rating && (
            <div className="absolute bottom-4 left-4 glass px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-xs font-bold text-white">{business.rating.toFixed(1)}</span>
              <span className="text-[10px] text-slate-400 font-medium">({business.review_count})</span>
            </div>
          )}
        </div>
        
        <CardHeader className="p-8 pb-0">
          <CardTitle className="text-xl group-hover:text-teal-400 transition-colors">
            {business.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 min-h-[40px] mt-2">
            {business.description || 'No description provided.'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8 pt-6 flex-1 flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-400 text-sm">
              <MapPin className="w-4 h-4 text-teal-500/60" />
              <span className="truncate">{business.address || 'Location on map'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400 text-sm">
              <Clock className="w-4 h-4 text-teal-500/60" />
              <span>Available Tomorrow</span>
            </div>
          </div>
          
          <Button asChild className="w-full h-12 rounded-xl group/btn overflow-hidden">
            <Link href={`/explore/${business.slug}`}>
              View Profile
              <ArrowUpRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
          </Button>
        </CardContent>
      </Card>
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
