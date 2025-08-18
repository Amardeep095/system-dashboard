import React, { useState } from 'react';
import { Trophy, Star, Clock, CheckCircle2, XCircle, RotateCcw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'milestone';
  progress: number;
  maxProgress: number;
  completed: boolean;
  reward: {
    xp: number;
    skillPoints: number;
    title?: string;
  };
  deadline?: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
}

const initialQuests: Quest[] = [
  {
    id: '1',
    title: 'Daily Study Routine',
    description: 'Complete 4 hours of focused study',
    type: 'daily',
    progress: 2,
    maxProgress: 4,
    completed: false,
    reward: { xp: 100, skillPoints: 1 },
    deadline: '2024-08-19',
    difficulty: 'easy'
  },
  {
    id: '2',
    title: 'Protein Goal Achievement',
    description: 'Reach daily protein target of 108g',
    type: 'daily',
    progress: 65,
    maxProgress: 108,
    completed: false,
    reward: { xp: 150, skillPoints: 1 },
    deadline: '2024-08-19',
    difficulty: 'medium'
  },
  {
    id: '3',
    title: 'Physical Training',
    description: 'Complete workout routine',
    type: 'daily',
    progress: 0,
    maxProgress: 1,
    completed: false,
    reward: { xp: 200, skillPoints: 2 },
    deadline: '2024-08-19',
    difficulty: 'medium'
  },
  {
    id: '4',
    title: 'Weekly Assessment',
    description: 'Complete all weekly assignments',
    type: 'weekly',
    progress: 3,
    maxProgress: 7,
    completed: false,
    reward: { xp: 500, skillPoints: 5 },
    deadline: '2024-08-25',
    difficulty: 'hard'
  },
  {
    id: '5',
    title: 'Academic Excellence',
    description: 'Achieve 90+ average in all subjects',
    type: 'milestone',
    progress: 85,
    maxProgress: 90,
    completed: false,
    reward: { xp: 1000, skillPoints: 10, title: 'Scholar' },
    difficulty: 'legendary'
  }
];

export const QuestManager: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [filter, setFilter] = useState<'all' | 'daily' | 'weekly' | 'milestone'>('all');

  const updateQuestProgress = (questId: string, increment: number) => {
    setQuests(prev => prev.map(quest => {
      if (quest.id === questId && !quest.completed) {
        const newProgress = Math.min(quest.progress + increment, quest.maxProgress);
        const isCompleted = newProgress >= quest.maxProgress;
        return {
          ...quest,
          progress: newProgress,
          completed: isCompleted
        };
      }
      return quest;
    }));
  };

  const resetQuests = () => {
    setQuests(initialQuests);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-orange-400';
      case 'legendary': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return <Clock className="w-4 h-4" />;
      case 'weekly': return <Star className="w-4 h-4" />;
      case 'milestone': return <Trophy className="w-4 h-4" />;
      default: return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const filteredQuests = quests.filter(quest => 
    filter === 'all' || quest.type === filter
  );

  const completedQuests = quests.filter(q => q.completed).length;
  const totalXP = quests.filter(q => q.completed).reduce((sum, q) => sum + q.reward.xp, 0);

  return (
    <div className="quest-manager system-panel p-6 animate-slide-in-up animate-delay-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-purple-500/20 border border-purple-500/50 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold neon-text">Quest Manager</h2>
            <p className="text-sm text-muted-foreground">Daily objectives & milestones</p>
          </div>
        </div>
        <Button
          onClick={resetQuests}
          variant="outline"
          size="sm"
          className="system-btn"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 rounded-lg bg-background/20 border border-border/30">
          <div className="text-2xl font-orbitron font-bold neon-accent">{completedQuests}</div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-background/20 border border-border/30">
          <div className="text-2xl font-orbitron font-bold text-primary">{totalXP}</div>
          <div className="text-xs text-muted-foreground">Total XP</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-background/20 border border-border/30">
          <div className="text-2xl font-orbitron font-bold text-accent">{quests.length}</div>
          <div className="text-xs text-muted-foreground">Active</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {['all', 'daily', 'weekly', 'milestone'].map((filterType) => (
          <Button
            key={filterType}
            onClick={() => setFilter(filterType as any)}
            variant={filter === filterType ? "default" : "outline"}
            size="sm"
            className="system-btn capitalize"
          >
            {filterType}
          </Button>
        ))}
      </div>

      {/* Quest List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredQuests.map((quest, index) => (
          <div
            key={quest.id}
            className={`quest-card p-4 rounded-lg border transition-all duration-300 ${
              quest.completed
                ? 'bg-success/10 border-success/30'
                : 'bg-background/30 border-border/50 hover:border-primary/50'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                  quest.completed ? 'bg-success/20' : 'bg-primary/20'
                }`}>
                  {quest.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  ) : (
                    getTypeIcon(quest.type)
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    {quest.title}
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getDifficultyColor(quest.difficulty)}`}
                    >
                      {quest.difficulty}
                    </Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground">{quest.description}</p>
                </div>
              </div>
              
              {!quest.completed && (
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="px-2 py-1 h-6 text-xs"
                    onClick={() => updateQuestProgress(quest.id, 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">
                  Progress: {quest.progress}/{quest.maxProgress}
                </span>
                <span className={quest.completed ? 'text-success' : 'text-primary'}>
                  {Math.round((quest.progress / quest.maxProgress) * 100)}%
                </span>
              </div>
              <Progress 
                value={(quest.progress / quest.maxProgress) * 100} 
                className="h-2"
              />
            </div>

            {/* Rewards & Deadline */}
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span>🎯 {quest.reward.xp} XP</span>
                <span>⭐ {quest.reward.skillPoints} SP</span>
                {quest.reward.title && (
                  <span className="text-accent">👑 {quest.reward.title}</span>
                )}
              </div>
              {quest.deadline && (
                <div className="text-muted-foreground">
                  📅 {quest.deadline}
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredQuests.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No quests available for this filter
          </div>
        )}
      </div>
    </div>
  );
};