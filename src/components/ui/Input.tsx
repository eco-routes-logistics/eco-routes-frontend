import React, { useId } from 'react';
import { cn } from '@/utils/cn';

export const fieldClass = (hasError?: boolean) =>
    cn(
        'w-full rounded-xl border bg-surface-raised text-[15px] text-ink transition-colors',
        'placeholder:text-ink-muted',
        'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
        'disabled:bg-surface-sunken disabled:text-ink-secondary disabled:cursor-not-allowed',
        hasError ? 'border-danger focus:ring-danger/30 focus:border-danger' : 'border-line'
    );

interface FieldProps {
    label?: string;
    error?: string;
    hint?: string;
    htmlFor?: string;
    labelAction?: React.ReactNode;
    children: React.ReactNode;
}

/** Label + control + hint/error wrapper shared by Input, Select and Textarea. */
export const Field: React.FC<FieldProps> = ({ label, error, hint, htmlFor, labelAction, children }) => (
    <div className="flex flex-col gap-1.5 w-full">
        {(label || labelAction) && (
            <div className="flex items-center justify-between">
                {label && <label htmlFor={htmlFor} className="text-[13px] font-semibold text-ink-secondary">{label}</label>}
                {labelAction}
            </div>
        )}
        {children}
        {error ? (
            <p className="text-[13px] text-danger font-medium">{error}</p>
        ) : hint ? (
            <p className="text-[13px] text-ink-muted">{hint}</p>
        ) : null}
    </div>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    labelAction?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, hint, leftIcon, rightIcon, labelAction, className, id, ...props }, ref) => {
        const autoId = useId();
        const inputId = id ?? autoId;
        return (
            <Field label={label} error={error} hint={hint} htmlFor={inputId} labelAction={labelAction}>
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute inset-y-0 left-3.5 flex items-center text-ink-muted pointer-events-none">{leftIcon}</div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        aria-invalid={!!error}
                        className={cn(fieldClass(!!error), 'h-12', leftIcon ? 'pl-11' : 'pl-4', rightIcon ? 'pr-12' : 'pr-4', className)}
                        {...props}
                    />
                    {rightIcon && <div className="absolute inset-y-0 right-2 flex items-center text-ink-muted">{rightIcon}</div>}
                </div>
            </Field>
        );
    }
);

Input.displayName = 'Input';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    hint?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, hint, className, id, children, ...props }, ref) => {
        const autoId = useId();
        const selectId = id ?? autoId;
        return (
            <Field label={label} error={error} hint={hint} htmlFor={selectId}>
                <select
                    ref={ref}
                    id={selectId}
                    aria-invalid={!!error}
                    className={cn('form-select', fieldClass(!!error), 'h-12 pl-4 pr-10', className)}
                    {...props}
                >
                    {children}
                </select>
            </Field>
        );
    }
);

Select.displayName = 'Select';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, hint, className, id, rows = 3, ...props }, ref) => {
        const autoId = useId();
        const textareaId = id ?? autoId;
        return (
            <Field label={label} error={error} hint={hint} htmlFor={textareaId}>
                <textarea
                    ref={ref}
                    id={textareaId}
                    rows={rows}
                    aria-invalid={!!error}
                    className={cn(fieldClass(!!error), 'px-4 py-3 resize-none', className)}
                    {...props}
                />
            </Field>
        );
    }
);

Textarea.displayName = 'Textarea';
