
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'success';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
  className?: string;
  children?: React.ReactNode;
}

export interface ToastActionElement {
  altText: string;
  onClick: () => void;
  children: React.ReactNode;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = "default", title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 shadow-lg transition-all",
          variant === "default" && "bg-white text-foreground border-gray-200",
          variant === "destructive" && "bg-red-500 text-white border-red-600",
          variant === "success" && "bg-green-500 text-white border-green-600",
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-1">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>
        {action && <div>{action}</div>}
      </div>
    );
  }
);

Toast.displayName = "Toast";

const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )}
      {...props}
    />
  )
);

ToastViewport.displayName = "ToastViewport";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const Toaster = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      <ToastViewport>
        {toasts.map(({ id, title, description, action, ...props }) => (
          <Toast
            key={id}
            title={title}
            description={description}
            action={action}
            {...props}
          />
        ))}
      </ToastViewport>
    </ToastProvider>
  );
};

// Temporary simplified useToast hook that integrates with our existing toast system
const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  return {
    toasts,
    toast: (props: ToastProps) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, ...props }]);
      
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, props.duration || 3000);
      
      return {
        id,
        dismiss: () => setToasts((prev) => prev.filter((toast) => toast.id !== id)),
        update: (newProps: ToastProps) => setToasts((prev) => 
          prev.map((toast) => (toast.id === id ? { ...toast, ...newProps } : toast))
        ),
      };
    },
    dismiss: (toastId?: string) => {
      if (toastId) {
        setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
      } else {
        setToasts([]);
      }
    },
  };
};

export { useToast, Toaster, Toast, ToastProvider, ToastViewport };
