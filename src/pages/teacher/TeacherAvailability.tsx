import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, addDays } from "date-fns";
import { Clock, Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

interface AvailabilityDay {
  date: Date;
  timeSlots: TimeSlot[];
}

const timeOptions = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
  "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
];

const initialAvailability: AvailabilityDay[] = [
  {
    date: new Date(),
    timeSlots: [
      { id: '1', startTime: '10:00 AM', endTime: '11:00 AM' },
      { id: '2', startTime: '02:00 PM', endTime: '03:00 PM' },
    ],
  },
  {
    date: addDays(new Date(), 2),
    timeSlots: [
      { id: '3', startTime: '09:00 AM', endTime: '10:00 AM' },
      { id: '4', startTime: '04:00 PM', endTime: '05:00 PM' },
    ],
  },
  {
    date: addDays(new Date(), 5),
    timeSlots: [
      { id: '5', startTime: '11:00 AM', endTime: '12:00 PM' },
    ],
  },
];

const TeacherAvailability = () => {
  const [availability, setAvailability] = useState<AvailabilityDay[]>(initialAvailability);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newStartTime, setNewStartTime] = useState<string>("");
  const [newEndTime, setNewEndTime] = useState<string>("");

  const getAvailabilityForDate = (date: Date) => {
    return availability.find(
      (a) => format(a.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const hasAvailability = (date: Date) => {
    return availability.some(
      (a) => format(a.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const handleAddTimeSlot = () => {
    if (!selectedDate || !newStartTime || !newEndTime) {
      toast({
        title: "Please select start and end times",
        variant: "destructive",
      });
      return;
    }

    const startHour = parseInt(newStartTime.split(':')[0]);
    const endHour = parseInt(newEndTime.split(':')[0]);
    const startMinute = parseInt(newStartTime.split(':')[1]);
    const endMinute = parseInt(newEndTime.split(':')[1]);
    
    if (endHour < startHour || (endHour === startHour && endMinute <= startMinute)) {
      toast({
        title: "End time must be after start time",
        variant: "destructive",
      });
      return;
    }

    const newSlot: TimeSlot = {
      id: `slot-${Date.now()}`,
      startTime: newStartTime,
      endTime: newEndTime,
    };

    setAvailability((prev) => {
      const existingDayIndex = prev.findIndex(
        (a) => format(a.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
      );

      if (existingDayIndex !== -1) {
        const updatedAvailability = [...prev];
        updatedAvailability[existingDayIndex] = {
          ...updatedAvailability[existingDayIndex],
          timeSlots: [...updatedAvailability[existingDayIndex].timeSlots, newSlot],
        };
        return updatedAvailability;
      } else {
        return [...prev, {
          date: selectedDate,
          timeSlots: [newSlot],
        }];
      }
    });

    setNewStartTime("");
    setNewEndTime("");

    toast({
      title: "Availability added",
    });
  };

  const handleRemoveTimeSlot = (date: Date, slotId: string) => {
    setAvailability((prev) => {
      const updatedAvailability = prev.map((day) => {
        if (format(day.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) {
          return {
            ...day,
            timeSlots: day.timeSlots.filter((slot) => slot.id !== slotId),
          };
        }
        return day;
      });

      return updatedAvailability.filter((day) => day.timeSlots.length > 0);
    });

    toast({
      title: "Time slot removed",
    });
  };

  const createWeeklySlots = () => {
    const today = new Date();
    const weeklySlots: AvailabilityDay[] = [];
    
    for (let i = 0; i < 7; i++) {
      const date = addDays(today, i);
      weeklySlots.push({
        date,
        timeSlots: [
          { id: `weekly-${i}-1`, startTime: '10:00 AM', endTime: '11:00 AM' },
          { id: `weekly-${i}-2`, startTime: '02:00 PM', endTime: '03:00 PM' },
        ],
      });
    }
    
    setAvailability(weeklySlots);
    
    toast({
      title: "Weekly schedule created",
      description: "Added 2 slots for each day this week",
    });
  };

  const handleDateSelect = (date: Date | Date[] | undefined) => {
    if (date instanceof Date) {
      setSelectedDate(date);
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
        <h2 className="text-3xl font-bold mb-2">Manage Availability</h2>
        <p className="text-muted-foreground">Set your teaching hours and manage your schedule.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>
              Select dates to add or view availability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="border rounded-md"
              modifiers={{
                booked: (date) => hasAvailability(date),
              }}
              modifiersStyles={{
                booked: { backgroundColor: 'rgba(245, 158, 11, 0.1)', fontWeight: 'bold' }
              }}
              disabled={(date) => date < new Date() && format(date, 'yyyy-MM-dd') !== format(new Date(), 'yyyy-MM-dd')}
            />
            
            <div className="flex justify-center mt-6">
              <Button onClick={createWeeklySlots}>
                Set Weekly Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a Date'}
            </CardTitle>
            <CardDescription>
              Manage time slots for the selected date
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="slots">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="slots">Available Slots</TabsTrigger>
                <TabsTrigger value="add">Add New Slot</TabsTrigger>
              </TabsList>
              
              <TabsContent value="slots">
                {selectedDate ? (
                  <div className="space-y-4 mt-4">
                    <h3 className="text-sm font-medium">
                      {hasAvailability(selectedDate) ? 'Available Time Slots' : 'No availability set for this date'}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {getAvailabilityForDate(selectedDate)?.timeSlots.map((slot) => (
                        <div
                          key={slot.id}
                          className="flex items-center justify-between p-3 border rounded-md"
                        >
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {slot.startTime} - {slot.endTime}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveTimeSlot(selectedDate, slot.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    {!hasAvailability(selectedDate) && (
                      <div className="flex justify-center py-8">
                        <Button variant="outline" onClick={() => document.getElementById('add-tab-trigger')?.click()}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Time Slots
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Please select a date on the calendar
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="add">
                <div className="space-y-4 mt-4">
                  <h3 className="text-sm font-medium">Add New Time Slot</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Start Time</label>
                      <Select value={newStartTime} onValueChange={setNewStartTime}>
                        <SelectTrigger>
                          <SelectValue>{newStartTime || "Select start time"}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={`start-${time}`} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">End Time</label>
                      <Select value={newEndTime} onValueChange={setNewEndTime}>
                        <SelectTrigger>
                          <SelectValue>{newEndTime || "Select end time"}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={`end-${time}`} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button onClick={handleAddTimeSlot} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Time Slot
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Upcoming Available Dates</h3>
              <div className="flex flex-wrap gap-2">
                {availability
                  .filter((day) => day.date >= new Date())
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 5)
                  .map((day, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => setSelectedDate(day.date)}
                    >
                      {format(day.date, 'MMM d')} ({day.timeSlots.length} slots)
                    </Badge>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default TeacherAvailability;
