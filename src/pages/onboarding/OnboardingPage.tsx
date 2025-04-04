
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import RoleSelection from "./RoleSelection";
import StudentOnboarding from "./StudentOnboarding";
import TeacherOnboarding from "./TeacherOnboarding";

type UserRole = "student" | "teacher" | null;
type OnboardingStep = "role" | "info" | "expertise" | "availability" | "interests" | "complete";

const OnboardingPage = () => {
  const [role, setRole] = useState<UserRole>(null);
  const [step, setStep] = useState<OnboardingStep>("role");
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep("info");
  };

  const handleNext = () => {
    if (role === "student") {
      if (step === "info") {
        setStep("interests");
      } else if (step === "interests") {
        setStep("complete");
      }
    } else if (role === "teacher") {
      if (step === "info") {
        setStep("expertise");
      } else if (step === "expertise") {
        setStep("availability");
      } else if (step === "availability") {
        setStep("complete");
      }
    }
  };

  const handleComplete = () => {
    if (role === "student") {
      navigate("/student/overview");
    } else if (role === "teacher") {
      navigate("/teacher/overview");
    }
  };

  const handleBack = () => {
    if (step === "info") {
      setStep("role");
    } else if (role === "student" && step === "interests") {
      setStep("info");
    } else if (role === "teacher") {
      if (step === "expertise") {
        setStep("info");
      } else if (step === "availability") {
        setStep("expertise");
      }
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <motion.h1 
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to VidyaPaalam
          </motion.h1>
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Let's set up your profile to get started
          </motion.p>
        </header>

        <div className="bg-card rounded-lg shadow-md p-6">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">
                {step === "role" ? "Choose Role" : 
                 step === "info" ? "Basic Information" : 
                 step === "expertise" ? "Expertise" :
                 step === "availability" ? "Availability" :
                 step === "interests" ? "Interests" :
                 "Complete"}
              </span>
              <span className="text-sm text-muted-foreground">
                {role === "student" 
                  ? `Step ${step === "role" ? "1" : step === "info" ? "2" : step === "interests" ? "3" : "4"} of 4`
                  : role === "teacher"
                  ? `Step ${step === "role" ? "1" : step === "info" ? "2" : step === "expertise" ? "3" : step === "availability" ? "4" : "5"} of 5`
                  : "Step 1 of 4"}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div 
                className="bg-primary h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ 
                  width: step === "role" ? "20%" : 
                          step === "info" ? "40%" : 
                          step === "expertise" || step === "interests" ? "60%" : 
                          step === "availability" ? "80%" : "100%" 
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === "role" && (
                <RoleSelection onSelectRole={handleRoleSelect} />
              )}

              {role === "student" && (
                <StudentOnboarding 
                  step={step} 
                  onNext={handleNext}
                  onBack={handleBack}
                  onComplete={handleComplete}
                />
              )}

              {role === "teacher" && (
                <TeacherOnboarding 
                  step={step} 
                  onNext={handleNext}
                  onBack={handleBack}
                  onComplete={handleComplete}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
