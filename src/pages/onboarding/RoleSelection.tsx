
import { motion } from "framer-motion";

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
          <button 
            className="w-full h-auto py-8 px-4 flex flex-col items-center justify-center gap-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => onSelectRole("student")}
          >
            <div className="p-4 bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <path d="M8 10h.01"></path>
                <path d="M12 10h.01"></path>
                <path d="M16 10h.01"></path>
                <path d="M2 19h20"></path>
                <path d="M18 19V7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v12"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium">I want to Learn</h3>
            <p className="text-sm text-gray-500 text-center">
              Find skilled mentors and learn various skills
            </p>
          </button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <button 
            className="w-full h-auto py-8 px-4 flex flex-col items-center justify-center gap-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => onSelectRole("teacher")}
          >
            <div className="p-4 bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <path d="M18 10L14 2H10L6 10Z"></path>
                <path d="M12 10V20"></path>
                <path d="M8 20H16"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium">I want to Teach</h3>
            <p className="text-sm text-gray-500 text-center">
              Share your skills and knowledge with eager learners
            </p>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection;
