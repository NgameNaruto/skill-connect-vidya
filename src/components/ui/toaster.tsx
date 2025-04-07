
import React from 'react';
import { Toast, ToastProps, ToastViewport } from './toast';
import { useToast } from '@/hooks/use-toast';

const Toaster = () => {
  const { toasts } = useToast();

  return (
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
  );
};

export { Toaster };
