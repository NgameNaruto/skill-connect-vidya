
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type UserRole = "student" | "teacher" | null;

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
}

const RoleSelection = ({ onSelectRole }: RoleSelectionProps) => {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center">Choose Your Role</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button 
            variant="outline" 
            className="w-full h-auto py-8 flex flex-col items-center justify-center gap-4 border-2"
            onClick={() => onSelectRole("student")}
          >
            <div className="p-4 bg-primary/10 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M8 10h.01"></path>
                <path d="M12 10h.01"></path>
                <path d="M16 10h.01"></path>
                <path d="M2 19h20"></path>
                <path d="M18 19V7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v12"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium">I want to Learn</h3>
            <p className="text-sm text-muted-foreground text-center">
              Find skilled mentors and learn various skills
            </p>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button 
            variant="outline" 
            className="w-full h-auto py-8 flex flex-col items-center justify-center gap-4 border-2"
            onClick={() => onSelectRole("teacher")}
          >
            <div className="p-4 bg-primary/10 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M18 10L14 2H10L6 10Z"></path>
                <path d="M12 10V20"></path>
                <path d="M8 20H16"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium">I want to Teach</h3>
            <p className="text-sm text-muted-foreground text-center">
              Share your skills and knowledge with eager learners
            </p>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection;
