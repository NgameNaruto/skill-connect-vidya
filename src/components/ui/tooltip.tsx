
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  className?: string;
  asChild?: boolean;
  delayDuration?: number;
}

const Tooltip = ({ 
  content, 
  children, 
  delay = 300, 
  side = 'top', 
  align = 'center', 
  className,
  asChild = false
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const sideClasses = {
    top: 'bottom-full mb-2',
    right: 'left-full ml-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  };

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 max-w-xs px-2 py-1 text-xs text-white bg-black rounded pointer-events-none',
            sideClasses[side],
            alignClasses[align],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};

// TooltipProvider is just a pass-through component for compatibility
const TooltipProvider = ({ 
  children, 
  delayDuration 
}: { 
  children: React.ReactNode; 
  delayDuration?: number;
}) => {
  return <>{children}</>;
};

const TooltipTrigger = ({ 
  children, 
  asChild 
}: { 
  children: React.ReactNode; 
  asChild?: boolean; 
}) => {
  return <>{children}</>;
};

const TooltipContent = ({ 
  children, 
  side,
  align,
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { 
  side?: 'top' | 'right' | 'bottom' | 'left'; 
  align?: 'start' | 'center' | 'end';
  hidden?: boolean;
}) => {
  return <div {...props}>{children}</div>;
};

export { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent };
