import React from 'react';
import { cn } from '@/utils/cn';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    fullScreen?: boolean;
    message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    className,
    fullScreen = false,
    message,
}) => {
    const sizes = {
        sm: 'text-[20px]',
        md: 'text-[32px]',
        lg: 'text-[48px]',
        xl: 'text-[64px]',
    };

    const spinner = (
        <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
            <span
                className={cn(
                    'material-symbols-outlined animate-spin text-primary',
                    sizes[size]
                )}
            >
                progress_activity
            </span>
            {message && (
                <p className="text-sm text-slate-500 dark:text-gray-400 font-medium">
                    {message}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-[#101622]/80 backdrop-blur-sm z-50">
                {spinner}
            </div>
        );
    }

    return spinner;
};
