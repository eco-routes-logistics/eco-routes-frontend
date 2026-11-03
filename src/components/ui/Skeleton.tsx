import React from 'react';
import { cn } from '@/utils/cn';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
    <div aria-hidden="true" className={cn('animate-pulse rounded-xl bg-surface-sunken', className)} />
);
