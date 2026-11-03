import React, { useMemo, useState } from 'react';
import { Button, Card, Icon, Input, Pagination, SectionTitle, Skeleton } from '@/components/ui';
import { EmptyState } from '@/components/common/EmptyState';
import { cn } from '@/utils/cn';
import { formatCurrency, formatDate } from '@/utils/format';
import { useClientMe, useClientPortalOrders, useClientWallet, useFundWallet, useWalletTransactions } from '../hooks/useClientAuth';
import { toStatusKey } from '../utils/clientOrders';

const QUICK_AMOUNTS = [5000, 10000, 20000, 50000];
const PAGE_SIZE = 20;

const TopUp: React.FC = () => {
    const [amount, setAmount] = useState('');
    const [notice, setNotice] = useState<string | null>(null);
    const { mutate: fund, isPending } = useFundWallet();
    const value = Number(amount);

    const start = () => {
        setNotice(null);
        fund(value, {
            onSuccess: (res) => {
                const url = res.data?.authorizationUrl;
                // Without PAYSTACK_SECRET_KEY the backend returns a placeholder link that leads nowhere
                if (url && /paystack/i.test(url)) {
                    window.location.href = url;
                } else {
                    setNotice("Online card payments aren't switched on yet. Please contact EcoRoutes to fund your wallet.");
                }
            },
        });
    };

    return (
        <Card>
            <h2 className="text-[15px] font-bold text-ink mb-3">Top up</h2>
            <div className="grid grid-cols-4 gap-2 mb-4">
                {QUICK_AMOUNTS.map((a) => (
                    <button
                        key={a}
                        type="button"
                        onClick={() => setAmount(String(a))}
                        className={cn(
                            'h-11 rounded-xl border text-sm font-semibold transition-colors',
                            value === a ? 'border-primary bg-primary-subtle text-primary' : 'border-line text-ink hover:bg-surface-sunken'
                        )}
                    >
                        ₦{a / 1000}k
                    </button>
                ))}
            </div>
            <Input label="Amount (₦)" type="number" inputMode="numeric" min={100} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Or enter an amount" />
            {notice && <p role="status" className="mt-3 p-3 rounded-xl bg-info-subtle text-info text-sm font-medium">{notice}</p>}
            <Button size="lg" fullWidth className="mt-4" disabled={!(value >= 100)} isLoading={isPending} onClick={start}>
                {value >= 100 ? `Pay ${formatCurrency(value)}` : 'Continue to payment'}
            </Button>
            <p className="text-[12px] text-ink-muted mt-2 text-center">Secure payment by Paystack. Your balance updates once payment is confirmed.</p>
        </Card>
    );
};

const WalletView: React.FC = () => {
    const [page, setPage] = useState(1);
    const { data: walletData, isLoading } = useClientWallet();
    const { data: txData, isLoading: loadingTx } = useWalletTransactions({ page, limit: PAGE_SIZE });
    const balance = walletData?.data?.wallet?.balance ?? 0;
    const transactions = txData?.data?.transactions ?? [];
    const total = txData?.data?.pagination?.total ?? 0;

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4 items-start">
                <Card className="bg-primary border-transparent text-white">
                    <p className="text-sm font-medium text-white/80">Wallet balance</p>
                    {isLoading ? <Skeleton className="h-10 w-40 mt-1 bg-white/20" /> : <p className="text-4xl font-bold mt-1">{formatCurrency(balance)}</p>}
                    <p className="text-sm text-white/80 mt-3">Each delivery is paid from this balance when you book it.</p>
                </Card>
                <TopUp />
            </div>

            <section>
                <SectionTitle>History</SectionTitle>
                {loadingTx ? (
                    <Skeleton className="h-60" />
                ) : transactions.length === 0 ? (
                    <Card>
                        <EmptyState icon="receipt_long" title="No transactions yet" description="Top-ups and delivery payments will appear here." className="py-6" />
                    </Card>
                ) : (
                    <>
                        <Card padding="none" className="divide-y divide-line">
                            {transactions.map((t) => {
                                const credit = t.type === 'credit';
                                return (
                                    <div key={t.id} className="px-4 py-3.5 flex items-center gap-3">
                                        <span className={cn('size-10 rounded-xl flex items-center justify-center flex-shrink-0', credit ? 'bg-success-subtle text-success' : 'bg-surface-sunken text-ink-secondary')}>
                                            <Icon name={credit ? 'south_west' : 'north_east'} className="text-[20px]" />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[15px] font-semibold text-ink truncate">{t.description}</p>
                                            <p className="text-[12px] text-ink-muted">{formatDate(t.createdAt, 'd MMM yyyy, h:mm a')}</p>
                                        </div>
                                        <p className={cn('text-[15px] font-bold whitespace-nowrap', credit ? 'text-success' : 'text-ink')}>
                                            {credit ? '+' : '−'}
                                            {formatCurrency(t.amount)}
                                        </p>
                                    </div>
                                );
                            })}
                        </Card>
                        <Pagination page={page} totalPages={Math.ceil(total / PAGE_SIZE)} total={total} onChange={setPage} />
                    </>
                )}
            </section>
        </div>
    );
};

const CorporateBilling: React.FC = () => {
    const { data, isLoading } = useClientPortalOrders({ limit: 100 });
    const orders = data?.data?.orders ?? [];

    const { count, spend } = useMemo(() => {
        const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const billable = orders.filter((o) => new Date(o.createdAt) >= monthStart && toStatusKey(o.status) !== 'cancelled');
        return { count: billable.length, spend: billable.reduce((s, o) => s + (o.totalFee ?? 0), 0) };
    }, [orders]);

    return (
        <div className="grid md:grid-cols-2 gap-4 items-start">
            <Card className="bg-primary border-transparent text-white">
                <p className="text-sm font-medium text-white/80">Spent in {formatDate(new Date(), 'MMMM')}</p>
                {isLoading ? <Skeleton className="h-10 w-40 mt-1 bg-white/20" /> : <p className="text-4xl font-bold mt-1">{formatCurrency(spend)}</p>}
                <p className="text-sm text-white/80 mt-3">{count} deliver{count === 1 ? 'y' : 'ies'} so far this month</p>
            </Card>
            <Card>
                <div className="flex gap-3">
                    <Icon name="receipt_long" className="text-primary text-[24px] flex-shrink-0" />
                    <div>
                        <p className="text-[15px] font-bold text-ink">Corporate billing</p>
                        <p className="text-sm text-ink-secondary mt-1">
                            Your account is billed by the EcoRoutes team rather than from a wallet. This total updates as you book, and cancelled orders aren't counted.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

const ClientPayments: React.FC = () => {
    const { data, isLoading } = useClientMe();
    if (isLoading) return <Skeleton className="h-60" />;
    return data?.data?.client?.accountType === 'corporate' ? <CorporateBilling /> : <WalletView />;
};

export default ClientPayments;
