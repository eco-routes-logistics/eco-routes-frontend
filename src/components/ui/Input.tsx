import React from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            hint,
            leftIcon,
            rightIcon,
            fullWidth = true,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
                {label && (
                    <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wide">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}

                <div className="relative">
                    {leftIcon && (
                        <div className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        className={cn(
                            'w-full h-10 rounded-lg border bg-gray-50 dark:bg-gray-800 text-sm transition-all',
                            'placeholder:text-slate-400 dark:placeholder:text-gray-500',
                            'focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none',
                            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-gray-900',
                            error
                                ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                                : 'border-gray-200 dark:border-gray-700',
                            leftIcon ? 'pl-10' : 'pl-4',
                            rightIcon ? 'pr-10' : 'pr-4',
                            className
                        )}
                        {...props}
                    />

                    {rightIcon && (
                        <div className="absolute inset-y-0 right-3 flex items-center text-slate-400">
                            {rightIcon}
                        </div>
                    )}
                </div>

                {hint && !error && (
                    <p className="text-xs text-slate-500 dark:text-gray-400">{hint}</p>
                )}

                {error && (
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
