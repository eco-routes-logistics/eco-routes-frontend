import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, SectionTitle, SegmentedControl, Skeleton, StatusBadge, Icon } from '@/components/ui';
import { formatCurrency } from '@/utils/format';
import { useRiderMe, useUpdateRiderStatus } from '../hooks/useRiderAuth';
import { useAvailableJobs, useRiderOrders, useRiderEarnings } from '../hooks/useRiderSelf';
import { RouteSummary } from '../components/JobParts';
import { withRiderName } from '../api/riderAuth';

type RiderStatus = 'active' | 'busy' | 'inactive';

const statusCopy: Record<RiderStatus, { title: string; body: string }> = {
    active: { title: "You're online", body: 'New jobs near you will show up in Jobs.' },
    busy: { title: "You're on a job", body: 'Finish your current delivery to take more.' },
    inactive: { title: "You're offline", body: "Go online when you're ready to take jobs." },
};

const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
};

const RiderDashboard: React.FC = () => {
    const { data: meData, isLoading: loadingMe } = useRiderMe();
    const { mutate: updateStatus } = useUpdateRiderStatus();
    const { data: ordersData, isLoading: loadingOrders } = useRiderOrders();
    const { data: earningsData } = useRiderEarnings();
    const { data: jobsData } = useAvailableJobs();

    const rider = meData?.data?.rider;
    const orders = ordersData?.data?.orders ?? [];
    const availableCount = jobsData?.data?.jobs?.length ?? 0;

    const { todayCount, activeJob, recent } = useMemo(() => {
        const today = new Date().toDateString();
        const delivered = orders.filter((o) => o.status === 'delivered');
        return {
            todayCount: delivered.filter((o) => o.deliveredAt && new Date(o.deliveredAt).toDateString() === today).length,
            activeJob: orders.find((o) => o.status === 'assigned' || o.status === 'in_transit'),
            recent: delivered.slice(0, 3),
        };
    }, [orders]);

    if (loadingMe || !rider) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-36" />
                <div className="grid grid-cols-2 gap-3">
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                </div>
                <Skeleton className="h-48" />
            </div>
        );
    }

    const status = (rider.status in statusCopy ? rider.status : 'inactive') as RiderStatus;

    return (
        <div className="space-y-6">
            <p className="text-2xl font-bold text-ink">
                {greeting()}, {withRiderName(rider).name.split(' ')[0]}
            </p>

            {/* Availability */}
            <Card>
                <div className="flex items-start gap-3 mb-4">
                    <span
                        className={
                            status === 'active'
                                ? 'mt-1.5 size-3 rounded-full bg-success ring-4 ring-success/20'
                                : status === 'busy'
                                  ? 'mt-1.5 size-3 rounded-full bg-warning ring-4 ring-warning/20'
                                  : 'mt-1.5 size-3 rounded-full bg-ink-muted ring-4 ring-ink-muted/20'
                        }
                    />
                    <div>
                        <p className="text-lg font-bold text-ink">{statusCopy[status].title}</p>
                        <p className="text-sm text-ink-secondary">{statusCopy[status].body}</p>
                    </div>
                </div>
                <SegmentedControl<RiderStatus>
                    ariaLabel="Availability"
                    size="lg"
                    value={status}
                    onChange={(s) => updateStatus(s)}
                    segments={[
                        { value: 'active', label: 'Online' },
                        { value: 'busy', label: 'Busy' },
                        { value: 'inactive', label: 'Offline' },
                    ]}
                />
            </Card>

            {/* Today */}
            <div className="grid grid-cols-2 gap-3">
                <Card padding="sm">
                    <p className="text-[13px] font-medium text-ink-secondary">Earned today</p>
                    <p className="text-2xl font-bold text-ink mt-1">{formatCurrency(earningsData?.data?.summary?.today ?? 0)}</p>
                </Card>
                <Card padding="sm">
                    <p className="text-[13px] font-medium text-ink-secondary">Deliveries today</p>
                    <p className="text-2xl font-bold text-ink mt-1">{todayCount}</p>
                </Card>
            </div>

            {/* Current job or call to action */}
            {loadingOrders ? (
                <Skeleton className="h-48" />
            ) : activeJob ? (
                <section>
                    <SectionTitle>Current job</SectionTitle>
                    <Card className="border-primary/40">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-[13px] font-semibold text-ink-muted">{activeJob.trackingId}</p>
                            <StatusBadge status={activeJob.status} />
                        </div>
                        <RouteSummary pickup={activeJob.pickupLocation} dropoff={activeJob.deliveryLocation} />
                        <Link
                            to="/rider/deliveries?tab=active"
                            className="mt-5 h-12 w-full rounded-xl bg-primary text-white font-semibold text-[15px] inline-flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors"
                        >
                            {activeJob.status === 'assigned' ? 'Go to pickup' : 'Continue delivery'}
                            <Icon name="arrow_forward" className="text-[20px]" />
                        </Link>
                    </Card>
                </section>
            ) : (
                <Card className="bg-primary-subtle border-transparent">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                            <Icon name="two_wheeler" filled className="text-white text-[24px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[15px] font-bold text-ink">
                                {availableCount > 0 ? `${availableCount} job${availableCount === 1 ? '' : 's'} available` : 'No jobs right now'}
                            </p>
                            <p className="text-sm text-ink-secondary">
                                {status === 'inactive' ? 'Go online to start taking jobs.' : 'We refresh the list every 30 seconds.'}
                            </p>
                        </div>
                    </div>
                    <Link
                        to="/rider/deliveries"
                        className="mt-4 h-12 w-full rounded-xl bg-primary text-white font-semibold text-[15px] inline-flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors"
                    >
                        Find jobs
                    </Link>
                </Card>
            )}

            {/* Recent */}
            {recent.length > 0 && (
                <section>
                    <SectionTitle action={<Link to="/rider/deliveries?tab=history" className="text-sm font-semibold text-primary">See all</Link>}>
                        Recent deliveries
                    </SectionTitle>
                    <Card padding="none" className="divide-y divide-line">
                        {recent.map((o) => (
                            <div key={o.id} className="px-4 py-3.5 flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-success-subtle flex items-center justify-center flex-shrink-0">
                                    <Icon name="check" className="text-success text-[20px]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-ink truncate">{o.deliveryLocation}</p>
                                    <p className="text-[13px] text-ink-muted">{o.trackingId}</p>
                                </div>
                            </div>
                        ))}
                    </Card>
                </section>
            )}
        </div>
    );
};

export default RiderDashboard;
