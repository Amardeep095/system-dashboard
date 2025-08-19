import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [acceptQuest, setAcceptQuest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!username.trim()) {
      toast({
        title: "System Error",
        description: "Please enter your system username.",
        variant: "destructive"
      });
      return;
    }

    if (!acceptQuest) {
      toast({
        title: "Quest Declined",
        description: "You must accept the quest to proceed.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate authentication process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store username in localStorage
    localStorage.setItem('systemUsername', username);
    localStorage.setItem('questAccepted', 'true');
    
    toast({
      title: "System Access Granted",
      description: `Welcome, ${username}. Quest accepted successfully.`,
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      <ParticleBackground />
      
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* System Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-orbitron font-bold neon-accent mb-2 animate-fade-in">
            SYSTEM ACCESS
          </h1>
          <p className="text-sm text-muted-foreground font-exo animate-fade-in animate-delay-100">
            Solo Leveling Enhancement Protocol
          </p>
          <div className="w-24 h-0.5 bg-neon mx-auto mt-2 rounded-full animate-shimmer"></div>
        </div>

        {/* Login Card */}
        <Card className="system-panel border-primary/20 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="font-orbitron text-xl neon-accent">
              Initialize System
            </CardTitle>
            <CardDescription className="font-exo text-muted-foreground">
              Enter your credentials to begin your journey
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <Label htmlFor="username" className="font-exo text-sm font-medium">
                System Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username..."
                className="bg-background/50 border-primary/30 focus:border-primary font-exo"
                disabled={isLoading}
              />
            </div>

            {/* Quest Acceptance */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="font-orbitron text-sm font-semibold mb-2 text-primary">
                  Quest: Personal Enhancement Protocol
                </h3>
                <p className="text-xs text-muted-foreground font-exo leading-relaxed">
                  Embark on a journey of continuous improvement. Track your progress, 
                  complete daily quests, and unlock your true potential through the 
                  systematic enhancement of your physical and mental capabilities.
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="accept-quest"
                  checked={acceptQuest}
                  onCheckedChange={(checked) => setAcceptQuest(checked as boolean)}
                  disabled={isLoading}
                />
                <Label 
                  htmlFor="accept-quest" 
                  className="font-exo text-sm cursor-pointer flex-1"
                >
                  I accept the quest and am ready to begin my enhancement journey
                </Label>
              </div>
            </div>

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full font-orbitron font-semibold bg-primary hover:bg-primary/90 text-primary-foreground h-12"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  Initializing System...
                </div>
              ) : (
                'Initialize Enhancement Protocol'
              )}
            </Button>

            {/* System Status */}
            <div className="text-center pt-4 border-t border-border/50">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-exo">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>System Online • Neural Link Ready</span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground/60 font-orbitron">
                SOLO LEVELING SYSTEM v2.1.7
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;