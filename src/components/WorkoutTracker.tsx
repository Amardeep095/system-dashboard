import React, { useState } from 'react';
import { Dumbbell, Plus, RotateCcw, Flame, Timer, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WorkoutEntry {
  id: string;
  exercise: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number; // in minutes
  time: string;
}

export const WorkoutTracker: React.FC = () => {
  const [entries, setEntries] = useState<WorkoutEntry[]>([
    { id: '1', exercise: 'Push-ups', sets: 3, reps: 15, time: '07:30' },
    { id: '2', exercise: 'Squats', sets: 3, reps: 20, time: '07:45' },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  const addEntry = () => {
    if (exercise.trim() && sets.trim() && reps.trim()) {
      const entry: WorkoutEntry = {
        id: Date.now().toString(),
        exercise: exercise.trim(),
        sets: parseInt(sets),
        reps: parseInt(reps),
        weight: weight ? parseInt(weight) : undefined,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setEntries([...entries, entry]);
      setExercise('');
      setSets('');
      setReps('');
      setWeight('');
      setIsAdding(false);
    }
  };

  const resetTracker = () => {
    setEntries([]);
  };

  // Calculate workout stats
  const totalSets = entries.reduce((sum, entry) => sum + entry.sets, 0);
  const totalReps = entries.reduce((sum, entry) => sum + (entry.sets * entry.reps), 0);
  const workoutTime = entries.length > 0 ? Math.max(1, entries.length * 10) : 0; // Estimate

  return (
    <div className="system-panel p-6 animate-slide-in-up animate-delay-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-orange-500/20 border border-orange-500/50 flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold neon-text">Workout Log</h2>
            <p className="text-sm text-muted-foreground">Today's training session</p>
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

      {/* Workout Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 rounded-lg bg-background/20 border border-border/30">
          <Target className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-orbitron font-bold neon-text">{entries.length}</div>
          <div className="text-xs text-muted-foreground uppercase">Exercises</div>
        </div>
        
        <div className="text-center p-4 rounded-lg bg-background/20 border border-border/30">
          <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
          <div className="text-2xl font-orbitron font-bold neon-text">{totalSets}</div>
          <div className="text-xs text-muted-foreground uppercase">Total Sets</div>
        </div>
        
        <div className="text-center p-4 rounded-lg bg-background/20 border border-border/30">
          <Timer className="w-6 h-6 text-accent mx-auto mb-2" />
          <div className="text-2xl font-orbitron font-bold neon-text">{workoutTime}m</div>
          <div className="text-xs text-muted-foreground uppercase">Duration</div>
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
        {entries.map((entry, index) => (
          <div 
            key={entry.id} 
            className="quest-card border-l-orange-500"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{entry.exercise}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{entry.sets} sets × {entry.reps} reps</span>
                  {entry.weight && <span>{entry.weight}kg</span>}
                  <span className="text-primary">{entry.time}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-orbitron font-bold text-orange-400">
                  {entry.sets * entry.reps}
                </div>
                <div className="text-xs text-muted-foreground">total reps</div>
              </div>
            </div>
          </div>
        ))}
        
        {entries.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No exercises logged yet. Start your training!
          </div>
        )}
      </div>

      {/* Add Exercise Form */}
      {isAdding ? (
        <div className="system-panel p-4 border-2 border-primary/50 space-y-3">
          <Input
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            placeholder="Exercise name (e.g., Push-ups, Squats)"
            className="bg-background/50 border-border"
          />
          <div className="grid grid-cols-3 gap-2">
            <Input
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              placeholder="Sets"
              className="bg-background/50 border-border"
              min="1"
            />
            <Input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              placeholder="Reps"
              className="bg-background/50 border-border"
              min="1"
            />
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight (kg)"
              className="bg-background/50 border-border"
              min="0"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={addEntry} className="flex-1 system-btn">
              Add Exercise
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
          Log Exercise
        </Button>
      )}

      {/* Strength Progress Indicator */}
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30">
        <div className="text-center">
          <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
          <div className="text-sm text-muted-foreground mb-2">Strength Gained Today</div>
          <div className="text-3xl font-orbitron font-bold neon-accent">
            +{Math.min(totalReps, 999)}
          </div>
          <div className="text-xs text-muted-foreground">EXP Points</div>
        </div>
      </div>
    </div>
  );
};