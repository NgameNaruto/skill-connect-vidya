
import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const timeSlots = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "01:00 PM - 02:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM",
  "06:00 PM - 07:00 PM",
];

const skills = [
  { id: "painting", label: "Painting" },
  { id: "music", label: "Music" },
  { id: "cooking", label: "Cooking" },
  { id: "programming", label: "Programming" },
  { id: "yoga", label: "Yoga" },
  { id: "dancing", label: "Dancing" },
  { id: "photography", label: "Photography" },
  { id: "writing", label: "Creative Writing" },
  { id: "languages", label: "Languages" },
  { id: "crafts", label: "Arts & Crafts" },
  { id: "gardening", label: "Gardening" },
  { id: "fitness", label: "Fitness & Exercise" },
];

interface TeacherOnboardingProps {
  step: string;
  onNext: () => void;
  onBack: () => void;
  onComplete: () => void;
}

const basicInfoSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  bio: z.string().min(20, { message: "Bio should be at least 20 characters" }),
  hourlyRate: z.string().min(1, { message: "Please enter your hourly rate" }),
});

const expertiseSchema = z.object({
  experience: z.string().min(2, { message: "Please enter your experience" }),
  qualifications: z.string().min(2, { message: "Please enter your qualifications" }),
});

const TeacherOnboarding = ({ step, onNext, onBack, onComplete }: TeacherOnboardingProps) => {
  const [teachingSkills, setTeachingSkills] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  
  const basicForm = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      bio: "",
      hourlyRate: "",
    },
  });

  const expertiseForm = useForm<z.infer<typeof expertiseSchema>>({
    resolver: zodResolver(expertiseSchema),
    defaultValues: {
      experience: "",
      qualifications: "",
    },
  });

  const handleSkillToggle = (skillId: string) => {
    setTeachingSkills(prev => {
      if (prev.includes(skillId)) {
        return prev.filter(id => id !== skillId);
      } else {
        return [...prev, skillId];
      }
    });
  };

  const handleSlotToggle = (slot: string) => {
    setSelectedSlots(prev => {
      if (prev.includes(slot)) {
        return prev.filter(s => s !== slot);
      } else {
        return [...prev, slot];
      }
    });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };

  if (step === "info") {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Basic Information</h2>
        
        <Form form={basicForm}>
          <form onSubmit={basicForm.handleSubmit(onNext)} className="space-y-4">
            <FormField
              control={basicForm.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={basicForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={basicForm.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About You</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share information about your background and teaching style" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={basicForm.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  if (step === "expertise") {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Your Expertise</h2>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-base font-medium">Skills You Can Teach</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={skill.id}
                    checked={teachingSkills.includes(skill.id)}
                    onCheckedChange={() => handleSkillToggle(skill.id)}
                  />
                  <label 
                    htmlFor={skill.id} 
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {skill.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Form form={expertiseForm}>
            <form onSubmit={expertiseForm.handleSubmit(onNext)} className="space-y-4">
              <FormField
                control={expertiseForm.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={expertiseForm.control}
                name="qualifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qualifications</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List your relevant qualifications, certifications, or achievements" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onBack}>
                  Back
                </Button>
                <Button type="submit" disabled={teachingSkills.length === 0}>Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );
  }

  if (step === "availability") {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Set Your Availability</h2>
        <p className="text-gray-500">Select dates and time slots when you're available to teach.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Select Dates</h3>
            <Card>
              <CardContent className="p-2">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Available Time Slots</h3>
            <div className="grid grid-cols-1 gap-2">
              {timeSlots.map((slot) => (
                <div
                  key={slot}
                  className={`p-2 border rounded-md cursor-pointer transition-colors ${
                    selectedSlots.includes(slot) 
                      ? "bg-blue-50 border-blue-500" 
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleSlotToggle(slot)}
                >
                  <div className="flex items-center justify-between">
                    <span>{slot}</span>
                    {selectedSlots.includes(slot) && (
                      <CheckIcon className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {selectedSlots.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Selected Slots</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSlots.map((slot) => (
                <Badge key={slot} variant="outline">
                  {slot}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext}>Continue</Button>
        </div>
      </div>
    );
  }

  if (step === "complete") {
    return (
      <div className="space-y-8 text-center">
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center"
          >
            <CheckIcon className="h-12 w-12 text-green-600" />
          </motion.div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold">You're All Set!</h2>
          <p className="text-gray-500 mt-2">
            Your teacher profile has been created. Start sharing your knowledge with eager students!
          </p>
        </div>
        
        <Button onClick={onComplete} size="lg">
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return null;
};

export default TeacherOnboarding;
