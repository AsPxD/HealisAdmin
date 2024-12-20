import React, { useEffect, useState } from 'react';
import { FeatureIcons } from '../icons';
import { splashFeatures } from './features';
import { cn } from '../../utils/cn';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const featureTimer = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % splashFeatures.length);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(featureTimer);
    };
  }, [onComplete]);

  return (
    <div className={cn(
      "fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center transition-opacity duration-500",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <div className="text-white text-center px-4">
        <div className="mb-12 relative">
          <div className="relative">
            <FeatureIcons.Logo className="w-24 h-24 mx-auto animate-pulse" />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="animate-bounce bg-white/10 rounded-full p-2">
                {React.createElement(splashFeatures[currentFeature].icon, { 
                  className: "w-8 h-8 text-white" 
                })}
              </div>
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-3 tracking-tight">MediSync Pro</h1>
        <p className="text-xl mb-12 text-blue-100">Professional Healthcare Management System</p>
        
        <div className="max-w-md mx-auto">
          <div className="relative h-2 bg-blue-900/50 rounded-full overflow-hidden mb-6">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-white to-blue-200 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="h-8 relative">
            {splashFeatures.map((feature, index) => (
              <p
                key={feature.text}
                className={cn(
                  "absolute inset-0 transition-all duration-500 flex items-center justify-center text-blue-100",
                  currentFeature === index 
                    ? "opacity-100 transform translate-y-0" 
                    : "opacity-0 transform translate-y-4"
                )}
              >
                {feature.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}