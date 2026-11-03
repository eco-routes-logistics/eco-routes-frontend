import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { startOfDay, subDays } from 'date-fns';
import { Badge, Button, FilterChips, Pagination, PageHeader, SearchInput, Select, Skeleton, StatusBadge, Table, Td, Th, Tr } from '@/components/ui';
import { EmptyState } from '@/components/common/EmptyState';
import { formatCurrency, formatDate } from '@/utils/format';
import { useOrders } from '../hooks/useOrders';
import { OrderDrawer } from '../components/OrderDrawer';

type StatusFilter = 'all' | 'pending' | 'assigned' | 'in_transit' | 'delivered' | 'cancelled';
type DateFilter = 'any' | 'today' | '7d' | '30d';

const STATUS_FILTERS: StatusFilter[] = ['all', 'pending', 'assigned', 'in_transit', 'delivered', 'cancelled'];

const PAGE_SIZE = 20;

const dateStart = (f: DateFilter): string | undefined => {
    if (f === 'today') return startOfDay(new Date()).toISOString();
    if (f === '7d') return subDays(new Date(), 7).toISOString();
    if (f === '30d') return subDays(new Date(), 30).toISOString();
    return undefined;
};

const Orders: React.FC = () => {
    // Links like /orders?status=pending (from the Overview page) open pre-filtered
    const [params] = useSearchParams();
    const [status, setStatus] = useState<StatusFilter>(() => {
        const initial = params.get('status') as StatusFilter | null;
        return initial && STATUS_FILTERS.includes(initial) ? initial : 'all';
    });
    const [range, setRange] = useState<DateFilter>('any');
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Date range is part of the key, so compute it once per filter change rather than every render
    const startDate = useMemo(() => dateStart(range), [range]);
    const { data, isLoading, isError, refetch } = useOrders({
        status: status === 'all' ? undefined : status,
        startDate,
        page,
        limit: PAGE_SIZE,
    });
    const { data: pendingData } = useOrders({ status: 'pending', limit: 1 });

    const orders = data?.data?.orders ?? [];
    const pagination = data?.data?.pagination;
    const pendingCount = pendingData?.data?.pagination?.total;

    // The API has no text search, so this narrows the current page only
    const visible = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return orders;
        return orders.filter((o) =>
            [o.trackingId, o.customerName, o.businessClient, o.driver, o.deliveryLocation].some((v) => v?.toLowerCase().includes(q))
        );
    }, [orders, search]);

    const selected = orders.find((o) => o.id === selectedId) ?? null;

    const changeFilter = <T,>(setter: (v: T) => void) => (v: T) => {
        setter(v);
        setPage(1);
    };

    return (
        <>
            <PageHeader title="Orders" description="Every delivery across all clients. Click an order to assign a rider or update it." />

            <div className="space-y-3 mb-4">
                <FilterChips<StatusFilter>
                    ariaLabel="Filter by status"
                    value={status}
                    onChange={changeFilter(setStatus)}
                    options={[
                        { value: 'all', label: 'All' },
                        { value: 'pending', label: 'Needs rider', count: pendingCount },
                        { value: 'assigned', label: 'Assigned' },
                        { value: 'in_transit', label: 'In transit' },
                        { value: 'delivered', label: 'Delivered' },
                        { value: 'cancelled', label: 'Cancelled' },
                    ]}
                />
                <div className="flex flex-col sm:flex-row gap-2">
                    <SearchInput value={search} onChange={setSearch} placeholder="Search this page by ID, customer, client or rider" className="flex-1" />
                    <div className="sm:w-44">
                        <Select value={range} onChange={(e) => changeFilter(setRange)(e.target.value as DateFilter)} aria-label="Date range" className="h-10 text-sm">
                            <option value="any">Any time</option>
                            <option value="today">Today</option>
                            <option value="7d">Last 7 days</option>
                            <option value="30d">Last 30 days</option>
                        </Select>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <Skeleton className="h-96" />
            ) : isError ? (
                <EmptyState
                    icon="wifi_off"
                    title="Couldn't load orders"
                    description="Check your connection or that the API is running."
                    action={<Button variant="secondary" onClick={() => refetch()}>Try again</Button>}
                />
            ) : visible.length === 0 ? (
                <EmptyState
                    icon="package_2"
                    title={search ? 'No matching orders on this page' : 'No orders here'}
                    description={search ? 'Try a different search or clear the filters.' : 'Orders created by business clients will appear here.'}
                />
            ) : (
                <>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Order</Th>
                                <Th>Recipient</Th>
                                <Th>Client</Th>
                                <Th>Rider</Th>
                                <Th align="right">Fee</Th>
                                <Th>Status</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {visible.map((o) => (
                                <Tr key={o.id} onClick={() => setSelectedId(o.id)}>
                                    <Td>
                                        <p className="font-semibold whitespace-nowrap">{o.trackingId}</p>
                                        <p className="text-[12px] text-ink-muted whitespace-nowrap">{formatDate(o.createdAt, 'd MMM, h:mm a')}</p>
                                    </Td>
                                    <Td>
                                        <p className="font-medium">{o.customerName}</p>
                                        <p className="text-[12px] text-ink-muted max-w-[240px] truncate">{o.deliveryLocation}</p>
                                    </Td>
                                    <Td className="text-ink-secondary">{o.businessClient ?? '—'}</Td>
                                    <Td>
                                        {o.driver ? (
                                            <span className="whitespace-nowrap">{o.driver}</span>
                                        ) : o.status === 'pending' ? (
                                            <Badge tone="warning">Unassigned</Badge>
                                        ) : (
                                            <span className="text-ink-muted">—</span>
                                        )}
                                    </Td>
                                    <Td align="right" className="font-semibold whitespace-nowrap">{formatCurrency(o.totalFee ?? 0)}</Td>
                                    <Td>
                                        <StatusBadge status={o.status} />
                                    </Td>
                                </Tr>
                            ))}
                        </tbody>
                    </Table>
                    {pagination && <Pagination page={page} totalPages={pagination.totalPages} total={pagination.total} onChange={setPage} />}
                </>
            )}

            <OrderDrawer order={selected} onClose={() => setSelectedId(null)} />
        </>
    );
};

export default Orders;
