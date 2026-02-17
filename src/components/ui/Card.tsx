import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
    children,
    className,
    padding = 'md',
    hover = false,
    onClick,
}) => {
    const paddingStyles = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            className={cn(
                'bg-white dark:bg-[#1a202c] rounded-2xl border border-[#e5e7eb] dark:border-gray-800 shadow-sm',
                paddingStyles[padding],
                hover && 'hover:shadow-md transition-shadow duration-200',
                onClick && 'cursor-pointer',
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
    return (
        <div className={cn('border-b border-gray-100 dark:border-gray-800 pb-4 mb-4', className)}>
            {children}
        </div>
    );
};

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
    return (
        <h3 className={cn('text-lg font-bold text-slate-900 dark:text-white', className)}>
            {children}
        </h3>
    );
};

interface CardDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => {
    return (
        <p className={cn('text-sm text-slate-500 dark:text-gray-400 mt-1', className)}>
            {children}
        </p>
    );
};

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
    return <div className={className}>{children}</div>;
};

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
    return (
        <div className={cn('border-t border-gray-100 dark:border-gray-800 pt-4 mt-4', className)}>
            {children}
        </div>
    );
};
