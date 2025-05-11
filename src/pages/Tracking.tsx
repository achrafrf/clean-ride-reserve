
import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, LoaderIcon, WashingMachine, SparklesIcon, TimerIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/components/LanguageProvider";

const cleaningStages = [
  { id: 1, name: "prewash", time: 15 },
  { id: 2, name: "mainWash", time: 20 },
  { id: 3, name: "rinse", time: 10 },
  { id: 4, name: "waxing", time: 15 },
  { id: 5, name: "detailing", time: 25 },
  { id: 6, name: "drying", time: 15 },
];

export default function Tracking() {
  const [currentStage, setCurrentStage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Calculate the overall progress percentage
  const overallProgress = Math.min(
    Math.round((currentStage / cleaningStages.length) * 100),
    100
  );

  // Simulate cleaning progress
  useEffect(() => {
    if (currentStage < cleaningStages.length && !isCompleted) {
      const stage = cleaningStages[currentStage];
      setTimeLeft(stage.time);
      
      // Log current stage for debugging
      console.log(`Starting stage: ${stage.name}, Time: ${stage.time} minutes`);
      
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
  }, [currentStage, toast, t]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{t('trackingYourCleaning')}</h1>
      
      <div className="max-w-3xl mx-auto">
        {/* Overall Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{t('overallProgress')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex justify-between text-sm">
              <span>{t('progress')}: {overallProgress}%</span>
              <span>
                {currentStage} / {cleaningStages.length} {t('stagesCompleted')}
              </span>
            </div>
            <Progress value={overallProgress} className="h-4" />
          </CardContent>
        </Card>
        
        {/* Completed notification */}
        {isCompleted && (
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
            const isActive = index === currentStage;
            const isFinished = index < currentStage;
            
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
                    
                    {isActive && (
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
