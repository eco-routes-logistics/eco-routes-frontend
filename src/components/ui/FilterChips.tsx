import React from 'react';
import { cn } from '@/utils/cn';

interface Chip<T extends string> {
    value: T;
    label: string;
    count?: number;
}

interface FilterChipsProps<T extends string> {
    value: T;
    onChange: (value: T) => void;
    options: Chip<T>[];
    ariaLabel: string;
    className?: string;
}

/** Single-select filter row that scrolls horizontally on small screens. */
export function FilterChips<T extends string>({ value, onChange, options, ariaLabel, className }: FilterChipsProps<T>) {
    return (
        <div role="tablist" aria-label={ariaLabel} className={cn('flex gap-2 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-1', className)}>
            {options.map((o) => {
                const active = o.value === value;
                return (
                    <button
                        key={o.value}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => onChange(o.value)}
                        className={cn(
                            'h-9 px-3.5 rounded-full text-sm font-semibold whitespace-nowrap border transition-colors inline-flex items-center gap-1.5',
                            active ? 'bg-ink text-surface-raised border-ink' : 'bg-surface-raised text-ink-secondary border-line hover:text-ink'
                        )}
                    >
                        {o.label}
                        {!!o.count && (
                            <span className={cn('min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold inline-flex items-center justify-center', active ? 'bg-surface-raised/20' : 'bg-warning-subtle text-warning')}>
                                {o.count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
