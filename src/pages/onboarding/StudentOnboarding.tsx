
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
import { CheckIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

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

interface StudentOnboardingProps {
  step: string;
  onNext: () => void;
  onBack: () => void;
  onComplete: () => void;
}

const basicInfoSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  bio: z.string().optional(),
});

const StudentOnboarding = ({ step, onNext, onBack, onComplete }: StudentOnboardingProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      bio: "",
    },
  });

  const handleSkillToggle = (skillId: string) => {
    setSelectedSkills(prev => {
      if (prev.includes(skillId)) {
        return prev.filter(id => id !== skillId);
      } else {
        return [...prev, skillId];
      }
    });
  };

  if (step === "info") {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Basic Information</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onNext)} className="space-y-4">
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About You (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us a bit about yourself and what you hope to learn" 
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
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  if (step === "interests") {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Skills I Want to Learn</h2>
        <p className="text-muted-foreground">Select the skills you're interested in learning.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center space-x-2">
              <Checkbox 
                id={skill.id}
                checked={selectedSkills.includes(skill.id)}
                onCheckedChange={() => handleSkillToggle(skill.id)}
              />
              <label 
                htmlFor={skill.id} 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {skill.label}
              </label>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} disabled={selectedSkills.length === 0}>
            Continue
          </Button>
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
            className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <CheckIcon className="h-12 w-12 text-primary" />
          </motion.div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold">You're All Set!</h2>
          <p className="text-muted-foreground mt-2">
            Your student profile has been created. Let's start exploring skills and finding teachers.
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

export default StudentOnboarding;
