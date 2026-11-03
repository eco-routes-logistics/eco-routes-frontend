import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
};

export const Card: React.FC<CardProps> = ({ children, className, padding = 'md', ...props }) => (
    <div className={cn('bg-surface-raised rounded-card border border-line shadow-raised', paddingStyles[padding], className)} {...props}>
        {children}
    </div>
);

interface SectionTitleProps {
    children: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}

/** Small heading above a group of content, with an optional right-side action. */
export const SectionTitle: React.FC<SectionTitleProps> = ({ children, action, className }) => (
    <div className={cn('flex items-center justify-between mb-3', className)}>
        <h2 className="text-[15px] font-bold text-ink">{children}</h2>
        {action}
    </div>
);
