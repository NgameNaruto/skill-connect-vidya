
import * as React from 'react';
import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();
  
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id={id}
        className="sr-only"
        ref={ref}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          'relative inline-block h-6 w-11 cursor-pointer rounded-full bg-muted transition-colors',
          props.checked && 'bg-primary',
          className
        )}
      >
        <span 
          className={cn(
            'absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform',
            props.checked && 'translate-x-5'
          )} 
        />
      </label>
    </div>
  );
});
Switch.displayName = 'Switch';

export { Switch };
