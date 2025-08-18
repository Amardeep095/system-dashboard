import React from 'react';
import { User, Zap, Heart, Shield, Sword } from 'lucide-react';

interface UserStats {
  level: number;
  xp: number;
  maxXp: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  strength: number;
  agility: number;
  intelligence: number;
  vitality: number;
}

interface SystemDashboardProps {
  userStats: UserStats;
  userName: string;
}

export const SystemDashboard: React.FC<SystemDashboardProps> = ({ userStats, userName }) => {
  const xpPercentage = (userStats.xp / userStats.maxXp) * 100;
  const healthPercentage = (userStats.health / userStats.maxHealth) * 100;
  const manaPercentage = (userStats.mana / userStats.maxMana) * 100;

  return (
    <div className="system-panel p-6 animate-slide-in-up">
      {/* User Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center holo-glow">
          <User className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-orbitron font-bold neon-text">{userName}</h1>
          <p className="text-muted-foreground font-exo">System User</p>
        </div>
        <div className="ml-auto text-right">
          <div className="text-3xl font-orbitron font-bold neon-accent">LV.{userStats.level}</div>
          <div className="text-sm text-muted-foreground">Hunter Rank: S</div>
        </div>
      </div>

      {/* XP Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-primary">Experience Points</span>
          <span className="text-sm text-muted-foreground">{userStats.xp}/{userStats.maxXp}</span>
        </div>
        <div className="progress-glow h-3">
          <div 
            className="progress-fill bg-xp" 
            style={{ width: `${xpPercentage}%` }}
          />
        </div>
      </div>

      {/* Health & Mana Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-red-400 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Health
            </span>
            <span className="text-sm text-muted-foreground">{userStats.health}/{userStats.maxHealth}</span>
          </div>
          <div className="progress-glow h-2">
            <div 
              className="progress-fill bg-health" 
              style={{ width: `${healthPercentage}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-purple-400 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Mana
            </span>
            <span className="text-sm text-muted-foreground">{userStats.mana}/{userStats.maxMana}</span>
          </div>
          <div className="progress-glow h-2">
            <div 
              className="progress-fill bg-mana" 
              style={{ width: `${manaPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Core Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <Sword className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-orbitron font-bold neon-text">{userStats.strength}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Strength</div>
        </div>
        
        <div className="stat-card">
          <Zap className="w-6 h-6 text-accent mx-auto mb-2" />
          <div className="text-2xl font-orbitron font-bold neon-text">{userStats.agility}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Agility</div>
        </div>
        
        <div className="stat-card">
          <Shield className="w-6 h-6 text-secondary mx-auto mb-2" />
          <div className="text-2xl font-orbitron font-bold neon-text">{userStats.intelligence}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Intelligence</div>
        </div>
        
        <div className="stat-card">
          <Heart className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-2xl font-orbitron font-bold neon-text">{userStats.vitality}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Vitality</div>
        </div>
      </div>
    </div>
  );
};