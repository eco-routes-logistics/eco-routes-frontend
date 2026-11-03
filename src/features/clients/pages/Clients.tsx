import React, { useMemo, useState } from 'react';
import { Avatar } from '@/components/layout/AppShell';
import { Badge, Button, Card, FilterChips, Icon, PageHeader, SearchInput, SegmentedControl, Skeleton, StatusBadge, Table, Td, Th, Tr } from '@/components/ui';
import { EmptyState } from '@/components/common/EmptyState';
import { formatDate } from '@/utils/format';
import { Client } from '@/types/client';
import { useClients, useUpdateClient } from '../hooks/useClients';
import { ACCOUNT_TYPE_LABELS, AddClientModal, ClientDrawer } from '../components/ClientForms';

type Tab = 'approvals' | 'directory';
type DirectoryFilter = 'all' | 'active' | 'inactive';

const SignupCard: React.FC<{ client: Client }> = ({ client }) => {
    const { mutate: updateClient, isPending, variables } = useUpdateClient();
    const busy = isPending && variables?.id === client.id;
    return (
        <Card className="flex flex-col">
            <div className="flex items-start gap-3">
                <Avatar name={client.company} className="size-12 text-base flex-shrink-0 rounded-xl" />
                <div className="min-w-0 flex-1">
                    <p className="font-bold text-ink truncate">{client.company}</p>
                    <p className="text-sm text-ink-secondary truncate">{client.contactName}</p>
                    <p className="text-[12px] text-ink-muted mt-0.5">{client.createdAt ? `Signed up ${formatDate(client.createdAt, 'd MMM yyyy')}` : ''}</p>
                </div>
                <Badge tone={client.accountType === 'corporate' ? 'info' : 'neutral'}>{ACCOUNT_TYPE_LABELS[client.accountType ?? ''] ?? '—'}</Badge>
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-4 flex-1">
                {[
                    ['Email', client.email],
                    ['Phone', client.phone],
                    ['Registration no.', client.registrationNumber],
                    ['Monthly volume', client.estimatedMonthlyVolume],
                ].map(([k, v]) => (
                    <div key={k} className="min-w-0">
                        <dt className="text-[12px] text-ink-muted">{k}</dt>
                        <dd className="font-semibold text-ink truncate">{v || '—'}</dd>
                    </div>
                ))}
            </dl>

            <div className="flex gap-3 mt-5 pt-4 border-t border-line">
                <Button
                    variant="secondary"
                    className="flex-1"
                    disabled={busy}
                    onClick={() => updateClient({ id: client.id, data: { status: 'inactive' } })}
                >
                    Decline
                </Button>
                <Button className="flex-1" isLoading={busy} onClick={() => updateClient({ id: client.id, data: { status: 'active' } })}>
                    Approve
                </Button>
            </div>
        </Card>
    );
};

const Clients: React.FC = () => {
    const { data, isLoading } = useClients({ limit: 100 });
    const clients = data?.data?.clients ?? [];
    const pending = useMemo(() => clients.filter((c) => c.status === 'pending'), [clients]);

    const [tab, setTab] = useState<Tab | null>(null);
    const [filter, setFilter] = useState<DirectoryFilter>('all');
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [adding, setAdding] = useState(false);

    const activeTab: Tab = tab ?? (pending.length > 0 ? 'approvals' : 'directory');

    const directory = useMemo(() => {
        const q = search.trim().toLowerCase();
        return clients
            .filter((c) => c.status !== 'pending')
            .filter((c) => filter === 'all' || c.status === filter)
            .filter((c) => !q || [c.company, c.contactName, c.email, c.phone].some((v) => v?.toLowerCase().includes(q)));
    }, [clients, filter, search]);

    const selected = clients.find((c) => c.id === selectedId) ?? null;

    return (
        <>
            <PageHeader
                title="Clients"
                description="Approve business sign-ups and manage client accounts."
                actions={
                    <Button onClick={() => setAdding(true)} leftIcon={<Icon name="add" className="text-[20px]" />}>
                        Add client
                    </Button>
                }
            />

            <SegmentedControl<Tab>
                ariaLabel="Clients view"
                className="mb-5 max-w-sm"
                value={activeTab}
                onChange={setTab}
                segments={[
                    { value: 'approvals', label: 'Approvals', count: pending.length },
                    { value: 'directory', label: 'Directory' },
                ]}
            />

            {isLoading ? (
                <Skeleton className="h-96" />
            ) : activeTab === 'approvals' ? (
                pending.length === 0 ? (
                    <EmptyState icon="verified" title="All caught up" description="New business sign-ups will appear here for review." />
                ) : (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {pending.map((c) => (
                            <SignupCard key={c.id} client={c} />
                        ))}
                    </div>
                )
            ) : (
                <>
                    <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:items-center">
                        <FilterChips<DirectoryFilter>
                            ariaLabel="Filter clients"
                            value={filter}
                            onChange={setFilter}
                            options={[
                                { value: 'all', label: 'All' },
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                            ]}
                        />
                        <SearchInput value={search} onChange={setSearch} placeholder="Search by company, contact or email" className="sm:max-w-md flex-1" />
                    </div>
                    {directory.length === 0 ? (
                        <EmptyState icon="storefront" title="No clients match" description="Try another filter or search." />
                    ) : (
                        <Table>
                            <thead>
                                <tr>
                                    <Th>Company</Th>
                                    <Th>Contact</Th>
                                    <Th>Account</Th>
                                    <Th align="right">Orders</Th>
                                    <Th>Status</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {directory.map((c) => (
                                    <Tr key={c.id} onClick={() => setSelectedId(c.id)}>
                                        <Td>
                                            <div className="flex items-center gap-3">
                                                <Avatar name={c.company} className="size-9 text-[13px] flex-shrink-0 rounded-lg" />
                                                <p className="font-semibold whitespace-nowrap">{c.company}</p>
                                            </div>
                                        </Td>
                                        <Td>
                                            <p className="whitespace-nowrap">{c.contactName}</p>
                                            <p className="text-[12px] text-ink-muted">{c.email}</p>
                                        </Td>
                                        <Td className="text-ink-secondary whitespace-nowrap">{ACCOUNT_TYPE_LABELS[c.accountType ?? ''] ?? '—'}</Td>
                                        <Td align="right">{c.totalOrders ?? 0}</Td>
                                        <Td>
                                            <StatusBadge status={c.status} kind="client" />
                                        </Td>
                                    </Tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </>
            )}

            <ClientDrawer client={selected} onClose={() => setSelectedId(null)} />
            <AddClientModal isOpen={adding} onClose={() => setAdding(false)} />
        </>
    );
};

export default Clients;
