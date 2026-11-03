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
        <div className={cn('flex flex-col items-center justify-center py-12 px-6 text-center', className)}>
            <div className="size-14 rounded-2xl bg-primary-subtle flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[28px] text-primary" aria-hidden="true">
                    {icon}
                </span>
            </div>

            <h3 className="text-base font-bold text-ink mb-1">{title}</h3>

            {description && <p className="text-sm text-ink-secondary max-w-xs">{description}</p>}

            {action && <div className="mt-5">{action}</div>}
        </div>
    );
};
