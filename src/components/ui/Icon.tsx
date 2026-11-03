import React from 'react';
import { cn } from '@/utils/cn';

interface IconProps {
    name: string;
    filled?: boolean;
    className?: string;
}

/** Material Symbols icon. Size it with a text-[Npx] class. */
export const Icon: React.FC<IconProps> = ({ name, filled = false, className }) => (
    <span aria-hidden="true" className={cn('material-symbols-outlined select-none', filled && 'fill-1', className)}>
        {name}
    </span>
);
