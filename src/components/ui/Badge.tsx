import React from 'react';
import { cn } from '@/utils/cn';
import { ORDER_STATUSES } from '@/utils/constants';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    size = 'md',
    className,
}) => {
    const variants = {
        default: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
        success: 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
        warning: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
        danger: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
        info: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
        purple: 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full font-black uppercase tracking-tight border',
                variants[variant],
                sizes[size],
                className
            )}
        >
            {children}
        </span>
    );
};

interface StatusBadgeProps {
    status: string;
    className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
    const getVariant = (status: string): 'success' | 'warning' | 'danger' | 'info' | 'default' => {
        switch (status) {
            case ORDER_STATUSES.DELIVERED:
                return 'success';
            case ORDER_STATUSES.IN_TRANSIT:
            case ORDER_STATUSES.ACCEPTED:
                return 'info';
            case ORDER_STATUSES.PENDING:
                return 'warning';
            case ORDER_STATUSES.CANCELLED:
            case ORDER_STATUSES.FAILED:
                return 'danger';
            default:
                return 'default';
        }
    };

    return (
        <Badge variant={getVariant(status)} className={className}>
            {status}
        </Badge>
    );
};
