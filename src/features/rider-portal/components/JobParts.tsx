import React from 'react';
import { cn } from '@/utils/cn';
import { Icon } from '@/components/ui';

// Riders keep 75% of each delivery fee; mirrors the backend (rider.self.controller.ts)
export const RIDER_SHARE = 0.75;

/** Vertical pickup → drop-off display used on every job card. */
export const RouteSummary: React.FC<{ pickup: string; dropoff: string; className?: string }> = ({ pickup, dropoff, className }) => (
    <div className={cn('flex gap-3', className)}>
        <div className="flex flex-col items-center pt-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full border-2 border-primary" />
            <span className="w-px flex-1 bg-line my-1" />
            <span className="size-2.5 rounded-full bg-primary" />
        </div>
        <div className="flex-1 min-w-0 space-y-3">
            <div>
                <p className="text-[12px] font-medium text-ink-muted">Pickup</p>
                <p className="text-[15px] font-semibold text-ink leading-snug">{pickup}</p>
            </div>
            <div>
                <p className="text-[12px] font-medium text-ink-muted">Drop-off</p>
                <p className="text-[15px] font-semibold text-ink leading-snug">{dropoff}</p>
            </div>
        </div>
    </div>
);

const STEPS = ['Accepted', 'Picked up', 'Delivered'];

const stepIndex = (status: string) => {
    if (status === 'delivered') return 3;
    if (status === 'in_transit' || status === 'picked_up') return 2;
    return 1;
};

/** Accepted → Picked up → Delivered progress for an active job. */
export const JobStepper: React.FC<{ status: string }> = ({ status }) => {
    const done = stepIndex(status);
    return (
        <ol className="flex items-center" aria-label="Delivery progress">
            {STEPS.map((label, i) => {
                const complete = i < done;
                const current = i === done;
                return (
                    <li key={label} className={cn('flex items-center', i < STEPS.length - 1 && 'flex-1')}>
                        <div className="flex flex-col items-center gap-1.5">
                            <span
                                className={cn(
                                    'size-7 rounded-full flex items-center justify-center text-[12px] font-bold border-2',
                                    complete && 'bg-primary border-primary text-white',
                                    current && 'border-primary text-primary bg-surface-raised',
                                    !complete && !current && 'border-line text-ink-muted bg-surface-raised'
                                )}
                            >
                                {complete ? <Icon name="check" className="text-[16px]" /> : i + 1}
                            </span>
                            <span className={cn('text-[12px] font-semibold whitespace-nowrap', complete || current ? 'text-ink' : 'text-ink-muted')}>
                                {label}
                            </span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <span className={cn('flex-1 h-0.5 mx-2 mb-6 rounded-full', i < done - 1 ? 'bg-primary' : 'bg-line')} />
                        )}
                    </li>
                );
            })}
        </ol>
    );
};
