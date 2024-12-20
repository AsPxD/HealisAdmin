import React, { useEffect, useState } from 'react';
import { Stethoscope, Pill, Syringe, Activity } from 'lucide-react';

const features = [
  { icon: Stethoscope, text: "Doctor Consultations" },
  { icon: Activity, text: "Lab Management" },
  { icon: Pill, text: "Pharmacy Services" },
  { icon: Syringe, text: "Vaccination Tracking" }
];

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const featureTimer = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(featureTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="mb-8 relative">
          <Activity className="w-20 h-20 animate-pulse" />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce">
              {React.createElement(features[currentFeature].icon, { className: "w-8 h-8" })}
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">MediSync Pro</h1>
        <p className="text-xl mb-8 text-blue-100">Your Health, Simplified</p>
        
        <div className="max-w-md mx-auto">
          <div className="relative h-2 bg-blue-900 rounded-full overflow-hidden mb-4">
            <div 
              className="absolute left-0 top-0 h-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-blue-100 animate-fade-in">
            {features[currentFeature].text}
          </p>
        </div>
      </div>
    </div>
  );
}