import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, SectionTitle, Skeleton } from '@/components/ui';
import { EmptyState } from '@/components/common/EmptyState';
import { formatCurrency } from '@/utils/format';
import { useClientMe, useClientPortalOrders } from '../hooks/useClientAuth';
import { ClientOrderList } from '../components/ClientOrderList';
import { isActiveOrder, toStatusKey } from '../utils/clientOrders';

const ClientDashboard: React.FC = () => {
    const { data: meData, isLoading: loadingMe } = useClientMe();
    const { data: ordersData, isLoading: loadingOrders } = useClientPortalOrders({ limit: 50 });

    const client = meData?.data?.client;
    const balance = meData?.data?.walletBalance ?? 0;
    const payAsYouGo = client?.accountType === 'pay_as_you_go';
    const orders = ordersData?.data?.orders ?? [];

    const { active, deliveredThisMonth, recent } = useMemo(() => {
        const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        return {
            active: orders.filter((o) => isActiveOrder(o.status)),
            deliveredThisMonth: orders.filter((o) => toStatusKey(o.status) === 'delivered' && new Date(o.createdAt) >= monthStart).length,
            recent: orders.filter((o) => !isActiveOrder(o.status)).slice(0, 5),
        };
    }, [orders]);

    if (loadingMe || !client) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-56" />
                <Skeleton className="h-36" />
                <Skeleton className="h-48" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <p className="text-2xl font-bold text-ink">Hello, {client.contactName.split(' ')[0]}</p>
                <p className="text-sm text-ink-secondary">{client.company}</p>
            </div>

            {/* Primary action + wallet */}
            <div className={payAsYouGo ? 'grid sm:grid-cols-2 gap-3' : ''}>
                <Link
                    to="/client/orders/new"
                    className="flex items-center gap-4 p-5 rounded-card bg-primary text-white hover:bg-primary-hover transition-colors"
                >
                    <span className="size-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
                        <Icon name="add" className="text-[28px]" />
                    </span>
                    <span>
                        <span className="block text-lg font-bold">Book a delivery</span>
                        <span className="block text-sm text-white/80">Takes about a minute</span>
                    </span>
                </Link>
                {payAsYouGo && (
                    <Card className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-[13px] font-medium text-ink-secondary">Wallet balance</p>
                            <p className="text-2xl font-bold text-ink">{formatCurrency(balance)}</p>
                        </div>
                        <Link
                            to="/client/payments"
                            className="h-10 px-4 rounded-xl border border-line text-sm font-semibold text-ink inline-flex items-center gap-1.5 hover:bg-surface-sunken"
                        >
                            <Icon name="add" className="text-[18px]" /> Top up
                        </Link>
                    </Card>
                )}
            </div>

            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'On the way', value: active.length },
                    { label: 'Delivered this month', value: deliveredThisMonth },
                    { label: 'All-time orders', value: client.totalOrders ?? orders.length },
                ].map((s) => (
                    <Card key={s.label} padding="sm">
                        <p className="text-2xl font-bold text-ink">{s.value}</p>
                        <p className="text-[12px] sm:text-[13px] font-medium text-ink-secondary leading-snug">{s.label}</p>
                    </Card>
                ))}
            </div>

            <section>
                <SectionTitle>Active deliveries</SectionTitle>
                {loadingOrders ? (
                    <Skeleton className="h-32" />
                ) : active.length === 0 ? (
                    <Card>
                        <EmptyState icon="local_shipping" title="Nothing on the way" description="Deliveries you book will show their live status here." className="py-6" />
                    </Card>
                ) : (
                    <ClientOrderList orders={active} />
                )}
            </section>

            {recent.length > 0 && (
                <section>
                    <SectionTitle action={<Link to="/client/orders" className="text-sm font-semibold text-primary">See all</Link>}>Recent</SectionTitle>
                    <ClientOrderList orders={recent} />
                </section>
            )}
        </div>
    );
};

export default ClientDashboard;
