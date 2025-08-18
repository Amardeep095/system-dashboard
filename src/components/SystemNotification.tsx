import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'levelup';
  title: string;
  message: string;
  duration?: number;
}

interface SystemNotificationProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export const SystemNotification: React.FC<SystemNotificationProps> = ({ 
  notifications, 
  onDismiss 
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Add new notifications with entrance animation
    const newNotifications = notifications.filter(
      n => !visibleNotifications.some(v => v.id === n.id)
    );
    
    if (newNotifications.length > 0) {
      setVisibleNotifications(prev => [...prev, ...newNotifications]);
    }
  }, [notifications]);

  useEffect(() => {
    // Auto-dismiss notifications after their duration
    const timers = visibleNotifications.map(notification => {
      if (notification.duration && notification.duration > 0) {
        return setTimeout(() => {
          handleDismiss(notification.id);
        }, notification.duration);
      }
      return null;
    }).filter(Boolean);

    return () => {
      timers.forEach(timer => timer && clearTimeout(timer));
    };
  }, [visibleNotifications]);

  const handleDismiss = (id: string) => {
    setVisibleNotifications(prev => prev.filter(n => n.id !== id));
    onDismiss(id);
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-6 h-6" />;
      case 'warning': return <AlertTriangle className="w-6 h-6" />;
      case 'levelup': return <Zap className="w-6 h-6" />;
      default: return <Info className="w-6 h-6" />;
    }
  };

  const getStyles = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'border-success/50 bg-success/10 text-success';
      case 'warning':
        return 'border-warning/50 bg-warning/10 text-warning';
      case 'levelup':
        return 'border-primary/50 bg-primary/10 text-primary shadow-neon';
      default:
        return 'border-accent/50 bg-accent/10 text-accent';
    }
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
      {visibleNotifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`system-panel p-4 max-w-sm pointer-events-auto border-2 ${getStyles(notification.type)} animate-slide-in-up`}
          style={{ 
            animationDelay: `${index * 0.1}s`,
            animationFillMode: 'both'
          }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              {getIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-orbitron font-bold text-sm mb-1">
                {notification.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {notification.message}
              </p>
            </div>

            <Button
              onClick={() => handleDismiss(notification.id)}
              variant="ghost"
              size="sm"
              className="flex-shrink-0 w-6 h-6 p-0 hover:bg-background/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Special effects for level up */}
          {notification.type === 'levelup' && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 animate-shimmer" />
              {/* Sparkle effects */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + i * 20}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};