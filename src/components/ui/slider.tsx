
import * as React from 'react';
import { cn } from '@/lib/utils';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  max?: number;
  min?: number;
  step?: number;
  defaultValue?: number | number[];
  value?: number | number[];
  onValueChange?: (value: number[]) => void;
  orientation?: 'horizontal' | 'vertical';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ 
    className, 
    max = 100, 
    min = 0, 
    step = 1, 
    defaultValue, 
    value, 
    onValueChange,
    onChange,
    orientation = 'horizontal',
    ...props 
  }, ref) => {
    const initialValue = React.useMemo(() => {
      if (value !== undefined) {
        return Array.isArray(value) ? value[0] : value;
      }
      if (defaultValue !== undefined) {
        return Array.isArray(defaultValue) ? defaultValue[0] : defaultValue;
      }
      return min;
    }, []);
    
    const [internalValue, setInternalValue] = React.useState<number>(initialValue);

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(Array.isArray(value) ? value[0] : value);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      setInternalValue(newValue);
      
      if (onChange) {
        onChange(e);
      }
      
      if (onValueChange) {
        onValueChange([newValue]);
      }
    };

    const percentage = ((internalValue - min) / (max - min)) * 100;

    return (
      <div
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          orientation === 'vertical' ? 'h-full' : '',
          className
        )}
      >
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={internalValue}
          onChange={handleChange}
          className={cn(
            'w-full h-2 bg-muted rounded-full appearance-none cursor-pointer',
            'transparent',
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full'
          )}
          style={{
            background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, var(--muted) ${percentage}%, var(--muted) 100%)`
          }}
          {...props}
        />
      </div>
    );
  }
);
Slider.displayName = 'Slider';

export { Slider };
