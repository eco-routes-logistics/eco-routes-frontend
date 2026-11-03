import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Modal, Select, StatusBadge } from '@/components/ui';
import { cn } from '@/utils/cn';
import { formatCurrency, formatDate } from '@/utils/format';
import { ORDER_STATUS_STYLES } from '@/utils/status';
import { useRiders } from '@/features/riders/hooks/useRiders';
import { ApiOrder, OrderStatusValue } from '../api/orders';
import { useAssignRider, useUpdateOrderStatus } from '../hooks/useOrders';

const when = (d?: string) => (d ? formatDate(d, 'd MMM, h:mm a') : undefined);

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="flex justify-between gap-4 py-2">
        <span className="text-sm text-ink-secondary flex-shrink-0">{label}</span>
        <span className="text-sm font-semibold text-ink text-right">{children}</span>
    </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section>
        <h3 className="text-[13px] font-semibold text-ink-muted mb-2">{title}</h3>
        {children}
    </section>
);

const Timeline: React.FC<{ order: ApiOrder }> = ({ order }) => {
    const steps = [
        { label: 'Order placed', at: order.createdAt },
        { label: order.driver ? `Assigned to ${order.driver}` : 'Rider assigned', at: order.assignedAt },
        { label: 'Picked up', at: order.pickedUpAt },
        { label: 'Delivered', at: order.deliveredAt },
    ];
    return (
        <ol className="space-y-3">
            {steps.map((s, i) => {
                const done = !!s.at;
                return (
                    <li key={s.label} className="flex gap-3">
                        <div className="flex flex-col items-center">
                            <span className={cn('size-3 rounded-full mt-1', done ? 'bg-primary' : 'border-2 border-line')} />
                            {i < steps.length - 1 && <span className={cn('w-px flex-1 mt-1', done ? 'bg-primary/40' : 'bg-line')} />}
                        </div>
                        <div className="pb-1">
                            <p className={cn('text-sm font-semibold', done ? 'text-ink' : 'text-ink-muted')}>{s.label}</p>
                            {done && <p className="text-[12px] text-ink-muted">{when(s.at)}</p>}
                        </div>
                    </li>
                );
            })}
            {order.status === 'cancelled' && (
                <li className="flex gap-3 items-center text-danger text-sm font-semibold">
                    <Icon name="cancel" filled className="text-[18px]" /> Cancelled
                </li>
            )}
        </ol>
    );
};

const AssignRider: React.FC<{ order: ApiOrder }> = ({ order }) => {
    // Only riders who are online and approved can take work
    const { data, isLoading } = useRiders({ status: 'active' });
    const { mutate: assign, isPending } = useAssignRider();
    const [riderId, setRiderId] = useState('');
    const riders = data?.data?.riders ?? [];

    useEffect(() => setRiderId(''), [order.id]);

    const closed = order.status === 'delivered' || order.status === 'cancelled';
    if (closed) return null;

    return (
        <Section title={order.driver ? 'Reassign rider' : 'Assign a rider'}>
            <div className="flex gap-2 items-end">
                <div className="flex-1">
                    <Select value={riderId} onChange={(e) => setRiderId(e.target.value)} disabled={isLoading} aria-label="Rider">
                        <option value="">{isLoading ? 'Loading riders…' : riders.length ? 'Choose an available rider' : 'No riders online'}</option>
                        {riders
                            .filter((r) => r.id !== order.driverId)
                            .map((r) => (
                                <option key={r.id} value={r.id}>
                                    {r.name} · {r.vehicleType}
                                    {r.riderType === 'premium' ? ' · Premium' : ''}
                                </option>
                            ))}
                    </Select>
                </div>
                <Button size="lg" disabled={!riderId} isLoading={isPending} onClick={() => assign({ orderId: order.id, riderId })}>
                    Assign
                </Button>
            </div>
        </Section>
    );
};

const ChangeStatus: React.FC<{ order: ApiOrder }> = ({ order }) => {
    const { mutate: updateStatus, isPending } = useUpdateOrderStatus();
    const [status, setStatus] = useState<OrderStatusValue>(order.status);
    useEffect(() => setStatus(order.status), [order.id, order.status]);

    return (
        <Section title="Status">
            <div className="flex gap-2 items-end">
                <div className="flex-1">
                    <Select value={status} onChange={(e) => setStatus(e.target.value as OrderStatusValue)} aria-label="Order status">
                        {Object.entries(ORDER_STATUS_STYLES).map(([value, s]) => (
                            <option key={value} value={value}>{s.label}</option>
                        ))}
                    </Select>
                </div>
                <Button
                    size="lg"
                    variant={status === 'cancelled' ? 'danger' : 'secondary'}
                    disabled={status === order.status}
                    isLoading={isPending}
                    onClick={() => updateStatus({ id: order.id, data: { status } })}
                >
                    Update
                </Button>
            </div>
        </Section>
    );
};

interface OrderDrawerProps {
    order: ApiOrder | null;
    onClose: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({ order, onClose }) => (
    <Modal
        isOpen={!!order}
        onClose={onClose}
        position="right"
        size="md"
        title={order?.trackingId}
        description={order && <StatusBadge status={order.status} className="mt-1" />}
        footer={
            order && (
                <Link
                    to={`/waybill/${order.id}`}
                    className="h-11 px-5 rounded-xl border border-line bg-surface-raised text-sm font-semibold text-ink inline-flex items-center gap-2 hover:bg-surface-sunken"
                >
                    <Icon name="print" className="text-[18px]" /> Print waybill
                </Link>
            )
        }
    >
        {order && (
            <div className="space-y-6">
                <AssignRider order={order} />
                <ChangeStatus order={order} />

                <Section title="Progress">
                    <Timeline order={order} />
                </Section>

                <Section title="Delivery">
                    <div className="divide-y divide-line">
                        <Row label="Recipient">{order.customerName}</Row>
                        <Row label="Phone">
                            <a href={`tel:${order.customerPhone}`} className="text-primary">{order.customerPhone}</a>
                        </Row>
                        <Row label="Drop-off">{order.deliveryLocation}</Row>
                        {order.landmark && <Row label="Landmark">{order.landmark}</Row>}
                        <Row label="Pickup">{order.pickupLocation}</Row>
                        <Row label="Pickup contact">
                            {order.pickupContact} · {order.pickupPhone}
                        </Row>
                    </div>
                </Section>

                <Section title="Package">
                    <div className="divide-y divide-line">
                        <Row label="Client">{order.businessClient ?? '—'}</Row>
                        <Row label="Contents">{order.description}</Row>
                        <Row label="Weight">{order.weight} kg</Row>
                        <Row label="Declared value">{formatCurrency(order.value ?? 0)}</Row>
                        <Row label="Delivery type">
                            <span className="capitalize">{order.deliveryType?.replace(/_/g, ' ')}</span>
                        </Row>
                        {order.specialInstructions && <Row label="Instructions">{order.specialInstructions}</Row>}
                    </div>
                </Section>

                <Section title="Fees">
                    <div className="divide-y divide-line">
                        <Row label="Delivery fee">{formatCurrency(order.deliveryFee ?? 0)}</Row>
                        <Row label="Admin fee">{formatCurrency(order.adminFee ?? 0)}</Row>
                        <Row label="Total">{formatCurrency(order.totalFee ?? 0)}</Row>
                    </div>
                </Section>
            </div>
        )}
    </Modal>
);
