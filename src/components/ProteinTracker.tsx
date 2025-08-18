import React, { useState } from 'react';
import { Beef, Plus, RotateCcw, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProteinEntry {
  id: string;
  source: string;
  amount: number;
  time: string;
}

export const ProteinTracker: React.FC = () => {
  const [entries, setEntries] = useState<ProteinEntry[]>([
    { id: '1', source: 'Chicken Breast', amount: 35, time: '08:30' },
    { id: '2', source: 'Protein Shake', amount: 25, time: '10:15' },
  ]);
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const dailyGoal = 150; // grams
  const currentTotal = entries.reduce((sum, entry) => sum + entry.amount, 0);
  const progressPercentage = Math.min((currentTotal / dailyGoal) * 100, 100);

  const addEntry = () => {
    if (source.trim() && amount.trim()) {
      const entry: ProteinEntry = {
        id: Date.now().toString(),
        source: source.trim(),
        amount: parseInt(amount),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setEntries([...entries, entry]);
      setSource('');
      setAmount('');
      setIsAdding(false);
    }
  };

  const resetTracker = () => {
    setEntries([]);
  };

  return (
    <div className="system-panel p-6 animate-slide-in-up animate-delay-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center">
            <Beef className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold neon-text">Protein Intake</h2>
            <p className="text-sm text-muted-foreground">Daily nutrition tracking</p>
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

      {/* Progress Display */}
      <div className="text-center mb-6">
        <div className="text-4xl font-orbitron font-bold neon-accent mb-2">
          {currentTotal}g
        </div>
        <div className="text-sm text-muted-foreground mb-4">of {dailyGoal}g daily goal</div>
        
        <div className="progress-glow h-4 mb-2">
          <div 
            className="progress-fill bg-health transition-all duration-700" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">0g</span>
          <span className={currentTotal >= dailyGoal ? 'text-success' : 'text-primary'}>
            {Math.round(progressPercentage)}% Complete
          </span>
          <span className="text-muted-foreground">{dailyGoal}g</span>
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
        {entries.map((entry, index) => (
          <div 
            key={entry.id} 
            className="flex justify-between items-center p-3 rounded-lg bg-background/30 border border-border/50"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div>
              <div className="font-medium text-foreground">{entry.source}</div>
              <div className="text-sm text-muted-foreground">{entry.time}</div>
            </div>
            <div className="font-bold text-primary">{entry.amount}g</div>
          </div>
        ))}
        
        {entries.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No protein entries yet today
          </div>
        )}
      </div>

      {/* Add Entry Form */}
      {isAdding ? (
        <div className="system-panel p-4 border-2 border-primary/50 space-y-3">
          <Input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Protein source (e.g., Chicken, Eggs, Shake)"
            className="bg-background/50 border-border"
          />
          <div className="flex gap-2">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount (g)"
              className="flex-1 bg-background/50 border-border"
              min="0"
            />
            <Button onClick={addEntry} className="system-btn">
              Add
            </Button>
            <Button 
              onClick={() => setIsAdding(false)} 
              variant="outline" 
              className="system-btn"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsAdding(true)}
          className="w-full system-btn"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Protein
        </Button>
      )}

      {/* Stats */}
      <div className="mt-6 p-4 rounded-lg bg-background/20 border border-border/30">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <TrendingUp className="w-4 h-4" />
          Today's Stats
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="font-orbitron font-bold text-primary">{entries.length}</div>
            <div className="text-xs text-muted-foreground">Meals</div>
          </div>
          <div>
            <div className="font-orbitron font-bold text-accent">
              {entries.length ? Math.round(currentTotal / entries.length) : 0}g
            </div>
            <div className="text-xs text-muted-foreground">Avg/Meal</div>
          </div>
        </div>
      </div>
    </div>
  );
};