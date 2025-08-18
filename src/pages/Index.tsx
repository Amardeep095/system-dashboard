import React, { useState } from 'react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { SystemDashboard } from '@/components/SystemDashboard';
import { SkillPanel } from '@/components/SkillPanel';
import { QuestLog } from '@/components/QuestLog';
import { ProteinTracker } from '@/components/ProteinTracker';
import { WaterTracker } from '@/components/WaterTracker';
import { WorkoutTracker } from '@/components/WorkoutTracker';
import { SystemNotification } from '@/components/SystemNotification';
import { SkillTree } from '@/components/SkillTree';
import { QuestManager } from '@/components/QuestManager';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'levelup';
  title: string;
  message: string;
  duration?: number;
}

const Index = () => {
  const { toast } = useToast();
  
  // User stats state
  const [userStats, setUserStats] = useState({
    level: 0,
    xp: 0,
    maxXp: 1000,
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    strength: 1,
    agility: 1,
    intelligence: 1,
    vitality: 1
  });
  
  const [availableSkillPoints, setAvailableSkillPoints] = useState(5);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'info',
      title: 'System Initialized',
      message: 'Welcome to your personal advancement system!',
      duration: 5000
    }
  ]);

  const handleSkillUpgrade = (skillId: string) => {
    if (availableSkillPoints > 0) {
      setAvailableSkillPoints(prev => prev - 1);
      
      // Add XP and potentially level up
      const newXp = userStats.xp + 100;
      const shouldLevelUp = newXp >= userStats.maxXp;
      
      if (shouldLevelUp) {
        setUserStats(prev => ({
          ...prev,
          level: prev.level + 1,
          xp: newXp - prev.maxXp,
          maxXp: Math.floor(prev.maxXp * 1.1),
          [skillId]: prev[skillId as keyof typeof prev] + 1
        }));
        
        // Level up notification
        const levelUpNotification: Notification = {
          id: Date.now().toString(),
          type: 'levelup',
          title: '🎉 LEVEL UP!',
          message: `Congratulations! You've reached level ${userStats.level + 1}!`,
          duration: 8000
        };
        
        setNotifications(prev => [...prev, levelUpNotification]);
        setAvailableSkillPoints(prev => prev + 2); // Bonus points for leveling
      } else {
        setUserStats(prev => ({
          ...prev,
          xp: newXp,
          [skillId]: prev[skillId as keyof typeof prev] + 1
        }));
        
        // Skill upgrade notification
        const skillNotification: Notification = {
          id: Date.now().toString(),
          type: 'success',
          title: 'Skill Enhanced',
          message: `${skillId.charAt(0).toUpperCase() + skillId.slice(1)} increased!`,
          duration: 3000
        };
        
        setNotifications(prev => [...prev, skillNotification]);
      }
    }
  };

  const handleSkillReset = () => {
    setAvailableSkillPoints(20); // Give back points
    toast({
      title: "Skills Reset",
      description: "All skill points have been refunded.",
    });
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* System Notifications */}
      <SystemNotification 
        notifications={notifications} 
        onDismiss={dismissNotification} 
      />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-orbitron font-bold neon-accent mb-4 animate-fade-in">
            SYSTEM INTERFACE
          </h1>
          <p className="text-xl text-muted-foreground font-exo animate-fade-in animate-delay-100">
            Personal Development & Enhancement Console
          </p>
          <div className="w-32 h-1 bg-neon mx-auto mt-4 rounded-full animate-shimmer"></div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
          {/* User Dashboard - Full Width on Mobile, 8 cols on XL */}
          <div className="xl:col-span-8">
            <SystemDashboard 
              userStats={userStats} 
              userName="Prince"
            />
          </div>
          
          {/* Skill Panel - Full Width on Mobile, 4 cols on XL */}
          <div className="xl:col-span-4">
            <SkillPanel 
              availablePoints={availableSkillPoints}
              onSkillUpgrade={handleSkillUpgrade}
              onReset={handleSkillReset}
            />
          </div>
        </div>

        {/* Trackers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <QuestLog />
          <ProteinTracker />
          <WaterTracker />
          <WorkoutTracker />
        </div>

        {/* Interactive Systems Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <div className="system-panel p-6">
            <SkillTree />
          </div>
          <QuestManager />
        </div>

        {/* System Status Footer */}
        <div className="text-center mt-12 p-6 system-panel">
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground font-exo">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse"></div>
              <span>Neural Link Active</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>Enhancement Ready</span>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground/60 font-orbitron">
            VERSION 2.1.7 • SOLO LEVELING SYSTEM INTERFACE
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;