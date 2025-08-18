import React, { useState } from 'react';
import { Plus, Check, X, Target, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Quest {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  reward: number;
}

export const QuestLog: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>([
    { id: '1', title: 'Complete morning workout', completed: false, priority: 'high', reward: 100 },
    { id: '2', title: 'Drink 8 glasses of water', completed: false, priority: 'medium', reward: 50 },
    { id: '3', title: 'Read for 30 minutes', completed: true, priority: 'low', reward: 25 },
  ]);
  const [newQuest, setNewQuest] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const addQuest = () => {
    if (newQuest.trim()) {
      const quest: Quest = {
        id: Date.now().toString(),
        title: newQuest.trim(),
        completed: false,
        priority: 'medium',
        reward: 50
      };
      setQuests([...quests, quest]);
      setNewQuest('');
      setIsAdding(false);
    }
  };

  const toggleQuest = (id: string) => {
    setQuests(quests.map(quest => 
      quest.id === id ? { ...quest, completed: !quest.completed } : quest
    ));
  };

  const deleteQuest = (id: string) => {
    setQuests(quests.filter(quest => quest.id !== id));
  };

  const resetQuests = () => {
    setQuests(quests.map(quest => ({ ...quest, completed: false })));
  };

  const getPriorityColor = (priority: Quest['priority']) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-amber-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-primary';
    }
  };

  const completedQuests = quests.filter(q => q.completed).length;
  const totalXpEarned = quests.filter(q => q.completed).reduce((sum, q) => sum + q.reward, 0);

  return (
    <div className="system-panel p-6 animate-slide-in-up animate-delay-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-xl font-orbitron font-bold neon-text">Daily Quests</h2>
            <p className="text-sm text-muted-foreground">
              {completedQuests}/{quests.length} completed • {totalXpEarned} XP earned
            </p>
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

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="progress-glow h-2">
          <div 
            className="progress-fill bg-xp transition-all duration-700" 
            style={{ width: `${quests.length ? (completedQuests / quests.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Quest List */}
      <div className="space-y-3 mb-4">
        {quests.map((quest, index) => (
          <div
            key={quest.id}
            className={`quest-card ${getPriorityColor(quest.priority)} ${
              quest.completed ? 'opacity-60' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleQuest(quest.id)}
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                  quest.completed 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-primary hover:bg-primary/20'
                }`}
              >
                {quest.completed && <Check className="w-4 h-4" />}
              </button>
              
              <div className="flex-1">
                <h3 className={`font-semibold ${quest.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {quest.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="capitalize">{quest.priority} Priority</span>
                  <span>•</span>
                  <span className="text-primary">+{quest.reward} XP</span>
                </div>
              </div>

              <button
                onClick={() => deleteQuest(quest.id)}
                className="w-8 h-8 rounded-lg bg-destructive/20 border border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
              >
                <X className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Quest */}
      {isAdding ? (
        <div className="system-panel p-4 border-2 border-primary/50">
          <div className="flex gap-2">
            <Input
              value={newQuest}
              onChange={(e) => setNewQuest(e.target.value)}
              placeholder="Enter new quest..."
              className="flex-1 bg-background/50 border-border"
              onKeyDown={(e) => {
                if (e.key === 'Enter') addQuest();
                if (e.key === 'Escape') setIsAdding(false);
              }}
              autoFocus
            />
            <Button onClick={addQuest} className="system-btn">
              <Check className="w-4 h-4" />
            </Button>
            <Button 
              onClick={() => setIsAdding(false)} 
              variant="outline" 
              className="system-btn"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsAdding(true)}
          className="w-full system-btn"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Quest
        </Button>
      )}
    </div>
  );
};