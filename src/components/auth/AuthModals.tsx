
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl relative">
          <div className="mb-5">
            <h2 className="text-xl font-bold">
              {modalType === "signin" ? "Sign In" : "Create Account"}
            </h2>
            <button 
              onClick={onClose} 
              className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default AuthModals;
