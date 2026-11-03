import React from 'react';
import { cn } from '@/utils/cn';

interface Segment<T extends string> {
    value: T;
    label: React.ReactNode;
    count?: number;
}

interface SegmentedControlProps<T extends string> {
    value: T;
    onChange: (value: T) => void;
    segments: Segment<T>[];
    ariaLabel: string;
    size?: 'md' | 'lg';
    className?: string;
}

export function SegmentedControl<T extends string>({ value, onChange, segments, ariaLabel, size = 'md', className }: SegmentedControlProps<T>) {
    return (
        <div role="tablist" aria-label={ariaLabel} className={cn('flex p-1 rounded-xl bg-surface-sunken border border-line', className)}>
            {segments.map((s) => {
                const active = s.value === value;
                return (
                    <button
                        key={s.value}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => onChange(s.value)}
                        className={cn(
                            'flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold transition-colors',
                            size === 'lg' ? 'h-11 text-[15px]' : 'h-9 text-sm',
                            active ? 'bg-surface-raised text-ink shadow-raised' : 'text-ink-muted hover:text-ink'
                        )}
                    >
                        {s.label}
                        {!!s.count && (
                            <span className={cn('min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold inline-flex items-center justify-center', active ? 'bg-primary text-white' : 'bg-line text-ink-secondary')}>
                                {s.count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
