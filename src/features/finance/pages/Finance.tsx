import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, FilterChips, Modal, Pagination, PageHeader, SectionTitle, SegmentedControl, Skeleton, StatusBadge, Table, Td, Textarea, Th, Tr } from '@/components/ui';
import { EmptyState } from '@/components/common/EmptyState';
import { formatCurrency, formatDate } from '@/utils/format';
import { Transaction } from '../api/finance';
import { useDisputeTransaction, useProcessTransaction, useRevenueStats, useTransactions } from '../hooks/useFinance';

type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';
type TxFilter = 'all' | 'Pending' | 'Processed' | 'Disputed';

// Ranges match finance.controller.ts getRevenueStats
const PERIOD_LABELS: Record<Period, string> = {
    daily: 'Last 30 days',
    weekly: 'Last 12 weeks',
    monthly: 'Last 12 months',
    yearly: 'Since 2 years ago',
};

const PAGE_SIZE = 20;

const DisputeModal: React.FC<{ tx: Transaction | null; onClose: () => void }> = ({ tx, onClose }) => {
    const [reason, setReason] = useState('');
    const { mutate: dispute, isPending } = useDisputeTransaction();
    useEffect(() => setReason(''), [tx?.id]);

    return (
        <Modal isOpen={!!tx} onClose={onClose} title="Flag as disputed" description={tx && `${tx.clientName} · ${formatCurrency(tx.totalFee)}`} size="sm">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (tx) dispute({ id: tx.id, reason: reason.trim() }, { onSuccess: onClose });
                }}
            >
                <Textarea label="What's wrong?" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Client says the parcel was never delivered" required />
                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="danger" disabled={!reason.trim()} isLoading={isPending}>Flag dispute</Button>
                </div>
            </form>
        </Modal>
    );
};

const Finance: React.FC = () => {
    const [period, setPeriod] = useState<Period>('monthly');
    const [filter, setFilter] = useState<TxFilter>('all');
    const [page, setPage] = useState(1);
    const [disputing, setDisputing] = useState<Transaction | null>(null);

    const { data: statsData, isLoading: loadingStats } = useRevenueStats({ period });
    const { data: txData, isLoading: loadingTx } = useTransactions({ status: filter === 'all' ? undefined : filter, page, limit: PAGE_SIZE });
    const { data: pendingData } = useTransactions({ status: 'Pending', limit: 1 });
    const { mutate: process, isPending: processing, variables: processingId } = useProcessTransaction();

    const stats = statsData?.data?.stats;
    const transactions = txData?.data?.transactions ?? [];
    const pagination = txData?.data?.pagination;
    const pendingCount = pendingData?.data?.pagination?.total;
    const totalPages = pagination ? pagination.totalPages ?? Math.ceil(pagination.total / PAGE_SIZE) : 1;

    const tiles = [
        { label: 'Total fees collected', value: stats?.totalRevenue },
        { label: 'Platform earnings', value: stats?.platformEarnings },
        { label: 'Rider payouts', value: stats?.riderPayouts },
        { label: 'Net profit', value: stats?.netProfit },
    ];

    return (
        <>
            <PageHeader title="Finance" description="Revenue, payouts and settlement of every delivery." />

            <section className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <SectionTitle className="mb-0">
                        Revenue <span className="text-sm font-medium text-ink-muted ml-1">{PERIOD_LABELS[period]}</span>
                    </SectionTitle>
                    <SegmentedControl<Period>
                        ariaLabel="Revenue period"
                        className="sm:w-80"
                        value={period}
                        onChange={setPeriod}
                        segments={[
                            { value: 'daily', label: 'Days' },
                            { value: 'weekly', label: 'Weeks' },
                            { value: 'monthly', label: 'Months' },
                            { value: 'yearly', label: 'Years' },
                        ]}
                    />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {tiles.map((t) => (
                        <Card key={t.label} padding="sm">
                            <p className="text-[13px] font-medium text-ink-secondary">{t.label}</p>
                            {loadingStats ? <Skeleton className="h-8 w-28 mt-1" /> : <p className="text-2xl font-bold text-ink mt-1">{formatCurrency(t.value ?? 0)}</p>}
                        </Card>
                    ))}
                </div>
                {stats && (
                    <p className="text-[13px] text-ink-muted mt-2">
                        Standard (fleet) {formatCurrency(stats.standardRevenue ?? 0)} · Premium (gig) {formatCurrency(stats.premiumRevenue ?? 0)}
                    </p>
                )}
            </section>

            <section>
                <SectionTitle>Transactions</SectionTitle>
                <FilterChips<TxFilter>
                    ariaLabel="Filter transactions"
                    className="mb-4"
                    value={filter}
                    onChange={(v) => {
                        setFilter(v);
                        setPage(1);
                    }}
                    options={[
                        { value: 'all', label: 'All' },
                        { value: 'Pending', label: 'To settle', count: pendingCount },
                        { value: 'Processed', label: 'Processed' },
                        { value: 'Disputed', label: 'Disputed' },
                    ]}
                />

                {loadingTx ? (
                    <Skeleton className="h-80" />
                ) : transactions.length === 0 ? (
                    <EmptyState icon="receipt_long" title="No transactions" description="A transaction is created for each completed delivery." />
                ) : (
                    <>
                        <Table>
                            <thead>
                                <tr>
                                    <Th>Date</Th>
                                    <Th>Client</Th>
                                    <Th>Rider</Th>
                                    <Th align="right">Total</Th>
                                    <Th align="right">Commission</Th>
                                    <Th align="right">Rider payout</Th>
                                    <Th>Status</Th>
                                    <Th />
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((t) => (
                                    <Tr key={t.id}>
                                        <Td className="whitespace-nowrap text-ink-secondary">{formatDate(t.date ?? t.createdAt, 'd MMM yyyy')}</Td>
                                        <Td className="whitespace-nowrap font-medium">{t.clientName || '—'}</Td>
                                        <Td className="whitespace-nowrap">
                                            {t.riderName ?? <span className="text-ink-muted">—</span>}
                                            {t.deliveryModel === 'Premium' && <Badge tone="primary" className="ml-2">Premium</Badge>}
                                        </Td>
                                        <Td align="right" className="font-semibold whitespace-nowrap">{formatCurrency(t.totalFee ?? 0)}</Td>
                                        <Td align="right" className="whitespace-nowrap">{formatCurrency(t.platformCommission ?? 0)}</Td>
                                        <Td align="right" className="whitespace-nowrap">{formatCurrency(t.riderPayout ?? 0)}</Td>
                                        <Td>
                                            <StatusBadge status={t.status} kind="transaction" />
                                        </Td>
                                        <Td align="right">
                                            {t.status === 'Pending' && (
                                                <div className="flex justify-end gap-2">
                                                    <Button size="sm" variant="ghost" onClick={() => setDisputing(t)}>Dispute</Button>
                                                    <Button size="sm" isLoading={processing && processingId === t.id} onClick={() => process(t.id)}>
                                                        Mark paid
                                                    </Button>
                                                </div>
                                            )}
                                        </Td>
                                    </Tr>
                                ))}
                            </tbody>
                        </Table>
                        <Pagination page={page} totalPages={totalPages} total={pagination?.total} onChange={setPage} />
                    </>
                )}
            </section>

            <DisputeModal tx={disputing} onClose={() => setDisputing(null)} />
        </>
    );
};

export default Finance;
