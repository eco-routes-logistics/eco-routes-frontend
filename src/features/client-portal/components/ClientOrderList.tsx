import React from 'react';
import { Card, Icon, StatusBadge } from '@/components/ui';
import { formatCurrency, formatDate } from '@/utils/format';
import { ClientOrder } from '../api/clientAuth';
import { DELIVERY_TYPE_LABELS, toStatusKey } from '../utils/clientOrders';

/** Card list of a client's orders; works at phone width without horizontal scrolling. */
export const ClientOrderList: React.FC<{ orders: ClientOrder[] }> = ({ orders }) => (
    <Card padding="none" className="divide-y divide-line">
        {orders.map((o) => (
            <div key={o.id} className="px-4 py-4 flex items-start gap-3">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-[15px] font-semibold text-ink">{o.customerName}</p>
                        <StatusBadge status={toStatusKey(o.status)} />
                    </div>
                    <p className="text-[13px] text-ink-muted mt-0.5">
                        {o.trackingId} · {formatDate(o.createdAt, 'd MMM, h:mm a')} · {DELIVERY_TYPE_LABELS[o.deliveryType] ?? o.deliveryType}
                    </p>
                    {o.driver && (
                        <p className="text-[13px] text-ink-secondary mt-1 inline-flex items-center gap-1">
                            <Icon name="two_wheeler" className="text-[16px]" /> {o.driver}
                        </p>
                    )}
                </div>
                <p className="text-[15px] font-bold text-ink whitespace-nowrap">{formatCurrency(o.totalFee ?? 0)}</p>
            </div>
        ))}
    </Card>
);
