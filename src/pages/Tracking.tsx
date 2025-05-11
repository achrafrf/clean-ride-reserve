
import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, LoaderIcon, WashingMachine, SparklesIcon, TimerIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/components/LanguageProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define cleaning stages
const cleaningStages = [
  { id: "prewash", name: "prewash", time: 15 },
  { id: "mainWash", name: "mainWash", time: 20 },
  { id: "rinse", name: "rinse", time: 10 },
  { id: "waxing", name: "waxing", time: 15 },
  { id: "detailing", name: "detailing", time: 25 },
  { id: "drying", name: "drying", time: 15 },
];

interface Booking {
  id: string;
  name: string;
  cleaningStages?: {
    [key: string]: boolean;
  };
  status: string;
}

export default function Tracking() {
  const [currentStage, setCurrentStage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingId, setBookingId] = useState("");
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Load bookings from localStorage
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const confirmedBookings = storedBookings.filter((booking: any) => booking.status === 'confirmed');
    setBookings(confirmedBookings);
  }, []);
  
  // Find booking by ID
  const handleFindBooking = () => {
    if (!bookingId.trim()) {
      toast({
        title: t('error'),
        description: t('pleaseEnterBookingId'),
        variant: "destructive",
      });
      return;
    }
    
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setActiveBooking(booking);
      
      // Calculate current stage from cleaning stages
      if (booking.cleaningStages) {
        const completedStagesCount = Object.values(booking.cleaningStages).filter(Boolean).length;
        setCurrentStage(completedStagesCount);
        setIsCompleted(completedStagesCount === cleaningStages.length);
      } else {
        setCurrentStage(0);
        setIsCompleted(false);
      }
      
      toast({
        title: t('bookingFound'),
        description: t('trackingYourCleaning'),
      });
    } else {
      toast({
        title: t('bookingNotFound'),
        description: t('pleaseCheckYourBookingId'),
        variant: "destructive",
      });
    }
  };
  
  // Calculate the overall progress percentage
  const overallProgress = activeBooking ? Math.min(
    Math.round(
      (Object.values(activeBooking.cleaningStages || {}).filter(Boolean).length / 
      cleaningStages.length) * 100
    ),
    100
  ) : 0;
  
  // Demo mode simulation (when no booking is selected)
  useEffect(() => {
    if (!activeBooking && !isValidating) {
      // This is demo mode simulation
      if (currentStage < cleaningStages.length && !isCompleted) {
        const stage = cleaningStages[currentStage];
        setTimeLeft(stage.time);
        
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setTimeout(() => {
                setCurrentStage((prevStage) => {
                  const nextStage = prevStage + 1;
                  if (nextStage >= cleaningStages.length) {
                    setIsCompleted(true);
                    toast({
                      title: t('cleaningCompleted'),
                      description: t('yourCarIsReadyForPickup'),
                      duration: 5000,
                    });
                  }
                  return nextStage;
                });
              }, 500);
              return 0;
            }
            return prev - 1;
          });
        }, 1000); // Update every second for demo purposes
        
        return () => clearInterval(timer);
      }
    }
  }, [currentStage, toast, t, activeBooking, isValidating]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{t('trackingYourCleaning')}</h1>
      
      <div className="max-w-3xl mx-auto">
        {/* Booking ID Input */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{t('enterBookingId')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter booking ID"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
              />
              <Button onClick={handleFindBooking}>{t('track')}</Button>
            </div>
            {activeBooking && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                <p className="font-medium">{t('tracking')}: {activeBooking.name}</p>
                <p className="text-sm text-muted-foreground">{t('bookingId')}: {activeBooking.id}</p>
              </div>
            )}
            {!activeBooking && (
              <p className="mt-4 text-sm text-muted-foreground">
                {t('demoMode')}
              </p>
            )}
          </CardContent>
        </Card>
        
        {/* Overall Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{t('overallProgress')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex justify-between text-sm">
              <span>{t('progress')}: {activeBooking ? overallProgress : Math.round((currentStage / cleaningStages.length) * 100)}%</span>
              <span>
                {activeBooking ? 
                  `${Object.values(activeBooking.cleaningStages || {}).filter(Boolean).length} / ${cleaningStages.length} ${t('stagesCompleted')}` : 
                  `${currentStage} / ${cleaningStages.length} ${t('stagesCompleted')}`
                }
              </span>
            </div>
            <Progress value={activeBooking ? overallProgress : Math.round((currentStage / cleaningStages.length) * 100)} className="h-4" />
          </CardContent>
        </Card>
        
        {/* Completed notification */}
        {(isCompleted || (activeBooking && Object.values(activeBooking.cleaningStages || {}).filter(Boolean).length === cleaningStages.length)) && (
          <Alert className="mb-8 bg-green-50 dark:bg-green-900/20 border-green-500">
            <CheckIcon className="h-5 w-5 text-green-500" />
            <AlertDescription className="text-green-700 dark:text-green-300">
              {t('cleaningCompletedMessage')}
            </AlertDescription>
          </Alert>
        )}
        
        {/* Stages List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">{t('cleaningStages')}</h2>
          
          {cleaningStages.map((stage, index) => {
            // Determine stage status based on active booking or demo mode
            let isActive, isFinished;
            
            if (activeBooking && activeBooking.cleaningStages) {
              isFinished = !!activeBooking.cleaningStages[stage.id];
              isActive = false; // In tracking mode with real booking, no "active" animation
            } else {
              isActive = index === currentStage;
              isFinished = index < currentStage;
            }
            
            return (
              <Card 
                key={stage.id} 
                className={`${isActive ? 'border-primary ring-1 ring-primary' : ''} 
                  ${isFinished ? 'bg-muted/30 border-muted' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full p-2 
                        ${isFinished ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 
                          isActive ? 'bg-primary/20 text-primary animate-pulse' : 
                          'bg-muted text-muted-foreground'}`}>
                        {isFinished ? (
                          <CheckIcon className="h-5 w-5" />
                        ) : isActive ? (
                          <LoaderIcon className="h-5 w-5 animate-spin" />
                        ) : (
                          <TimerIcon className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {t(stage.name)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {t('estimatedTime')}: {stage.time} {t('minutes')}
                        </p>
                      </div>
                    </div>
                    
                    {isActive && !activeBooking && (
                      <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm">
                        <WashingMachine className="h-4 w-4 text-primary" />
                        <span>{t('inProgress')}: {timeLeft} {t('minutesLeft')}</span>
                      </div>
                    )}
                    
                    {isFinished && (
                      <div className="flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-sm text-green-700 dark:text-green-400">
                        <CheckIcon className="h-4 w-4" />
                        <span>{t('completed')}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
