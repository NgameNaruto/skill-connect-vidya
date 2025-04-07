
import * as React from 'react';
import { cn } from '@/lib/utils';

type CalendarDate = Date | undefined;

interface CalendarProps {
  mode?: 'single' | 'range' | 'multiple';
  selected?: CalendarDate | CalendarDate[];
  onSelect?: (date: CalendarDate | CalendarDate[]) => void;
  disabled?: { from: Date; to: Date } | ((date: Date) => boolean);
  className?: string;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, mode = 'single', selected, onSelect, disabled, ...props }, ref) => {
    const today = new Date();
    const [viewMonth, setViewMonth] = React.useState(today.getMonth());
    const [viewYear, setViewYear] = React.useState(today.getFullYear());

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();

    const prevMonth = () => {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear(viewYear - 1);
      } else {
        setViewMonth(viewMonth - 1);
      }
    };

    const nextMonth = () => {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear(viewYear + 1);
      } else {
        setViewMonth(viewMonth + 1);
      }
    };

    const handleDateClick = (day: number) => {
      const date = new Date(viewYear, viewMonth, day);
      if (onSelect) {
        onSelect(date);
      }
    };

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const renderCalendarDays = () => {
      const days = [];
      
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="h-9 w-9"></div>);
      }
      
      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(viewYear, viewMonth, day);
        const isSelected = mode === 'single' && selected instanceof Date && 
          selected.getDate() === day && 
          selected.getMonth() === viewMonth && 
          selected.getFullYear() === viewYear;
        
        const isToday = today.getDate() === day && 
          today.getMonth() === viewMonth && 
          today.getFullYear() === viewYear;
        
        days.push(
          <button
            key={day}
            type="button"
            className={cn(
              'h-9 w-9 rounded-md p-0 font-normal aria-selected:opacity-100',
              isToday && 'bg-accent text-accent-foreground',
              isSelected && 'bg-primary text-primary-foreground',
              !isToday && !isSelected && 'hover:bg-accent hover:text-accent-foreground'
            )}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </button>
        );
      }
      
      return days;
    };

    return (
      <div
        ref={ref}
        className={cn('p-3 w-64', className)}
        {...props}
      >
        <div className="flex justify-between items-center mb-2">
          <button
            type="button"
            className="p-2 rounded-md hover:bg-accent"
            onClick={prevMonth}
          >
            &lt;
          </button>
          <div>{monthNames[viewMonth]} {viewYear}</div>
          <button
            type="button"
            className="p-2 rounded-md hover:bg-accent"
            onClick={nextMonth}
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {dayNames.map((day) => (
            <div key={day} className="h-9 w-9 text-sm font-medium">
              {day}
            </div>
          ))}
          {renderCalendarDays()}
        </div>
      </div>
    );
  }
);
Calendar.displayName = 'Calendar';

export { Calendar };
