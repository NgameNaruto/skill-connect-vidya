
import { useState, useEffect, createContext, useContext } from 'react';
import { ToastProps } from '@/components/ui/toast';

type ToastActionElement = React.ReactElement;

interface Toast extends ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
}

interface ToastContextProps {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  updateToast: (id: string, toast: Partial<Toast>) => void;
}

const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
  updateToast: () => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, ...toast }]);

    if (toast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 3000);
    }

    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const updateToast = (id: string, toast: Partial<Toast>) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...toast } : t))
    );
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        updateToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return {
    toast: (props: Omit<Toast, 'id'>) => {
      const id = context.addToast(props);
      
      return {
        id,
        dismiss: () => context.removeToast(id),
        update: (props: Partial<Toast>) => context.updateToast(id, props),
      };
    },
    dismiss: (toastId?: string) => {
      if (toastId) {
        context.removeToast(toastId);
      } else {
        context.toasts.forEach((toast) => {
          context.removeToast(toast.id);
        });
      }
    },
    toasts: context.toasts,
  };
};

export const toast = (props: Omit<Toast, 'id'>) => {
  console.log('Toast:', props.title);
  // This is a fallback for when the toast is used outside a component
  return {
    id: 'fallback',
    dismiss: () => {},
    update: () => {},
  };
};
