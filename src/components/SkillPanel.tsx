import React, { useState } from 'react';
import { BookOpen, Focus, Clock, Activity, Plus, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Skill {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  icon: React.ReactNode;
  description: string;
  color: string;
}

interface SkillPanelProps {
  availablePoints: number;
  onSkillUpgrade: (skillId: string) => void;
  onReset: () => void;
}

export const SkillPanel: React.FC<SkillPanelProps> = ({
  availablePoints,
  onSkillUpgrade,
  onReset
}) => {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: 'academic',
      name: 'Academic Performance',
      level: 1,
      maxLevel: 100,
      icon: <BookOpen className="w-6 h-6" />,
      description: 'Improves study efficiency and academic understanding',
      color: 'text-blue-400'
    },
    {
      id: 'focus',
      name: 'Focus & Concentration',
      level: 1,
      maxLevel: 100,
      icon: <Focus className="w-6 h-6" />,
      description: 'Enhances attention span and mental clarity',
      color: 'text-purple-400'
    },
    {
      id: 'timemanagement',
      name: 'Time Management',
      level: 1,
      maxLevel: 100,
      icon: <Clock className="w-6 h-6" />,
      description: 'Increases productivity and task completion rate',
      color: 'text-yellow-400'
    },
    {
      id: 'health',
      name: 'Physical Health',
      level: 1,
      maxLevel: 100,
      icon: <Activity className="w-6 h-6" />,
      description: 'Improves physical fitness and energy levels',
      color: 'text-green-400'
    }
  ]);

  const upgradeSkill = (skillId: string) => {
    if (availablePoints > 0) {
      setSkills(prev => prev.map(skill => 
        skill.id === skillId && skill.level < skill.maxLevel
          ? { ...skill, level: skill.level + 1 }
          : skill
      ));
      onSkillUpgrade(skillId);
    }
  };

  const resetSkills = () => {
    setSkills(prev => prev.map(skill => ({ ...skill, level: 1 })));
    onReset();
  };

  const getProgressPercentage = (level: number, maxLevel: number) => {
    return (level / maxLevel) * 100;
  };

  return (
    <div className="system-panel p-6 animate-slide-in-up animate-delay-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-orbitron font-bold neon-text">Student Development</h2>
          <p className="text-sm text-muted-foreground">
            Skill Points: <span className="text-primary font-bold">{availablePoints}</span>
          </p>
        </div>
        <Button
          onClick={resetSkills}
          variant="outline"
          size="sm"
          className="system-btn"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Skills Grid */}
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div
            key={skill.id}
            className="system-panel p-4 border border-border/50 hover:border-primary/50 transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-4">
              {/* Skill Icon */}
              <div className={`w-12 h-12 rounded-lg bg-background/30 border border-border/50 flex items-center justify-center ${skill.color}`}>
                {skill.icon}
              </div>

              {/* Skill Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-orbitron font-bold text-foreground">{skill.name}</h3>
                  <span className="text-lg font-bold neon-accent">LV.{skill.level}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{skill.description}</p>
                
                {/* Progress Bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="progress-glow h-2">
                      <div 
                        className="progress-fill bg-gradient-to-r from-primary/60 to-accent/60 transition-all duration-700" 
                        style={{ width: `${getProgressPercentage(skill.level, skill.maxLevel)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>1</span>
                      <span>{skill.level}/{skill.maxLevel}</span>
                      <span>{skill.maxLevel}</span>
                    </div>
                  </div>

                  {/* Upgrade Button */}
                  <Button
                    onClick={() => upgradeSkill(skill.id)}
                    disabled={availablePoints === 0 || skill.level >= skill.maxLevel}
                    className="system-btn px-4 py-2"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Skill Level Benefits */}
            <div className="mt-4 pt-3 border-t border-border/30">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className={`font-bold ${skill.color}`}>
                    +{skill.level * 5}%
                  </div>
                  <div className="text-muted-foreground text-xs">Performance</div>
                </div>
                <div className="text-center">
                  <div className={`font-bold ${skill.color}`}>
                    +{Math.floor(skill.level * 2)}
                  </div>
                  <div className="text-muted-foreground text-xs">Skill Points</div>
                </div>
              </div>
            </div>

            {/* Glow effect for upgradeable skills */}
            {availablePoints > 0 && skill.level < skill.maxLevel && (
              <div className="absolute inset-0 rounded-xl bg-primary/5 border border-primary/20 animate-pulse pointer-events-none" />
            )}
          </div>
        ))}
      </div>

      {/* Total Stats Summary */}
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30">
        <h3 className="font-orbitron font-bold text-center mb-3 neon-text">Student Level</h3>
        <div className="text-center">
          <div className="text-4xl font-orbitron font-bold neon-accent mb-2">
            {skills.reduce((sum, skill) => sum + skill.level, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Development</div>
        </div>
      </div>
    </div>
  );
};