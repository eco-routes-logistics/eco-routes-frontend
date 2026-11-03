import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@/components/layout/AppShell';
import { Card, Icon, SectionTitle, Skeleton, StatusBadge } from '@/components/ui';
import { cn } from '@/utils/cn';
import { useUIStore } from '@/stores/uiStore';
import { useClientAuthStore } from '@/stores/clientAuthStore';
import { ACCOUNT_TYPE_LABELS } from '@/features/clients/components/ClientForms';
import { useClientMe } from '../hooks/useClientAuth';

const ClientAccount: React.FC = () => {
    const { data, isLoading } = useClientMe();
    const logout = useClientAuthStore((s) => s.logout);
    const { theme, setTheme } = useUIStore();
    const navigate = useNavigate();
    const client = data?.data?.client;
    const isDark = theme === 'dark';

    if (isLoading || !client) return <Skeleton className="h-72" />;

    return (
        <div className="space-y-6">
            <Card className="flex items-center gap-4">
                <Avatar name={client.company} className="size-16 text-xl rounded-2xl flex-shrink-0" />
                <div className="min-w-0">
                    <p className="text-lg font-bold text-ink truncate">{client.company}</p>
                    <p className="text-sm text-ink-secondary">{ACCOUNT_TYPE_LABELS[client.accountType ?? ''] ?? ''}</p>
                    <StatusBadge status={client.status} kind="client" className="mt-2" />
                </div>
            </Card>

            <section>
                <SectionTitle>Company details</SectionTitle>
                <Card>
                    <dl className="divide-y divide-line -my-3 text-sm">
                        {[
                            ['Contact', client.contactName],
                            ['Email', client.email],
                            ['Phone', client.phone],
                            ['Address', client.address],
                        ].map(([k, v]) => (
                            <div key={k} className="flex justify-between gap-4 py-3">
                                <dt className="text-ink-secondary">{k}</dt>
                                <dd className="font-semibold text-ink text-right">{v || '—'}</dd>
                            </div>
                        ))}
                    </dl>
                </Card>
                <p className="text-[13px] text-ink-muted mt-2">To change these details, contact EcoRoutes support.</p>
            </section>

            <section>
                <SectionTitle>Settings</SectionTitle>
                <Card padding="none" className="divide-y divide-line">
                    <button
                        type="button"
                        role="switch"
                        aria-checked={isDark}
                        onClick={() => setTheme(isDark ? 'light' : 'dark')}
                        className="w-full flex items-center gap-3 px-4 h-14 text-left"
                    >
                        <Icon name="dark_mode" className="text-ink-secondary text-[22px]" />
                        <span className="flex-1 text-[15px] font-semibold text-ink">Dark mode</span>
                        <span className={cn('w-11 h-6 rounded-full p-0.5 transition-colors', isDark ? 'bg-primary' : 'bg-line')}>
                            <span className={cn('block size-5 rounded-full bg-white shadow transition-transform', isDark && 'translate-x-5')} />
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            logout();
                            navigate('/client/login');
                        }}
                        className="w-full flex items-center gap-3 px-4 h-14 text-left text-danger"
                    >
                        <Icon name="logout" className="text-[22px]" />
                        <span className="flex-1 text-[15px] font-semibold">Sign out</span>
                    </button>
                </Card>
            </section>
        </div>
    );
};

export default ClientAccount;
