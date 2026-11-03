import React, { useMemo, useState } from 'react';
import { startOfDay, startOfMonth, startOfWeek } from 'date-fns';
import { Button, Card, SectionTitle, SegmentedControl, Skeleton, Icon } from '@/components/ui';
import { EmptyState } from '@/components/common/EmptyState';
import { formatCurrency, formatDate } from '@/utils/format';
import { useRiderEarnings } from '../hooks/useRiderSelf';
import { RIDER_SHARE } from '../components/JobParts';

type Period = 'today' | 'week' | 'month' | 'all';

const periodLabel: Record<Period, string> = {
    today: 'today',
    week: 'this week',
    month: 'this month',
    all: 'in total',
};

// Same boundaries as the backend summary (weeks start on Sunday)
const periodStart = (p: Period): Date | null => {
    const now = new Date();
    if (p === 'today') return startOfDay(now);
    if (p === 'week') return startOfWeek(now, { weekStartsOn: 0 });
    if (p === 'month') return startOfMonth(now);
    return null;
};

const RiderEarnings: React.FC = () => {
    const [period, setPeriod] = useState<Period>('week');
    const { data, isLoading, isError, refetch } = useRiderEarnings();

    const payouts = data?.data?.payouts ?? [];
    const share = data?.data?.commissionRate ?? RIDER_SHARE;

    const visible = useMemo(() => {
        const start = periodStart(period);
        return start ? payouts.filter((p) => p.deliveredAt && new Date(p.deliveredAt) >= start) : payouts;
    }, [payouts, period]);

    const total = visible.reduce((sum, p) => sum + p.riderEarnings, 0);

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-11" />
                <Skeleton className="h-40" />
                <Skeleton className="h-64" />
            </div>
        );
    }

    if (isError) {
        return (
            <EmptyState
                icon="wifi_off"
                title="Couldn't load earnings"
                description="Check your connection and try again."
                action={<Button variant="secondary" onClick={() => refetch()}>Try again</Button>}
            />
        );
    }

    return (
        <div className="space-y-6">
            <SegmentedControl<Period>
                ariaLabel="Earnings period"
                value={period}
                onChange={setPeriod}
                segments={[
                    { value: 'today', label: 'Today' },
                    { value: 'week', label: 'Week' },
                    { value: 'month', label: 'Month' },
                    { value: 'all', label: 'All' },
                ]}
            />

            <Card className="bg-primary border-transparent text-white">
                <p className="text-sm font-medium text-white/80">You earned {periodLabel[period]}</p>
                <p className="text-4xl font-bold mt-1">{formatCurrency(total)}</p>
                <p className="text-sm text-white/80 mt-3">
                    {visible.length} deliver{visible.length === 1 ? 'y' : 'ies'} · you keep {Math.round(share * 100)}% of each fee
                </p>
            </Card>

            <section>
                <SectionTitle>Payouts</SectionTitle>
                {visible.length === 0 ? (
                    <Card>
                        <EmptyState
                            icon="payments"
                            title="No payouts yet"
                            description={period === 'all' ? 'Complete deliveries to start earning.' : `No completed deliveries ${periodLabel[period]}.`}
                            className="py-6"
                        />
                    </Card>
                ) : (
                    <Card padding="none" className="divide-y divide-line">
                        {visible.map((p) => (
                            <div key={p.orderId} className="px-4 py-4 flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-primary-subtle flex items-center justify-center flex-shrink-0">
                                    <Icon name="payments" className="text-primary text-[20px]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[15px] font-semibold text-ink truncate">{p.deliveryLocation}</p>
                                    <p className="text-[13px] text-ink-muted">
                                        {p.trackingId}
                                        {p.deliveredAt && ` · ${formatDate(p.deliveredAt, 'd MMM')}`}
                                    </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-[15px] font-bold text-ink">{formatCurrency(p.riderEarnings)}</p>
                                    <p className="text-[12px] text-ink-muted">of {formatCurrency(p.totalFee ?? 0)}</p>
                                </div>
                            </div>
                        ))}
                    </Card>
                )}
            </section>
        </div>
    );
};

export default RiderEarnings;
