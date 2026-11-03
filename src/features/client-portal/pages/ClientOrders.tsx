import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, FilterChips, Pagination, Skeleton } from '@/components/ui';
import { EmptyState } from '@/components/common/EmptyState';
import { useClientPortalOrders } from '../hooks/useClientAuth';
import { ClientOrderList } from '../components/ClientOrderList';

type Filter = 'all' | 'pending' | 'assigned' | 'in_transit' | 'delivered' | 'cancelled';
const PAGE_SIZE = 20;

const ClientOrders: React.FC = () => {
    const [filter, setFilter] = useState<Filter>('all');
    const [page, setPage] = useState(1);
    const { data, isLoading, isError, refetch } = useClientPortalOrders({ status: filter === 'all' ? undefined : filter, page, limit: PAGE_SIZE });

    const orders = data?.data?.orders ?? [];
    const pagination = data?.data?.pagination;

    return (
        <div className="space-y-4">
            <FilterChips<Filter>
                ariaLabel="Filter orders"
                value={filter}
                onChange={(v) => {
                    setFilter(v);
                    setPage(1);
                }}
                options={[
                    { value: 'all', label: 'All' },
                    { value: 'pending', label: 'Finding rider' },
                    { value: 'assigned', label: 'Rider assigned' },
                    { value: 'in_transit', label: 'On the way' },
                    { value: 'delivered', label: 'Delivered' },
                    { value: 'cancelled', label: 'Cancelled' },
                ]}
            />

            {isLoading ? (
                <Skeleton className="h-80" />
            ) : isError ? (
                <EmptyState
                    icon="wifi_off"
                    title="Couldn't load your orders"
                    description="Check your connection and try again."
                    action={<Button variant="secondary" onClick={() => refetch()}>Try again</Button>}
                />
            ) : orders.length === 0 ? (
                <EmptyState
                    icon="package_2"
                    title={filter === 'all' ? 'No deliveries yet' : 'Nothing here'}
                    description={filter === 'all' ? 'Book your first delivery and track it here.' : 'No orders with this status.'}
                    action={
                        filter === 'all' && (
                            <Link to="/client/orders/new" className="h-11 px-5 rounded-xl bg-primary text-white text-sm font-semibold inline-flex items-center hover:bg-primary-hover">
                                Book a delivery
                            </Link>
                        )
                    }
                />
            ) : (
                <>
                    <ClientOrderList orders={orders} />
                    {pagination && <Pagination page={page} totalPages={pagination.totalPages} total={pagination.total} onChange={setPage} />}
                </>
            )}
        </div>
    );
};

export default ClientOrders;
