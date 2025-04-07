
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar as CalendarIcon, Clock, ArrowRight, CreditCard } from "lucide-react";
import { Calendar } from "@/components/shared/Calendar";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

// Mock teacher data
const mockTeacher = {
  id: "1",
  name: "Maria Johnson",
  avatar: "/placeholder.svg",
  initials: "MJ",
  skill: "Yoga",
  hourlyRate: 30,
};

// Mock time slots
const mockTimeSlots: TimeSlot[] = [
  { id: "1", time: "9:00 AM - 10:00 AM", available: true },
  { id: "2", time: "10:30 AM - 11:30 AM", available: true },
  { id: "3", time: "1:00 PM - 2:00 PM", available: true },
  { id: "4", time: "3:30 PM - 4:30 PM", available: true },
  { id: "5", time: "5:00 PM - 6:00 PM", available: false },
  { id: "6", time: "6:30 PM - 7:30 PM", available: true },
];

const BookSession = () => {
  const { teacherId } = useParams<{ teacherId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<"date" | "payment">("date");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>(undefined);
  
  const teacher = mockTeacher; // In a real app, fetch the teacher based on the ID
  
  const handleNext = () => {
    if (!selectedDate || !selectedSlot) {
      toast({
        title: "Please select a date and time",
        variant: "destructive",
      });
      return;
    }
    setStep("payment");
  };
  
  const handlePayment = () => {
    toast({
      title: "Session booked successfully!",
    });
    navigate("/student/overview");
  };

  const handleSelectDate = (date: Date | Date[] | undefined) => {
    if (date instanceof Date) {
      setSelectedDate(date);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-3xl mx-auto"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Book a Session</h2>
        <div className="text-sm font-medium text-gray-500">
          with {teacher.name}
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <Tabs value={step} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="date">Select Date & Time</TabsTrigger>
            <TabsTrigger value="payment" disabled={step === "date"}>Review & Pay</TabsTrigger>
          </TabsList>
          
          <TabsContent value="date" className="p-0">
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-2">Select a date</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleSelectDate}
                    className="border rounded-md"
                    disabled={(date) => date < new Date()}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Available time slots
                    {selectedDate && (
                      <span className="block text-sm text-gray-500">
                        for {format(selectedDate, "PPP")}
                      </span>
                    )}
                  </h3>
                  
                  {!selectedDate ? (
                    <p className="text-gray-500">Please select a date first</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {mockTimeSlots.map(slot => (
                        <div
                          key={slot.id}
                          className={`border rounded-md p-3 cursor-pointer transition-colors ${
                            !slot.available
                              ? "bg-gray-100 cursor-not-allowed opacity-60"
                              : selectedSlot === slot.id
                              ? "border-blue-500 bg-blue-50"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            if (slot.available) setSelectedSlot(slot.id);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{slot.time}</span>
                            </div>
                            {!slot.available && <Badge variant="outline">Booked</Badge>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t p-6">
              <Button onClick={handleNext}>
                Continue to Payment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </TabsContent>
          
          <TabsContent value="payment" className="p-0">
            <CardHeader>
              <CardTitle>Review & Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={teacher.avatar} />
                  <AvatarFallback>{teacher.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{teacher.name}</p>
                  <p className="text-sm text-gray-500">{teacher.skill} Teacher</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-medium">Session Details</h3>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{selectedDate ? format(selectedDate, "PPP") : "Not selected"}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>
                    {selectedSlot 
                      ? mockTimeSlots.find(slot => slot.id === selectedSlot)?.time 
                      : "Not selected"}
                  </span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Payment Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Session Fee</span>
                    <span>${teacher.hourlyRate}.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>$2.00</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t mt-2">
                    <span>Total</span>
                    <span>${teacher.hourlyRate + 2}.00</span>
                  </div>
                </div>
              </div>
              
              {/* Payment form would go here in a real app */}
              <div className="border p-4 rounded-md bg-gray-50">
                <p className="text-center text-gray-500">
                  Payment form would be here in a real application
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t p-6">
              <Button onClick={handlePayment}>
                <CreditCard className="mr-2 h-4 w-4" />
                Complete Payment
              </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
};

export default BookSession;
