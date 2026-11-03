import React from 'react';
import { cn } from '@/utils/cn';
import { getStatusStyle, StatusKind, Tone } from '@/utils/status';

const tones: Record<Tone, string> = {
    neutral: 'bg-surface-sunken text-ink-secondary',
    primary: 'bg-primary-subtle text-primary',
    success: 'bg-success-subtle text-success',
    warning: 'bg-warning-subtle text-warning',
    danger: 'bg-danger-subtle text-danger',
    info: 'bg-info-subtle text-info',
};

interface BadgeProps {
    children: React.ReactNode;
    tone?: Tone;
    dot?: boolean;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, tone = 'neutral', dot = false, className }) => (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap', tones[tone], className)}>
        {dot && <span className="size-1.5 rounded-full bg-current" />}
        {children}
    </span>
);

interface StatusBadgeProps {
    status: string;
    kind?: StatusKind;
    dot?: boolean;
    className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, kind = 'order', dot, className }) => {
    const { label, tone } = getStatusStyle(status, kind);
    return (
        <Badge tone={tone} dot={dot} className={className}>
            {label}
        </Badge>
    );
};
