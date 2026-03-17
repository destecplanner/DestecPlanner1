"use client"

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { ErrorState } from "@/components/ui/ErrorState";
import { Calendar as CalendarIcon, Clock, User, Check, ChevronRight, ChevronLeft, CreditCard, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { format, addDays, startOfToday, isSameDay } from "date-fns";
import { tr } from "date-fns/locale";

type Step = "service" | "staff" | "time" | "confirm";

export default function BookingPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Fetch Business Details
  const { data: business, isLoading: isBusinessLoading } = useQuery({
    queryKey: ["business", slug],
    queryFn: async () => {
      const response = await api.get(`/v1/marketplace/business/${slug}`);
      return response.data.data;
    },
  });

  // Fetch Availability
  const { data: availability, isLoading: isAvailabilityLoading } = useQuery({
    queryKey: ["availability", selectedStaff?.id, selectedDate],
    queryFn: async () => {
      if (!selectedStaff) return [];
      const response = await api.get(`/v1/bookings/availability`, {
        params: {
          staff_id: selectedStaff.id,
          date: format(selectedDate, "yyyy-MM-dd"),
        }
      });
      return response.data.data; // Array of time slots
    },
    enabled: !!selectedStaff && step === "time",
  });

  // Create Booking Mutation
  const createBooking = useMutation({
    mutationFn: async (bookingData: any) => {
      const response = await api.post("/v1/bookings", bookingData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Randevu başarıyla oluşturuldu!");
      router.push("/dashboard/customer");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Randevu oluşturulamadı.");
    }
  });

  // Pre-select service from URL if present
  useEffect(() => {
    const serviceId = searchParams.get("service");
    if (serviceId && business?.services) {
      const service = business.services.find((s: any) => s.id.toString() === serviceId);
      if (service) {
        setSelectedService(service);
        setStep("staff");
      }
    }
  }, [business, searchParams]);

  if (isBusinessLoading) return <LoadingOverlay variant="full" />;

  const steps: Step[] = ["service", "staff", "time", "confirm"];
  const currentStepIndex = steps.indexOf(step);

  const handleNext = () => {
    if (step === "service" && selectedService) setStep("staff");
    else if (step === "staff" && selectedStaff) setStep("time");
    else if (step === "time" && selectedSlot) setStep("confirm");
  };

  const handleBack = () => {
    if (step === "staff") setStep("service");
    else if (step === "time") setStep("staff");
    else if (step === "confirm") setStep("time");
  };

  const handleBooking = () => {
    createBooking.mutate({
      business_id: business.id,
      service_id: selectedService.id,
      staff_id: selectedStaff.id,
      appointment_date: format(selectedDate, "yyyy-MM-dd"),
      appointment_time: selectedSlot,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Progress Stepper */}
        <div className="flex items-center justify-between mb-12 relative px-4">
          <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 -z-10" />
          {steps.map((s, idx) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                  idx <= currentStepIndex 
                    ? "bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-600/20" 
                    : "bg-white border-slate-200 text-slate-400"
                )}
              >
                {idx < currentStepIndex ? <Check className="w-5 h-5" /> : <span>{idx + 1}</span>}
              </div>
              <span className={cn(
                "text-[10px] uppercase tracking-widest font-black transition-colors hidden sm:block",
                idx <= currentStepIndex ? "text-teal-700" : "text-slate-400"
              )}>
                {s === "service" ? "Hizmet" : s === "staff" ? "Uzman" : s === "time" ? "Zaman" : "Onay"}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === "service" && (
                <motion.div
                  key="service"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">Hizmet Seçin</h2>
                  {business.services.map((service: any) => (
                    <Card 
                      key={service.id}
                      className={cn(
                        "cursor-pointer transition-all border-slate-100 hover:border-teal-500/20 active:scale-[0.99] shadow-sm",
                        selectedService?.id === service.id ? "bg-teal-50 border-teal-600/40" : "bg-white"
                      )}
                      onClick={() => setSelectedService(service)}
                    >
                      <CardContent className="p-6 flex items-center justify-between">
                         <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{service.name}</h3>
                            <div className="flex items-center gap-3 text-slate-500 text-xs font-medium">
                               <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {service.duration} DK</span>
                               <span className="w-1 h-1 rounded-full bg-slate-200" />
                               <span className="text-teal-600 font-bold">{service.price} {business.currency || '₺'}</span>
                            </div>
                         </div>
                         {selectedService?.id === service.id && (
                           <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-600/20">
                              <Check className="w-4 h-4 text-white" />
                           </div>
                         )}
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              )}

              {step === "staff" && (
                <motion.div
                  key="staff"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">Uzman Seçin</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {business.staff.map((member: any) => (
                      <Card 
                        key={member.id}
                        className={cn(
                          "cursor-pointer transition-all border-slate-100 hover:border-teal-500/20 p-6 flex flex-col items-center text-center shadow-sm",
                          selectedStaff?.id === member.id ? "bg-teal-50 border-teal-600/40" : "bg-white"
                        )}
                        onClick={() => setSelectedStaff(member)}
                      >
                        <div className="w-20 h-20 rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 mb-4 group-hover:scale-110 transition-transform">
                          <img src={member.profile_image_url || `https://ui-avatars.com/api/?name=${member.name}`} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-slate-900 font-bold mb-1">{member.name}</h3>
                        <p className="text-slate-400 text-[10px] uppercase tracking-widest font-black">{member.role_title || 'Uzman'}</p>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "time" && (
                <motion.div
                  key="time"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">Tarih ve Saat Seçin</h2>
                  
                  {/* Date Selector (Quick picker) */}
                  <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide mb-8">
                    {Array.from({ length: 14 }).map((_, i) => {
                      const date = addDays(startOfToday(), i);
                      const isSelected = isSameDay(date, selectedDate);
                      return (
                        <Card 
                          key={i}
                          className={cn(
                            "min-w-[80px] h-24 flex flex-col items-center justify-center cursor-pointer transition-all border-slate-100",
                            isSelected ? "bg-teal-600 border-teal-600 scale-105 shadow-lg shadow-teal-600/20" : "bg-white hover:bg-slate-50"
                          )}
                          onClick={() => {
                            setSelectedDate(date);
                            setSelectedSlot(null);
                          }}
                        >
                          <span className={cn("text-[10px] uppercase font-black", isSelected ? "text-white/80" : "text-slate-400")}>
                            {format(date, "EEE", { locale: tr })}
                          </span>
                          <span className={cn("text-xl font-black", isSelected ? "text-white" : "text-slate-900")}>
                            {format(date, "d")}
                          </span>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Slots Grid */}
                  <div className="relative min-h-[200px]">
                    {isAvailabilityLoading ? (
                      <LoadingOverlay />
                    ) : availability?.length > 0 ? (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {availability.map((slot: string) => (
                          <Button
                            key={slot}
                            variant={selectedSlot === slot ? "default" : "outline"}
                            className={cn(
                              "h-14 rounded-xl border-slate-200 text-sm font-bold",
                              selectedSlot === slot ? "bg-teal-600 text-white" : "bg-white"
                            )}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-100">
                        <CalendarIcon className="w-8 h-8 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 font-medium italic">Bu tarih için uygun randevu bulunamadı.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {step === "confirm" && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">Randevuyu Onayla</h2>
                  <Card className="bg-white border-teal-600/10 border-2 overflow-hidden rounded-[2.5rem] shadow-xl">
                    <div className="p-10 space-y-8">
                       <div className="flex items-start justify-between border-b border-slate-100 pb-8">
                          <div>
                             <p className="text-xs uppercase tracking-widest font-black text-slate-400 mb-2">Seçilen Hizmet</p>
                             <h3 className="text-2xl font-black text-slate-900">{selectedService.name}</h3>
                          </div>
                          <div className="text-right">
                             <p className="text-xs uppercase tracking-widest font-black text-slate-400 mb-2">Ücret</p>
                             <p className="text-2xl font-black text-teal-600">{selectedService.price} {business.currency || '₺'}</p>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-8 py-2">
                          <div className="space-y-4">
                             <p className="text-xs uppercase tracking-widest font-black text-slate-400">Profesyonel</p>
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
                                   <img src={selectedStaff.profile_image_url || `https://ui-avatars.com/api/?name=${selectedStaff.name}`} className="w-full h-full object-cover" />
                                </div>
                                <span className="font-bold text-slate-900">{selectedStaff.name}</span>
                             </div>
                          </div>
                          <div className="space-y-4">
                             <p className="text-xs uppercase tracking-widest font-black text-slate-400">Tarih ve Saat</p>
                             <div className="flex items-center gap-3 text-slate-900 font-bold">
                                <CalendarIcon className="w-4 h-4 text-teal-600" />
                                {format(selectedDate, "d MMMM yyyy", { locale: tr })} - {selectedSlot}
                             </div>
                          </div>
                       </div>

                       <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                          <div className="flex items-center gap-4 text-slate-600 text-sm font-medium">
                             <CreditCard className="w-5 h-5 text-teal-600" />
                             <span>Ödeme işletmede gerçekleştirilecektir.</span>
                          </div>
                       </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Booking Summary Sidebar (Desktop) */}
          <div className="hidden lg:block">
            <Card className="sticky top-32 overflow-hidden border-slate-200 rounded-[2.5rem] bg-white shadow-xl">
              <div className="p-8 space-y-8">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  Randevu Özeti
                </h3>
                
                <div className="space-y-4 text-sm">
                  {selectedService && (
                    <div className="flex justify-between items-center animate-fade-in">
                      <span className="text-slate-500 font-medium">Hizmet</span>
                      <span className="text-slate-900 font-bold">{selectedService.name}</span>
                    </div>
                  )}
                  {selectedStaff && (
                    <div className="flex justify-between items-center animate-fade-in">
                      <span className="text-slate-500 font-medium">Uzman</span>
                      <span className="text-slate-900 font-bold">{selectedStaff.name}</span>
                    </div>
                  )}
                  {selectedSlot && (
                    <div className="flex justify-between items-center animate-fade-in">
                      <span className="text-slate-500 font-medium">Zaman</span>
                      <span className="text-slate-900 font-bold">{selectedSlot}</span>
                    </div>
                  )}
                </div>

                <div className="pt-8 border-t border-slate-100">
                   <div className="flex justify-between items-end">
                      <span className="text-slate-500 font-bold">TOPLAM</span>
                      <span className="text-3xl font-black text-teal-600">
                        {selectedService ? `${selectedService.price} ${business.currency || '₺'}` : "—"}
                      </span>
                   </div>
                </div>

                <Button 
                  className="w-full h-14 rounded-2xl shadow-lg shadow-teal-600/20" 
                  disabled={
                    (step === "service" && !selectedService) || 
                    (step === "staff" && !selectedStaff) || 
                    (step === "time" && !selectedSlot) ||
                    createBooking.isPending
                  }
                  onClick={step === "confirm" ? handleBooking : handleNext}
                >
                  {createBooking.isPending ? "İşleniyor..." : step === "confirm" ? "Randevuyu Tamamla" : "Devam Et"}
                </Button>

                {currentStepIndex > 0 && (
                  <Button variant="ghost" className="w-full h-12 rounded-xl text-slate-500 font-medium" onClick={handleBack}>
                    <ChevronLeft className="mr-2 w-4 h-4" /> Geri Git
                  </Button>
                )}
              </div>
            </Card>
          </div>
          
          {/* Mobile Footer Action */}
          <div className="lg:hidden fixed bottom-0 left-0 w-full p-6 bg-white/80 backdrop-blur-md border-t border-slate-100 z-50">
             <Button 
                className="w-full h-16 rounded-2xl shadow-lg shadow-teal-600/20 text-lg" 
                disabled={
                  (step === "service" && !selectedService) || 
                  (step === "staff" && !selectedStaff) || 
                  (step === "time" && !selectedSlot) ||
                  createBooking.isPending
                }
                onClick={step === "confirm" ? handleBooking : handleNext}
              >
                {step === "confirm" ? "Randevuyu Onayla" : "Sonraki Adıma Geç"}
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
