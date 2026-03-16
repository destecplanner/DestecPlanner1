'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { 
  Star, 
  MessageSquare, 
  Zap, 
  ChevronRight,
  MoreVertical,
  Calendar,
  Smile,
  ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ReviewsPage() {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['customer-reviews'],
    queryFn: async () => {
      const res = await api.get('/v1/customer/profile');
      return res.data.data.reviews || [];
    }
  });

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Your Reviews</h1>
          <p className="text-slate-500">Track and manage the feedback you've shared with the elite business network.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl glass border border-white/10 shrink-0 self-start md:self-auto">
           <div className="px-4 py-2 bg-teal-500 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white glow-teal shadow-lg">Published</div>
           <div className="px-4 py-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-slate-300 cursor-pointer">Drafts</div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {isLoading ? (
          [1, 2].map(i => <div key={i} className="h-48 glass rounded-[2.5rem] animate-pulse" />)
        ) : reviews?.length > 0 ? (
          reviews.map((review: any) => (
            <Card key={review.id} className="group overflow-hidden relative border-white/5 hover:border-teal-500/20 transition-all">
               <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 blur-3xl -z-10 group-hover:bg-teal-500/10 transition-colors" />
               
               <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center text-teal-400 shrink-0 shadow-lg group-hover:border-teal-500/30 transition-colors">
                       <Zap className="w-8 h-8" />
                    </div>

                    <div className="flex-1 space-y-4 w-full">
                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                             <h3 className="text-xl font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">{review.business?.name}</h3>
                             <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                                <Calendar className="w-3.5 h-3.5 text-teal-500/50" />
                                Reviewed on {format(new Date(review.created_at || new Date()), 'MMM dd, yyyy')}
                             </div>
                          </div>
                          <div className="flex items-center gap-1.5 p-2 glass rounded-xl border-white/5 bg-white/5">
                             {[1, 2, 3, 4, 5].map((s) => (
                               <Star 
                                  key={s} 
                                  className={cn(
                                    "w-3.5 h-3.5",
                                    s <= (review.rating || 5) ? "text-yellow-500 fill-yellow-500" : "text-slate-800"
                                  )} 
                               />
                             ))}
                          </div>
                       </div>

                       <div className="relative p-6 glass rounded-2xl border-white/5 bg-white/[0.02]">
                          <p className="text-slate-300 text-sm leading-relaxed italic max-w-4xl">
                             "{review.comment || 'An exceptional experience at this premium venue. Every detail was handled with precision.'}"
                          </p>
                       </div>
                    </div>

                    <div className="flex md:flex-col gap-3 shrink-0 w-full md:w-auto mt-4 md:mt-0">
                       <Button variant="ghost" size="icon" className="w-11 h-11 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                          <MoreVertical className="w-4 h-4 text-slate-500" />
                       </Button>
                       <Button variant="ghost" size="icon" className="w-11 h-11 rounded-xl hover:bg-teal-500/10 text-teal-400 border border-white/5 hover:border-teal-500/20" asChild>
                          <Link href={`/explore/${review.business?.slug}`}>
                             <ArrowRight className="w-4 h-4" />
                          </Link>
                       </Button>
                    </div>
                 </div>
               </CardContent>
            </Card>
          ))
        ) : (
          <EmptyState 
            icon={MessageSquare}
            title="No Reviews Shared"
            description="You haven't shared your elite experiences with the community yet. Completed appointments will appear here."
            actionLabel="View Appointments"
            onAction={() => window.location.href = '/dashboard/customer'}
          />
        )}
      </div>
    </div>
  );
}
