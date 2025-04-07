import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Calendar component implemented directly in the page
type CalendarProps = {
  mode?: 'single' | 'multiple' | 'range';
  selected?: Date | Date[] | { from: Date; to: Date };
  onSelect?: (date: Date | Date[] | undefined) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
  month?: Date;
  onMonthChange?: (date: Date) => void;
  showOutsideDays?: boolean;
  modifiers?: {
    [key: string]: (date: Date) => boolean;
  };
  modifiersStyles?: {
    [key: string]: React.CSSProperties;
  };
};

function Calendar({
  className,
  showOutsideDays = true,
  mode = "single",
  selected,
  onSelect,
  disabled,
  month,
  onMonthChange,
  modifiers,
  modifiersStyles,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(month || new Date());
  
  React.useEffect(() => {
    if (month) {
      setCurrentMonth(month);
    }
  }, [month]);

  const handleSelect = (date: Date) => {
    if (onSelect) {
      if (mode === 'single') {
        onSelect(date);
      } else if (mode === 'multiple' && Array.isArray(selected)) {
        // Toggle the date in multiple selection mode
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
  };

  const handleMonthChange = (increment: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
    if (onMonthChange) {
      onMonthChange(newMonth);
    }
  };
  
  // Get days in the current month
  const daysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    // Add days from previous month to fill the first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek; i > 0; i--) {
      const prevDate = new Date(year, month, 1 - i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
      });
    }
    
    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }
    
    // Add days from next month to fill the last week
    const lastDayOfWeek = lastDay.getDay();
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    
    return days;
  };
  
  const isSelected = (date: Date): boolean => {
    if (!selected) return false;
    
    if (Array.isArray(selected)) {
      return selected.some(d => d.toDateString() === date.toDateString());
    }
    
    if (selected instanceof Date) {
      return selected.toDateString() === date.toDateString();
    }
    
    return false;
  };
  
  const isDisabled = (date: Date): boolean => {
    return disabled ? disabled(date) : false;
  };
  
  const isToday = (date: Date): boolean => {
    return new Date().toDateString() === date.toDateString();
  };

  const checkModifier = (date: Date, modifier: string): boolean => {
    return modifiers && modifiers[modifier] ? modifiers[modifier](date) : false;
  };

  const getModifierStyles = (date: Date): React.CSSProperties => {
    if (!modifiers || !modifiersStyles) return {};
    
    let styles = {};
    Object.keys(modifiers || {}).forEach(modifier => {
      if (checkModifier(date, modifier) && modifiersStyles && modifiersStyles[modifier]) {
        styles = { ...styles, ...modifiersStyles[modifier] };
      }
    });
    
    return styles;
  };
  
  return (
    <div className={cn("p-3 pointer-events-auto", className)}>
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={() => handleMonthChange(-1)}
          className="p-1 rounded-md hover:bg-gray-200"
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <div className="font-medium">
          {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
        </div>
        
        <button 
          onClick={() => handleMonthChange(1)}
          className="p-1 rounded-md hover:bg-gray-200"
          type="button"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth().map((dayInfo, index) => {
          const { date, isCurrentMonth } = dayInfo;
          const isDateSelected = isSelected(date);
          const isDateToday = isToday(date);
          const isDateDisabled = isDisabled(date);
          const modifierStyles = getModifierStyles(date);
          
          return (
            <button
              key={index}
              type="button"
              disabled={isDateDisabled}
              onClick={() => !isDateDisabled && handleSelect(date)}
              className={cn(
                "h-8 w-8 rounded-md text-center text-sm p-0 font-normal",
                !isCurrentMonth && !showOutsideDays && "invisible",
                !isCurrentMonth && showOutsideDays && "text-gray-400 opacity-50",
                isDateToday && "bg-gray-200 text-gray-900",
                isDateSelected && "bg-blue-600 text-white",
                isDateDisabled && "text-gray-400 opacity-50 cursor-not-allowed",
                !isDateSelected && !isDateToday && !isDateDisabled && "hover:bg-gray-100"
              )}
              style={modifierStyles}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// TeacherAvailability component code
const TeacherAvailability = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState<{ date: string; startTime: string; endTime: string; }[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return [`${hour}:00`, `${hour}:30`];
  }).flat();

  const handleAddTimeSlot = () => {
    if (newStartTime && newEndTime) {
      const newSlot = {
        date: selectedDate.toISOString().split('T')[0],
        startTime: newStartTime,
        endTime: newEndTime,
      };
      setBookedSlots([...bookedSlots, newSlot]);
      setNewStartTime("");
      setNewEndTime("");
      toast({
        title: "Time slot added",
      });
    }
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prevDays =>
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  const handleAddRecurringTimeSlots = () => {
    if (selectedDays.length > 0 && newStartTime && newEndTime) {
      const newSlots = selectedDays.map(day => {
        const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day);
        const nextDate = new Date(selectedDate);
        
        // Find the next occurrence of the selected day
        nextDate.setDate(selectedDate.getDate() + (dayIndex - selectedDate.getDay() + 7) % 7);
        
        return {
          date: nextDate.toISOString().split('T')[0],
          startTime: newStartTime,
          endTime: newEndTime,
        };
      });
      
      setBookedSlots([...bookedSlots, ...newSlots]);
      setNewStartTime("");
      setNewEndTime("");
      setSelectedDays([]);
      toast({
        title: "Recurring time slots added",
      });
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold mb-2">Manage Your Availability</h2>
        <p className="text-muted-foreground">Set your teaching schedule and manage booking slots.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle>Your Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date as Date)}
              className="rounded-md border"
              modifiers={{
                booked: (date) => 
                  bookedSlots.some(slot => 
                    new Date(slot.date).toDateString() === date.toDateString()
                  )
              }}
              modifiersStyles={{
                booked: {
                  backgroundColor: '#f0f9ff',
                  fontWeight: 'bold'
                }
              }}
              disabled={(date) => {
                // Disable dates in the past
                return date < new Date(new Date().setHours(0, 0, 0, 0));
              }}
            />
            
            <div className="mt-4 space-y-4">
              {bookedSlots.length === 0 ? (
                <p className="text-muted-foreground">No slots added for this date.</p>
              ) : (
                bookedSlots.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between border rounded-md p-2">
                    <div>
                      {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      <span> - </span>
                      {slot.startTime} - {slot.endTime}
                    </div>
                    <Button variant="destructive" size="sm">Remove</Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Add Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Selected Date</p>
                <p className="text-lg">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Start Time</label>
                  <Select value={newStartTime} onValueChange={setNewStartTime}>
                    <SelectTrigger>
                      <SelectValue>
                        {newStartTime || "Select start time"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">End Time</label>
                  <Select value={newEndTime} onValueChange={setNewEndTime}>
                    <SelectTrigger>
                      <SelectValue>
                        {newEndTime || "Select end time"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleAddTimeSlot}
                  disabled={!newStartTime || !newEndTime}
                >
                  Add Time Slot
                </Button>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-2">Recurring Availability</h3>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <Button
                        key={day}
                        variant={selectedDays.includes(day) ? 'default' : 'outline'}
                        className="flex-1 min-w-[80px]"
                        onClick={() => toggleDay(day)}
                      >
                        {day.substring(0, 3)}
                      </Button>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full mt-2" 
                    onClick={handleAddRecurringTimeSlots}
                    disabled={selectedDays.length === 0 || !newStartTime || !newEndTime}
                  >
                    Add to Selected Days
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-xl font-bold mb-4">Your Availability Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Session Duration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Default Session Length</p>
                  <p className="text-sm text-muted-foreground">Set your typical session duration</p>
                </div>
                <Select defaultValue="60">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="45">45 min</SelectItem>
                    <SelectItem value="60">60 min</SelectItem>
                    <SelectItem value="90">90 min</SelectItem>
                    <SelectItem value="120">120 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Buffer Time</p>
                  <p className="text-sm text-muted-foreground">Time between sessions</p>
                </div>
                <Select defaultValue="15">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">None</SelectItem>
                    <SelectItem value="5">5 min</SelectItem>
                    <SelectItem value="10">10 min</SelectItem>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Booking Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Minimum Notice</p>
                  <p className="text-sm text-muted-foreground">Latest time before a session can be booked</p>
                </div>
                <Select defaultValue="24">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="3">3 hours</SelectItem>
                    <SelectItem value="6">6 hours</SelectItem>
                    <SelectItem value="12">12 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="48">48 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Booking Window</p>
                  <p className="text-sm text-muted-foreground">How far in advance students can book</p>
                </div>
                <Select defaultValue="4">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 week</SelectItem>
                    <SelectItem value="2">2 weeks</SelectItem>
                    <SelectItem value="4">1 month</SelectItem>
                    <SelectItem value="12">3 months</SelectItem>
                    <SelectItem value="24">6 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 text-right">
          <Button
            onClick={() => {
              toast({
                title: "Settings saved successfully",
              });
            }}
          >
            Save All Settings
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TeacherAvailability;
