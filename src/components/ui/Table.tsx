import React from 'react';
import { cn } from '@/utils/cn';
import { Icon } from './Icon';

/** Card-wrapped table with horizontal scroll on narrow screens. */
export const Table: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={cn('bg-surface-raised rounded-card border border-line shadow-raised overflow-hidden', className)}>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">{children}</table>
        </div>
    </div>
);

export const Th: React.FC<{ children?: React.ReactNode; align?: 'left' | 'right'; className?: string }> = ({ children, align = 'left', className }) => (
    <th
        className={cn(
            'px-4 py-3 text-[12px] font-semibold text-ink-muted bg-surface-sunken/60 border-b border-line whitespace-nowrap',
            align === 'right' ? 'text-right' : 'text-left',
            className
        )}
    >
        {children}
    </th>
);

export const Td: React.FC<{ children?: React.ReactNode; align?: 'left' | 'right'; className?: string }> = ({ children, align = 'left', className }) => (
    <td className={cn('px-4 py-3.5 text-ink align-middle', align === 'right' && 'text-right', className)}>{children}</td>
);

/** Clickable row; keyboard-accessible when onClick is set. */
export const Tr: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string }> = ({ children, onClick, className }) => (
    <tr
        onClick={onClick}
        onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onClick()) : undefined}
        tabIndex={onClick ? 0 : undefined}
        className={cn(
            'border-b border-line last:border-0',
            onClick && 'cursor-pointer hover:bg-surface-sunken/60 focus-visible:outline-none focus-visible:bg-surface-sunken',
            className
        )}
    >
        {children}
    </tr>
);

export const SearchInput: React.FC<{ value: string; onChange: (v: string) => void; placeholder?: string; className?: string }> = ({
    value,
    onChange,
    placeholder = 'Search',
    className,
}) => (
    <div className={cn('relative', className)}>
        <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-[20px] pointer-events-none" />
        <input
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="w-full h-10 pl-10 pr-3 rounded-xl border border-line bg-surface-raised text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
    </div>
);

interface PaginationProps {
    page: number;
    totalPages: number;
    total?: number;
    onChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, total, onChange }) => {
    if (totalPages <= 1) return null;
    const btn = 'size-9 rounded-lg border border-line bg-surface-raised flex items-center justify-center text-ink-secondary hover:bg-surface-sunken disabled:opacity-40 disabled:cursor-not-allowed';
    return (
        <div className="flex items-center justify-between gap-3 mt-4 text-sm text-ink-secondary">
            <span>
                Page {page} of {totalPages}
                {total !== undefined && ` · ${total} total`}
            </span>
            <div className="flex gap-2">
                <button type="button" className={btn} onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label="Previous page">
                    <Icon name="chevron_left" className="text-[20px]" />
                </button>
                <button type="button" className={btn} onClick={() => onChange(page + 1)} disabled={page >= totalPages} aria-label="Next page">
                    <Icon name="chevron_right" className="text-[20px]" />
                </button>
            </div>
        </div>
    );
};

/** Page heading row used at the top of admin pages. */
export const PageHeader: React.FC<{ title: string; description?: string; actions?: React.ReactNode }> = ({ title, description, actions }) => (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
            <h1 className="text-2xl font-bold text-ink">{title}</h1>
            {description && <p className="text-sm text-ink-secondary mt-1">{description}</p>}
        </div>
        {actions && <div className="flex gap-2 flex-shrink-0">{actions}</div>}
    </div>
);
