
import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  mode?: 'single' | 'multiple' | 'range';
  selected?: Date | Date[] | { from: Date; to: Date };
  onSelect?: (date: Date | Date[] | undefined) => void;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  mode = "single",
  selected,
  onSelect,
  ...props
}: CalendarProps) {
  const handleSelect = (date: Date | undefined) => {
    if (onSelect) {
      if (mode === 'single') {
        onSelect(date);
      } else if (mode === 'multiple' && selected instanceof Array) {
        if (date) {
          // Toggle the date
          const isSelected = selected.some(
            (selectedDate) => selectedDate.toDateString() === date.toDateString()
          );
          
          if (isSelected) {
            onSelect(
              selected.filter(
                (selectedDate) => selectedDate.toDateString() !== date.toDateString()
              )
            );
          } else {
            onSelect([...selected, date]);
          }
        }
      }
    }
  };
  
  return (
    <div className={cn("p-3", className)}>
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={() => props.onMonthChange?.(
            new Date(
              props.month ? props.month.getFullYear() : new Date().getFullYear(), 
              props.month ? props.month.getMonth() - 1 : new Date().getMonth() - 1
            )
          )}
          className="p-1 rounded-md hover:bg-accent"
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <div className="font-medium">
          {props.month ? `${props.month.toLocaleString('default', { month: 'long' })} ${props.month.getFullYear()}` : ''}
        </div>
        
        <button 
          onClick={() => props.onMonthChange?.(
            new Date(
              props.month ? props.month.getFullYear() : new Date().getFullYear(), 
              props.month ? props.month.getMonth() + 1 : new Date().getMonth() + 1
            )
          )}
          className="p-1 rounded-md hover:bg-accent"
          type="button"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {Array(35).fill(null).map((_, index) => {
          const date = new Date(
            props.month ? props.month.getFullYear() : new Date().getFullYear(),
            props.month ? props.month.getMonth() : new Date().getMonth(),
            1 + index - (new Date(
              props.month ? props.month.getFullYear() : new Date().getFullYear(),
              props.month ? props.month.getMonth() : new Date().getMonth(),
              1
            ).getDay())
          );
          
          const isSelected = 
            mode === 'single' && selected instanceof Date ? 
              selected.toDateString() === date.toDateString() : 
            mode === 'multiple' && selected instanceof Array ? 
              selected.some(d => d.toDateString() === date.toDateString()) : 
              false;
              
          const isToday = new Date().toDateString() === date.toDateString();
          const isOutsideMonth = date.getMonth() !== (props.month ? props.month.getMonth() : new Date().getMonth());
          const isDisabled = props.disabled?.(date) || false;
          
          return (
            <button
              key={index}
              type="button"
              disabled={isDisabled}
              onClick={() => handleSelect(date)}
              className={cn(
                "h-8 w-8 rounded-md text-center text-sm p-0 font-normal aria-selected:opacity-100",
                isOutsideMonth && !showOutsideDays && "invisible",
                isOutsideMonth && showOutsideDays && "text-muted-foreground opacity-50",
                isToday && "bg-accent text-accent-foreground",
                isSelected && "bg-primary text-primary-foreground",
                isDisabled && "text-muted-foreground opacity-50 cursor-not-allowed",
                !isSelected && !isToday && !isDisabled && "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
