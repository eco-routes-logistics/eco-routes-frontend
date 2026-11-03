import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Card, Icon, SegmentedControl, Skeleton, StatusBadge, Textarea, Badge } from '@/components/ui';
import { EmptyState } from '@/components/common/EmptyState';
import { formatCurrency, formatDate } from '@/utils/format';
import { useAvailableJobs, useAcceptJob, useMarkPickedUp, useMarkDelivered, useRiderOrders } from '../hooks/useRiderSelf';
import { AvailableJob, RiderOrder } from '../api/riderSelf';
import { RouteSummary, JobStepper, RIDER_SHARE } from '../components/JobParts';

type Tab = 'available' | 'active' | 'history';
const TABS: Tab[] = ['available', 'active', 'history'];

const ListSkeleton = () => (
    <div className="space-y-3">
        <Skeleton className="h-56" />
        <Skeleton className="h-56" />
    </div>
);

const ErrorState: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
    <EmptyState
        icon="wifi_off"
        title="Couldn't load jobs"
        description="Check your connection and try again."
        action={<Button variant="secondary" onClick={onRetry}>Try again</Button>}
    />
);

/* ── Available ───────────────────────────────────────── */

const AvailableJobCard: React.FC<{ job: AvailableJob; onAccept: () => void; accepting: boolean; disabled: boolean }> = ({
    job,
    onAccept,
    accepting,
    disabled,
}) => (
    <Card>
        <div className="flex items-start justify-between gap-3 mb-4">
            <div className="min-w-0">
                <p className="text-[13px] font-semibold text-ink-muted">{job.trackingId}</p>
                <p className="text-[15px] font-semibold text-ink truncate">{job.description || 'Package delivery'}</p>
            </div>
            <div className="text-right flex-shrink-0">
                <p className="text-xl font-bold text-primary">{formatCurrency(job.estimatedRiderEarnings)}</p>
                <p className="text-[12px] text-ink-muted">You earn</p>
            </div>
        </div>
        <RouteSummary pickup={job.pickupLocation} dropoff={job.deliveryLocation} />
        <div className="flex flex-wrap gap-2 mt-4">
            {!!job.weight && (
                <Badge>
                    <Icon name="scale" className="text-[14px]" /> {job.weight} kg
                </Badge>
            )}
            {job.deliveryType && <Badge className="capitalize">{job.deliveryType.replace(/_/g, ' ')}</Badge>}
        </div>
        <Button size="lg" fullWidth className="mt-5" onClick={onAccept} isLoading={accepting} disabled={disabled}>
            Accept job
        </Button>
    </Card>
);

const AvailableTab: React.FC<{ onAccepted: () => void }> = ({ onAccepted }) => {
    const { data, isLoading, isError, refetch, isFetching } = useAvailableJobs();
    const { mutate: acceptJob, isPending, variables: acceptingId } = useAcceptJob();
    const jobs = data?.data?.jobs ?? [];

    if (isLoading) return <ListSkeleton />;
    if (isError) return <ErrorState onRetry={refetch} />;
    if (jobs.length === 0) {
        return (
            <EmptyState
                icon="search"
                title="No jobs right now"
                description="New jobs appear here automatically. Stay online so you don't miss them."
                action={
                    <Button variant="secondary" onClick={() => refetch()} isLoading={isFetching} leftIcon={<Icon name="refresh" className="text-[18px]" />}>
                        Refresh
                    </Button>
                }
            />
        );
    }

    return (
        <div className="space-y-3">
            {jobs.map((job) => (
                <AvailableJobCard
                    key={job.id}
                    job={job}
                    accepting={isPending && acceptingId === job.id}
                    disabled={isPending}
                    onAccept={() => acceptJob(job.id, { onSuccess: onAccepted })}
                />
            ))}
        </div>
    );
};

/* ── Active ──────────────────────────────────────────── */

const ActiveJobCard: React.FC<{ order: RiderOrder }> = ({ order }) => {
    const [note, setNote] = useState('');
    const { mutate: markPickedUp, isPending: pickingUp } = useMarkPickedUp();
    const { mutate: markDelivered, isPending: delivering } = useMarkDelivered();
    const pickedUp = order.status === 'in_transit' || order.status === 'picked_up';

    return (
        <Card className="space-y-5">
            <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-ink-muted">{order.trackingId}</p>
                <StatusBadge status={order.status} />
            </div>

            <JobStepper status={order.status} />

            <RouteSummary pickup={order.pickupLocation} dropoff={order.deliveryLocation} />

            {/* Recipient */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-sunken">
                <div className="size-10 rounded-full bg-surface-raised flex items-center justify-center flex-shrink-0">
                    <Icon name="person" className="text-ink-secondary text-[20px]" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[12px] text-ink-muted">Recipient</p>
                    <p className="text-[15px] font-semibold text-ink truncate">{order.customerName}</p>
                </div>
                {order.customerPhone && (
                    <a
                        href={`tel:${order.customerPhone}`}
                        aria-label={`Call ${order.customerName}`}
                        className="size-11 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 hover:bg-primary-hover transition-colors"
                    >
                        <Icon name="call" filled className="text-[20px]" />
                    </a>
                )}
            </div>

            {order.otp && (
                <div className="p-4 rounded-xl border border-dashed border-warning/50 bg-warning-subtle text-center">
                    <p className="text-[13px] font-semibold text-warning">Delivery code</p>
                    <p className="text-3xl font-bold tracking-[0.3em] text-ink mt-1">{order.otp}</p>
                    <p className="text-[12px] text-ink-secondary mt-1">Confirm this code with the recipient at drop-off.</p>
                </div>
            )}

            {pickedUp ? (
                <>
                    <Textarea
                        label="Delivery note (optional)"
                        rows={2}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="e.g. Left with security at the gate"
                    />
                    <Button
                        size="lg"
                        fullWidth
                        isLoading={delivering}
                        onClick={() => markDelivered({ orderId: order.id, note: note.trim() || undefined })}
                        leftIcon={<Icon name="task_alt" className="text-[20px]" />}
                    >
                        Mark as delivered
                    </Button>
                </>
            ) : (
                <Button
                    size="lg"
                    fullWidth
                    isLoading={pickingUp}
                    onClick={() => markPickedUp(order.id)}
                    leftIcon={<Icon name="inventory_2" className="text-[20px]" />}
                >
                    I've picked it up
                </Button>
            )}
        </Card>
    );
};

const ActiveTab: React.FC<{ orders: RiderOrder[]; onFindJobs: () => void }> = ({ orders, onFindJobs }) =>
    orders.length === 0 ? (
        <EmptyState
            icon="two_wheeler"
            title="No active jobs"
            description="Accept a job and it will show here with step-by-step actions."
            action={<Button onClick={onFindJobs}>Find jobs</Button>}
        />
    ) : (
        <div className="space-y-3">
            {orders.map((o) => (
                <ActiveJobCard key={o.id} order={o} />
            ))}
        </div>
    );

/* ── History ─────────────────────────────────────────── */

const HistoryTab: React.FC<{ orders: RiderOrder[] }> = ({ orders }) =>
    orders.length === 0 ? (
        <EmptyState icon="history" title="No deliveries yet" description="Completed jobs will be listed here." />
    ) : (
        <Card padding="none" className="divide-y divide-line">
            {orders.map((o) => (
                <div key={o.id} className="px-4 py-4 flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                        <p className="text-[15px] font-semibold text-ink truncate">{o.deliveryLocation}</p>
                        <p className="text-[13px] text-ink-muted truncate">From {o.pickupLocation}</p>
                        <p className="text-[12px] text-ink-muted mt-1">
                            {o.trackingId} · {o.deliveredAt ? formatDate(o.deliveredAt, 'd MMM, h:mm a') : formatDate(o.createdAt, 'd MMM')}
                        </p>
                    </div>
                    <div className="text-right flex-shrink-0 space-y-1">
                        {o.status === 'delivered' && (
                            <p className="text-[15px] font-bold text-ink">{formatCurrency(Math.round((o.totalFee ?? 0) * RIDER_SHARE))}</p>
                        )}
                        <StatusBadge status={o.status} />
                    </div>
                </div>
            ))}
        </Card>
    );

/* ── Page ────────────────────────────────────────────── */

const RiderDeliveries: React.FC = () => {
    const [params, setParams] = useSearchParams();
    const tabParam = params.get('tab') as Tab | null;
    const tab: Tab = tabParam && TABS.includes(tabParam) ? tabParam : 'available';
    const setTab = (t: Tab) => setParams({ tab: t }, { replace: true });

    const { data: jobsData } = useAvailableJobs();
    const { data: ordersData, isLoading, isError, refetch } = useRiderOrders();
    const orders = ordersData?.data?.orders ?? [];
    const active = orders.filter((o) => o.status === 'assigned' || o.status === 'in_transit' || o.status === 'picked_up');
    const history = orders.filter((o) => o.status === 'delivered' || o.status === 'cancelled');

    return (
        <div className="space-y-5">
            <SegmentedControl<Tab>
                ariaLabel="Jobs"
                value={tab}
                onChange={setTab}
                segments={[
                    { value: 'available', label: 'Available', count: jobsData?.data?.jobs?.length },
                    { value: 'active', label: 'Active', count: active.length },
                    { value: 'history', label: 'History' },
                ]}
            />

            {tab === 'available' && <AvailableTab onAccepted={() => setTab('active')} />}
            {tab !== 'available' && isLoading && <ListSkeleton />}
            {tab !== 'available' && isError && <ErrorState onRetry={refetch} />}
            {tab === 'active' && !isLoading && !isError && <ActiveTab orders={active} onFindJobs={() => setTab('available')} />}
            {tab === 'history' && !isLoading && !isError && <HistoryTab orders={history} />}
        </div>
    );
};

export default RiderDeliveries;
