import React, { useState } from 'react';
import { Utensils, Plus, RotateCcw, TrendingUp, Calendar, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MealEntry {
  id: string;
  mealType: string;
  items: string[];
  calories: number;
  protein: number;
  time: string;
}

interface DayPlan {
  day: number;
  title: string;
  meals: {
    breakfast: { items: string[]; calories: number; protein: number };
    snack1: { items: string[]; calories: number; protein: number };
    lunch: { items: string[]; calories: number; protein: number };
    snack2: { items: string[]; calories: number; protein: number };
    dinner?: { items: string[]; calories: number; protein: number };
  };
  totalCalories: number;
  totalProtein: number;
}

const weeklyPlan: DayPlan[] = [
  {
    day: 1,
    title: "Overnight Oats + Chicken",
    meals: {
      breakfast: { 
        items: ["Overnight oats (150mL milk, 60g oats, 1 banana, 1 scoop whey)"], 
        calories: 450, 
        protein: 30 
      },
      snack1: { 
        items: ["5 boiled eggs"], 
        calories: 350, 
        protein: 30 
      },
      lunch: { 
        items: ["150g grilled chicken", "1 cup rice", "sautéed veggies"], 
        calories: 500, 
        protein: 40 
      },
      snack2: { 
        items: ["2 slices brown bread", "1 tsp peanut butter"], 
        calories: 250, 
        protein: 8 
      }
    },
    totalCalories: 1550,
    totalProtein: 108
  },
  {
    day: 2,
    title: "Shake + Paneer",
    meals: {
      breakfast: { 
        items: ["Banana shake (150mL milk, 60g oats, 1 banana, 1 scoop whey)"], 
        calories: 450, 
        protein: 30 
      },
      snack1: { 
        items: ["5 boiled eggs"], 
        calories: 350, 
        protein: 30 
      },
      lunch: { 
        items: ["150g paneer", "2 chapatis or 1 cup rice", "mixed vegetables"], 
        calories: 500, 
        protein: 35 
      },
      snack2: { 
        items: ["2 slices brown bread", "peanut butter", "pineapple slice"], 
        calories: 270, 
        protein: 10 
      }
    },
    totalCalories: 1570,
    totalProtein: 105
  },
  {
    day: 3,
    title: "Overnight Oats + Chicken",
    meals: {
      breakfast: { 
        items: ["Overnight oats"], 
        calories: 450, 
        protein: 30 
      },
      snack1: { 
        items: ["5 boiled eggs"], 
        calories: 350, 
        protein: 30 
      },
      lunch: { 
        items: ["150g grilled chicken", "2 chapatis", "sautéed spinach"], 
        calories: 500, 
        protein: 40 
      },
      snack2: { 
        items: [], 
        calories: 0, 
        protein: 0 
      },
      dinner: { 
        items: ["Steamed broccoli", "cucumber salad", "optional 2 boiled eggs"], 
        calories: 250, 
        protein: 20 
      }
    },
    totalCalories: 1550,
    totalProtein: 120
  },
  {
    day: 4,
    title: "Shake + Paneer",
    meals: {
      breakfast: { 
        items: ["Banana shake"], 
        calories: 450, 
        protein: 30 
      },
      snack1: { 
        items: ["5 eggs (boiled or omelette)"], 
        calories: 350, 
        protein: 30 
      },
      lunch: { 
        items: ["150g paneer", "1 cup brown rice", "sautéed vegetables"], 
        calories: 500, 
        protein: 35 
      },
      snack2: { 
        items: ["2 slices brown bread", "peanut butter"], 
        calories: 250, 
        protein: 8 
      }
    },
    totalCalories: 1550,
    totalProtein: 103
  },
  {
    day: 5,
    title: "Overnight Oats + Chicken",
    meals: {
      breakfast: { 
        items: ["Overnight oats"], 
        calories: 450, 
        protein: 30 
      },
      snack1: { 
        items: ["5 boiled eggs"], 
        calories: 350, 
        protein: 30 
      },
      lunch: { 
        items: ["150g grilled chicken", "1 cup rice", "sautéed veggies"], 
        calories: 500, 
        protein: 40 
      },
      snack2: { 
        items: ["2 slices brown bread", "1 tsp peanut butter"], 
        calories: 250, 
        protein: 8 
      }
    },
    totalCalories: 1550,
    totalProtein: 108
  },
  {
    day: 6,
    title: "Shake + Paneer",
    meals: {
      breakfast: { 
        items: ["Banana shake"], 
        calories: 450, 
        protein: 30 
      },
      snack1: { 
        items: ["5 boiled eggs"], 
        calories: 350, 
        protein: 30 
      },
      lunch: { 
        items: ["150g paneer", "2 chapatis or 1 cup rice", "mixed vegetables"], 
        calories: 500, 
        protein: 35 
      },
      snack2: { 
        items: ["2 slices brown bread", "peanut butter"], 
        calories: 250, 
        protein: 8 
      }
    },
    totalCalories: 1550,
    totalProtein: 103
  },
  {
    day: 7,
    title: "Flex Day (Egg Focused)",
    meals: {
      breakfast: { 
        items: ["5 eggs (omelette)", "2 slices brown bread"], 
        calories: 400, 
        protein: 30 
      },
      snack1: { 
        items: [], 
        calories: 0, 
        protein: 0 
      },
      lunch: { 
        items: ["150g chicken", "1 cup rice or 2 chapatis", "mixed veggies"], 
        calories: 500, 
        protein: 40 
      },
      snack2: { 
        items: ["Brown bread + peanut butter"], 
        calories: 250, 
        protein: 8 
      },
      dinner: { 
        items: ["Salad"], 
        calories: 150, 
        protein: 5 
      }
    },
    totalCalories: 1300,
    totalProtein: 83
  }
];

export const ProteinTracker: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [consumedMeals, setConsumedMeals] = useState<Set<string>>(new Set());
  const [customEntries, setCustomEntries] = useState<MealEntry[]>([]);

  const currentPlan = weeklyPlan.find(plan => plan.day === selectedDay) || weeklyPlan[0];
  
  const getConsumedCalories = () => {
    let calories = 0;
    Object.entries(currentPlan.meals).forEach(([mealType, meal]) => {
      if (consumedMeals.has(`${selectedDay}-${mealType}`)) {
        calories += meal.calories;
      }
    });
    return calories + customEntries.reduce((sum, entry) => sum + entry.calories, 0);
  };

  const getConsumedProtein = () => {
    let protein = 0;
    Object.entries(currentPlan.meals).forEach(([mealType, meal]) => {
      if (consumedMeals.has(`${selectedDay}-${mealType}`)) {
        protein += meal.protein;
      }
    });
    return protein + customEntries.reduce((sum, entry) => sum + entry.protein, 0);
  };

  const toggleMeal = (mealType: string) => {
    const mealId = `${selectedDay}-${mealType}`;
    const newConsumedMeals = new Set(consumedMeals);
    if (newConsumedMeals.has(mealId)) {
      newConsumedMeals.delete(mealId);
    } else {
      newConsumedMeals.add(mealId);
    }
    setConsumedMeals(newConsumedMeals);
  };

  const resetTracker = () => {
    setConsumedMeals(new Set());
    setCustomEntries([]);
  };

  const currentCalories = getConsumedCalories();
  const currentProtein = getConsumedProtein();
  const calorieProgress = Math.min((currentCalories / currentPlan.totalCalories) * 100, 100);
  const proteinProgress = Math.min((currentProtein / currentPlan.totalProtein) * 100, 100);

  return (
    <div className="system-panel p-6 animate-slide-in-up animate-delay-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/50 flex items-center justify-center">
            <Utensils className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold neon-text">Diet Management</h2>
            <p className="text-sm text-muted-foreground">Weekly nutrition plan</p>
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

      {/* Day Selection */}
      <div className="mb-6">
        <Select value={selectedDay.toString()} onValueChange={(value) => setSelectedDay(parseInt(value))}>
          <SelectTrigger className="system-btn">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {weeklyPlan.map((plan) => (
              <SelectItem key={plan.day} value={plan.day.toString()}>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Day {plan.day}: {plan.title}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Progress Display */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-orbitron font-bold neon-accent mb-1">
            {currentCalories}
          </div>
          <div className="text-xs text-muted-foreground mb-2">/ {currentPlan.totalCalories} kcal</div>
          <div className="progress-glow h-2">
            <div 
              className="progress-fill bg-primary transition-all duration-700" 
              style={{ width: `${calorieProgress}%` }}
            />
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-orbitron font-bold neon-accent mb-1">
            {currentProtein}g
          </div>
          <div className="text-xs text-muted-foreground mb-2">/ {currentPlan.totalProtein}g protein</div>
          <div className="progress-glow h-2">
            <div 
              className="progress-fill bg-health transition-all duration-700" 
              style={{ width: `${proteinProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Meal Plan */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {Object.entries(currentPlan.meals).map(([mealType, meal]) => {
          if (meal.items.length === 0) return null;
          
          const mealId = `${selectedDay}-${mealType}`;
          const isConsumed = consumedMeals.has(mealId);
          
          return (
            <div 
              key={mealType}
              className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                isConsumed 
                  ? 'bg-success/20 border-success/50' 
                  : 'bg-background/30 border-border/50 hover:border-primary/50'
              }`}
              onClick={() => toggleMeal(mealType)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-primary" />
                  <h4 className="font-medium capitalize text-foreground">
                    {mealType === 'snack1' ? 'Morning Snack' : 
                     mealType === 'snack2' ? 'Pre-workout Snack' : mealType}
                  </h4>
                  {isConsumed && <div className="w-2 h-2 bg-success rounded-full" />}
                </div>
                <div className="text-right text-sm">
                  <div className="text-primary font-bold">{meal.calories} kcal</div>
                  <div className="text-accent">{meal.protein}g protein</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {meal.items.join(' • ')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Summary */}
      <div className="mt-6 p-4 rounded-lg bg-background/20 border border-border/30">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <TrendingUp className="w-4 h-4" />
          Day {selectedDay} Progress
        </div>
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="font-orbitron font-bold text-primary">
              {Math.round(calorieProgress)}%
            </div>
            <div className="text-xs text-muted-foreground">Calories</div>
          </div>
          <div>
            <div className="font-orbitron font-bold text-accent">
              {Math.round(proteinProgress)}%
            </div>
            <div className="text-xs text-muted-foreground">Protein</div>
          </div>
          <div>
            <div className="font-orbitron font-bold text-success">
              {Object.keys(currentPlan.meals).filter(meal => 
                currentPlan.meals[meal as keyof typeof currentPlan.meals].items.length > 0 &&
                consumedMeals.has(`${selectedDay}-${meal}`)
              ).length}
            </div>
            <div className="text-xs text-muted-foreground">Meals</div>
          </div>
        </div>
      </div>
    </div>
  );
};