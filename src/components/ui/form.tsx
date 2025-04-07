
import * as React from 'react';
import { 
  useFormContext, 
  Controller, 
  FieldValues, 
  ControllerProps, 
  FieldPath,
  useForm as useReactHookForm,
  UseFormReturn
} from 'react-hook-form';
import { cn } from '@/lib/utils';

// Form components to replace shadcn's form components
const Form = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
>({ 
  children, 
  className, 
  ...props 
}: React.FormHTMLAttributes<HTMLFormElement> & {
  form?: UseFormReturn<TFieldValues, TContext>;
}) => (
  <form className={cn('space-y-6', className)} {...props}>
    {children}
  </form>
);
Form.displayName = 'Form';

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-2', className)} {...props} />
));
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm font-medium text-gray-700',
      className
    )}
    {...props}
  />
));
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mt-2', className)}
    {...props}
  />
));
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-500', className)}
    {...props}
  />
));
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm font-medium text-red-500', className)}
    {...props}
  >
    {children}
  </p>
));
FormMessage.displayName = 'FormMessage';

// Add FormField for compatibility
interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const formContext = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField must be used within <FormField>");
  }

  const { name } = fieldContext;
  const {
    formState: { errors },
    getFieldState,
  } = formContext;

  return {
    name,
    formItemId: `form-item-${name}`,
    formDescriptionId: `form-item-description-${name}`,
    formMessageId: `form-item-message-${name}`,
    ...getFieldState(name, formContext),
    error: errors[name],
  };
};

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  useFormField,
  useReactHookForm,
};
