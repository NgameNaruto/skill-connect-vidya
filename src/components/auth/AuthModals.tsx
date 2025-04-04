
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export type AuthModalType = "signin" | "signup" | null;

interface AuthModalsProps {
  isOpen: boolean;
  modalType: AuthModalType;
  onClose: () => void;
  onSwitchModal: (type: AuthModalType) => void;
}

const AuthModals = ({ isOpen, modalType, onClose, onSwitchModal }: AuthModalsProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {modalType === "signin" ? "Sign In" : "Create Account"}
          </DialogTitle>
          <button 
            onClick={onClose} 
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <AnimatePresence mode="wait">
          <motion.div
            key={modalType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {modalType === "signin" ? (
              <SignInForm onSwitchToSignUp={() => onSwitchModal("signup")} />
            ) : (
              <SignUpForm onSwitchToSignIn={() => onSwitchModal("signin")} />
            )}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModals;
