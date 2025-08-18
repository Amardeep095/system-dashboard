import React, { useState } from 'react';
import { Droplets, RotateCcw, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const WaterTracker: React.FC = () => {
  const [cupsConsumed, setCupsConsumed] = useState(3);
  const dailyGoal = 8; // cups
  
  const progressPercentage = Math.min((cupsConsumed / dailyGoal) * 100, 100);

  const addCup = () => {
    setCupsConsumed(prev => prev + 1);
  };

  const resetTracker = () => {
    setCupsConsumed(0);
  };

  const getWaterColor = () => {
    if (cupsConsumed >= dailyGoal) return 'text-success';
    if (cupsConsumed >= dailyGoal * 0.7) return 'text-accent';
    return 'text-primary';
  };

  return (
    <div className="system-panel p-6 animate-slide-in-up animate-delay-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
            <Droplets className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold neon-text">Hydration</h2>
            <p className="text-sm text-muted-foreground">Daily water intake</p>
          </div>
        </div>
        <Button
          onClick={resetTracker}
          variant="outline"
          size="sm"
          className="system-btn"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Water Level Display */}
      <div className="text-center mb-6">
        <div className={`text-5xl font-orbitron font-bold mb-2 ${getWaterColor()}`}>
          {cupsConsumed}
        </div>
        <div className="text-lg neon-accent mb-1">cups</div>
        <div className="text-sm text-muted-foreground">of {dailyGoal} daily goal</div>
      </div>

      {/* Visual Water Progress */}
      <div className="relative mb-6">
        <div className="w-24 h-32 mx-auto relative">
          {/* Water Glass Outline */}
          <div className="absolute inset-0 border-2 border-primary/50 rounded-b-3xl rounded-t-lg">
            {/* Water Fill */}
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-400/60 to-cyan-300/40 rounded-b-3xl transition-all duration-1000"
              style={{ height: `${progressPercentage}%` }}
            />
            
            {/* Water Surface Animation */}
            {cupsConsumed > 0 && (
              <div 
                className="absolute left-0 right-0 h-1 bg-cyan-300/80 animate-pulse"
                style={{ bottom: `${progressPercentage}%` }}
              />
            )}
          </div>
          
          {/* Glass Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-b-3xl rounded-t-lg pointer-events-none" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="progress-glow h-3">
          <div 
            className="progress-fill bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-muted-foreground">0</span>
          <span className={cupsConsumed >= dailyGoal ? 'text-success' : 'text-primary'}>
            {Math.round(progressPercentage)}% Complete
          </span>
          <span className="text-muted-foreground">{dailyGoal}</span>
        </div>
      </div>

      {/* Add Water Button */}
      <Button
        onClick={addCup}
        className="w-full system-btn h-12 text-lg mb-4"
        disabled={cupsConsumed >= dailyGoal * 1.5} // Prevent excessive logging
      >
        <Droplets className="w-5 h-5 mr-2" />
        Add Cup (+250ml)
      </Button>

      {/* Water Droplets Grid */}
      <div className="grid grid-cols-8 gap-1 mb-4">
        {Array.from({ length: dailyGoal }).map((_, index) => (
          <div
            key={index}
            className={`w-6 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              index < cupsConsumed
                ? 'bg-cyan-400/60 text-cyan-100 shadow-glow'
                : 'bg-muted/30 border border-muted-foreground/30'
            }`}
          >
            <Droplets className="w-3 h-3" />
          </div>
        ))}
      </div>

      {/* Status Message */}
      <div className="text-center p-3 rounded-lg bg-background/20 border border-border/30">
        <Waves className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
        <div className="text-sm">
          {cupsConsumed >= dailyGoal ? (
            <span className="text-success font-semibold">Excellent! Goal achieved! 🎉</span>
          ) : cupsConsumed >= dailyGoal * 0.7 ? (
            <span className="text-accent">Almost there! Keep going! 💪</span>
          ) : (
            <span className="text-muted-foreground">Stay hydrated, hunter! 💧</span>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {cupsConsumed * 250}ml consumed today
        </div>
      </div>
    </div>
  );
};