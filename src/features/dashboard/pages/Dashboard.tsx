import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, PageHeader, SectionTitle, Skeleton, StatusBadge, Table, Td, Th, Tr } from '@/components/ui';
import { EmptyState } from '@/components/common/EmptyState';
import { cn } from '@/utils/cn';
import { formatCurrency, formatDate } from '@/utils/format';
import { useAuthStore } from '@/stores/authStore';
import { useDashboardAnalytics } from '@/features/analytics/hooks/useAnalytics';
import { useOrders } from '@/features/orders/hooks/useOrders';
import { useRiders } from '@/features/riders/hooks/useRiders';
import { useClients } from '@/features/clients/hooks/useClients';
import { OrderDrawer } from '@/features/orders/components/OrderDrawer';

const greeting = () => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
};

const StatTile: React.FC<{ label: string; value: React.ReactNode; icon: string; loading?: boolean }> = ({ label, value, icon, loading }) => (
    <Card padding="sm" className="flex items-start justify-between gap-3">
        <div className="min-w-0">
            <p className="text-[13px] font-medium text-ink-secondary">{label}</p>
            {loading ? <Skeleton className="h-8 w-20 mt-1" /> : <p className="text-xl sm:text-2xl font-bold text-ink mt-1 break-words">{value}</p>}
        </div>
        <span className="hidden sm:flex size-10 rounded-xl bg-primary-subtle items-center justify-center flex-shrink-0">
            <Icon name={icon} className="text-primary text-[22px]" />
        </span>
    </Card>
);

const AttentionRow: React.FC<{ to: string; icon: string; count?: number; label: string; action: string }> = ({ to, icon, count = 0, label, action }) => (
    <Link
        to={to}
        className={cn(
            'flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-surface-sunken/60',
            count === 0 && 'opacity-60'
        )}
    >
        <span className={cn('size-10 rounded-xl flex items-center justify-center flex-shrink-0', count > 0 ? 'bg-warning-subtle text-warning' : 'bg-surface-sunken text-ink-muted')}>
            <Icon name={icon} className="text-[22px]" />
        </span>
        <div className="flex-1 min-w-0">
            <p className="text-[15px] font-semibold text-ink">
                {count} {label}
            </p>
        </div>
        {count > 0 && (
            <span className="text-sm font-semibold text-primary inline-flex items-center gap-1">
                {action} <Icon name="arrow_forward" className="text-[18px]" />
            </span>
        )}
    </Link>
);

const Dashboard: React.FC = () => {
    const user = useAuthStore((s) => s.user);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { data: analytics, isLoading: loadingStats } = useDashboardAnalytics();
    const { data: recentData, isLoading: loadingRecent } = useOrders({ limit: 8 });
    const { data: unassignedData } = useOrders({ status: 'pending', limit: 1 });
    const { data: onlineData, isLoading: loadingRiders } = useRiders({ status: 'active' });
    const { data: pendingRidersData } = useRiders({ status: 'pending' });
    const { data: clientsData } = useClients({ limit: 100 });

    const metrics = analytics?.data?.metrics;
    const rankings = analytics?.data?.rankings;
    const recent = recentData?.data?.orders ?? [];
    const selected = recent.find((o) => o.id === selectedId) ?? null;

    const unassigned = unassignedData?.data?.pagination?.total ?? 0;
    const pendingRiders = pendingRidersData?.data?.riders?.length ?? 0;
    const pendingClients = (clientsData?.data?.clients ?? []).filter((c) => c.status === 'pending').length;
    const attentionTotal = unassigned + pendingRiders + pendingClients;

    return (
        <>
            <PageHeader title={`${greeting()}${user ? `, ${user.name.split(' ')[0]}` : ''}`} description={formatDate(new Date(), 'EEEE, d MMMM')} />

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
                <StatTile label="Orders today" value={metrics?.totalOrders ?? 0} icon="package_2" loading={loadingStats} />
                <StatTile label="In progress" value={metrics?.activeOrders ?? 0} icon="local_shipping" loading={loadingStats} />
                <StatTile label="Delivered today" value={metrics?.completedOrders ?? 0} icon="task_alt" loading={loadingStats} />
                <StatTile label="Revenue today" value={formatCurrency(metrics?.totalRevenue ?? 0)} icon="payments" loading={loadingStats} />
                <StatTile label="Riders online" value={onlineData?.data?.riders?.length ?? 0} icon="two_wheeler" loading={loadingRiders} />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6 min-w-0">
                    <section>
                        <SectionTitle>
                            Needs attention
                            {attentionTotal > 0 && <span className="ml-2 text-sm font-semibold text-warning">{attentionTotal}</span>}
                        </SectionTitle>
                        <Card padding="none" className="divide-y divide-line overflow-hidden">
                            <AttentionRow to="/orders?status=pending" icon="assignment_late" count={unassigned} label={`order${unassigned === 1 ? '' : 's'} waiting for a rider`} action="Assign" />
                            <AttentionRow to="/riders" icon="badge" count={pendingRiders} label={`rider application${pendingRiders === 1 ? '' : 's'} to review`} action="Review" />
                            <AttentionRow to="/clients" icon="storefront" count={pendingClients} label={`business sign-up${pendingClients === 1 ? '' : 's'} to approve`} action="Review" />
                        </Card>
                    </section>

                    <section>
                        <SectionTitle action={<Link to="/orders" className="text-sm font-semibold text-primary">View all</Link>}>Recent orders</SectionTitle>
                        {loadingRecent ? (
                            <Skeleton className="h-72" />
                        ) : recent.length === 0 ? (
                            <Card>
                                <EmptyState icon="package_2" title="No orders yet" description="Orders placed by business clients will show up here." className="py-6" />
                            </Card>
                        ) : (
                            <Table>
                                <thead>
                                    <tr>
                                        <Th>Order</Th>
                                        <Th>Recipient</Th>
                                        <Th>Rider</Th>
                                        <Th>Status</Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recent.map((o) => (
                                        <Tr key={o.id} onClick={() => setSelectedId(o.id)}>
                                            <Td>
                                                <p className="font-semibold whitespace-nowrap">{o.trackingId}</p>
                                                <p className="text-[12px] text-ink-muted whitespace-nowrap">{o.businessClient ?? ''}</p>
                                            </Td>
                                            <Td>
                                                <p>{o.customerName}</p>
                                                <p className="text-[12px] text-ink-muted max-w-[220px] truncate">{o.deliveryLocation}</p>
                                            </Td>
                                            <Td className="whitespace-nowrap">{o.driver ?? <span className="text-ink-muted">—</span>}</Td>
                                            <Td>
                                                <StatusBadge status={o.status} />
                                            </Td>
                                        </Tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </section>
                </div>

                <div className="space-y-6">
                    {[
                        { title: 'Top riders', items: rankings?.topRiders ?? [], unit: 'deliveries', to: '/riders' },
                        { title: 'Top clients', items: rankings?.topClients ?? [], unit: 'orders', to: '/clients' },
                    ].map((block) => (
                        <section key={block.title}>
                            <SectionTitle>{block.title}</SectionTitle>
                            <Card padding="none" className="divide-y divide-line">
                                {block.items.length === 0 ? (
                                    <p className="px-4 py-6 text-sm text-ink-muted text-center">No data yet</p>
                                ) : (
                                    block.items.map((item, i) => (
                                        <Link key={item.id} to={block.to} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-sunken/60">
                                            <span className="size-7 rounded-full bg-surface-sunken text-[12px] font-bold text-ink-secondary flex items-center justify-center flex-shrink-0">
                                                {i + 1}
                                            </span>
                                            <span className="flex-1 min-w-0 text-sm font-semibold text-ink truncate">{item.name}</span>
                                            <span className="text-sm text-ink-secondary whitespace-nowrap">
                                                {item.orders ?? 0} {block.unit}
                                            </span>
                                        </Link>
                                    ))
                                )}
                            </Card>
                        </section>
                    ))}
                </div>
            </div>

            <OrderDrawer order={selected} onClose={() => setSelectedId(null)} />
        </>
    );
};

export default Dashboard;
