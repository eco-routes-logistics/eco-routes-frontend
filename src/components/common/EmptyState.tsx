import React from 'react';
import { cn } from '@/utils/cn';

interface EmptyStateProps {
    icon?: string;
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon = 'inbox',
    title,
    description,
    action,
    className,
}) => {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center py-12 px-4 text-center',
                className
            )}
        >
            <div className="size-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-600">
                    {icon}
                </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>

            {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-6">
                    {description}
                </p>
            )}

            {action && <div>{action}</div>}
        </div>
    );
};
