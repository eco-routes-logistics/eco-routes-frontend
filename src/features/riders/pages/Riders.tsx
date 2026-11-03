import React, { useMemo, useState } from 'react';
import { Avatar } from '@/components/layout/AppShell';
import { Badge, Button, Card, FilterChips, Icon, PageHeader, SearchInput, SegmentedControl, Skeleton, StatusBadge, Table, Td, Th, Tr } from '@/components/ui';
import { EmptyState } from '@/components/common/EmptyState';
import { formatDate } from '@/utils/format';
import { ApiRider } from '../api/riders';
import { useApproveRider, useRiders } from '../hooks/useRiders';
import { AddRiderModal, ID_TYPE_LABELS, RejectRiderModal, RiderDrawer } from '../components/RiderForms';

type Tab = 'approvals' | 'roster';
type RosterFilter = 'all' | 'active' | 'busy' | 'inactive' | 'rejected';

const DocThumb: React.FC<{ url?: string; label: string }> = ({ url, label }) =>
    url ? (
        <a href={url} target="_blank" rel="noreferrer" className="group block">
            <img src={url} alt={label} className="h-24 w-full object-cover rounded-xl border border-line group-hover:opacity-90" />
            <span className="text-[12px] text-ink-muted inline-flex items-center gap-1 mt-1">
                {label} <Icon name="open_in_new" className="text-[13px]" />
            </span>
        </a>
    ) : (
        <div>
            <div className="h-24 rounded-xl border border-dashed border-line flex items-center justify-center text-[12px] text-ink-muted">Not provided</div>
            <span className="text-[12px] text-ink-muted mt-1 block">{label}</span>
        </div>
    );

const ApplicationCard: React.FC<{ rider: ApiRider; onReject: () => void }> = ({ rider, onReject }) => {
    const { mutate: approve, isPending, variables } = useApproveRider();
    return (
        <Card className="flex flex-col">
            <div className="flex items-start gap-3">
                <Avatar name={rider.name} url={rider.passportPhotoUrl} className="size-12 text-base flex-shrink-0" />
                <div className="min-w-0 flex-1">
                    <p className="font-bold text-ink truncate">{rider.name}</p>
                    <p className="text-sm text-ink-secondary truncate">{rider.phone}{rider.email && ` · ${rider.email}`}</p>
                    <p className="text-[12px] text-ink-muted mt-0.5">Applied {formatDate(rider.createdAt, 'd MMM yyyy')}</p>
                </div>
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-4">
                <div>
                    <dt className="text-[12px] text-ink-muted">Vehicle</dt>
                    <dd className="font-semibold text-ink">{rider.vehicleType} · {rider.vehicleNumber}</dd>
                </div>
                <div>
                    <dt className="text-[12px] text-ink-muted">ID type</dt>
                    <dd className="font-semibold text-ink">{rider.idType ? ID_TYPE_LABELS[rider.idType] ?? rider.idType : '—'}</dd>
                </div>
                <div>
                    <dt className="text-[12px] text-ink-muted">NIN</dt>
                    <dd className="font-semibold text-ink">{rider.nin ?? '—'}</dd>
                </div>
            </dl>

            <div className="grid grid-cols-2 gap-3 mt-4">
                <DocThumb url={rider.idDocumentUrl} label="ID document" />
                <DocThumb url={rider.passportPhotoUrl} label="Photo" />
            </div>

            <div className="flex gap-3 mt-5 pt-4 border-t border-line">
                <Button variant="secondary" className="flex-1" onClick={onReject} disabled={isPending}>
                    Reject
                </Button>
                <Button className="flex-1" onClick={() => approve(rider.id)} isLoading={isPending && variables === rider.id}>
                    Approve
                </Button>
            </div>
        </Card>
    );
};

const Riders: React.FC = () => {
    const { data, isLoading } = useRiders();
    const riders = data?.data?.riders ?? [];
    const pending = useMemo(() => riders.filter((r) => r.status === 'pending'), [riders]);

    const [tab, setTab] = useState<Tab | null>(null);
    const [filter, setFilter] = useState<RosterFilter>('all');
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [rejecting, setRejecting] = useState<ApiRider | null>(null);
    const [adding, setAdding] = useState(false);

    // Open on the approvals queue when there's something to review, until the user picks a tab
    const activeTab: Tab = tab ?? (pending.length > 0 ? 'approvals' : 'roster');

    const roster = useMemo(() => {
        const q = search.trim().toLowerCase();
        return riders
            .filter((r) => r.status !== 'pending')
            .filter((r) => filter === 'all' || r.status === filter)
            .filter((r) => !q || [r.name, r.phone, r.email, r.vehicleNumber].some((v) => v?.toLowerCase().includes(q)));
    }, [riders, filter, search]);

    const selected = riders.find((r) => r.id === selectedId) ?? null;

    return (
        <>
            <PageHeader
                title="Riders"
                description="Review new applications and manage your fleet."
                actions={
                    <Button onClick={() => setAdding(true)} leftIcon={<Icon name="add" className="text-[20px]" />}>
                        Add rider
                    </Button>
                }
            />

            <SegmentedControl<Tab>
                ariaLabel="Riders view"
                className="mb-5 max-w-sm"
                value={activeTab}
                onChange={setTab}
                segments={[
                    { value: 'approvals', label: 'Approvals', count: pending.length },
                    { value: 'roster', label: 'Roster' },
                ]}
            />

            {isLoading ? (
                <Skeleton className="h-96" />
            ) : activeTab === 'approvals' ? (
                pending.length === 0 ? (
                    <EmptyState icon="verified" title="All caught up" description="New rider applications will appear here for review." />
                ) : (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {pending.map((r) => (
                            <ApplicationCard key={r.id} rider={r} onReject={() => setRejecting(r)} />
                        ))}
                    </div>
                )
            ) : (
                <>
                    <div className="space-y-3 mb-4">
                        <FilterChips<RosterFilter>
                            ariaLabel="Filter riders"
                            value={filter}
                            onChange={setFilter}
                            options={[
                                { value: 'all', label: 'All' },
                                { value: 'active', label: 'Online' },
                                { value: 'busy', label: 'On a job' },
                                { value: 'inactive', label: 'Offline' },
                                { value: 'rejected', label: 'Rejected' },
                            ]}
                        />
                        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, phone or plate" className="max-w-md" />
                    </div>
                    {roster.length === 0 ? (
                        <EmptyState icon="two_wheeler" title="No riders match" description="Try another filter or search." />
                    ) : (
                        <Table>
                            <thead>
                                <tr>
                                    <Th>Rider</Th>
                                    <Th>Vehicle</Th>
                                    <Th>Type</Th>
                                    <Th align="right">Deliveries</Th>
                                    <Th align="right">Rating</Th>
                                    <Th>Status</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {roster.map((r) => (
                                    <Tr key={r.id} onClick={() => setSelectedId(r.id)}>
                                        <Td>
                                            <div className="flex items-center gap-3">
                                                <Avatar name={r.name} url={r.passportPhotoUrl} className="size-9 text-[13px] flex-shrink-0" />
                                                <div className="min-w-0">
                                                    <p className="font-semibold whitespace-nowrap">{r.name}</p>
                                                    <p className="text-[12px] text-ink-muted">{r.phone}</p>
                                                </div>
                                            </div>
                                        </Td>
                                        <Td className="text-ink-secondary whitespace-nowrap">{r.vehicleType} · {r.vehicleNumber}</Td>
                                        <Td>{r.riderType === 'premium' ? <Badge tone="primary">Premium</Badge> : <span className="text-ink-secondary">Standard</span>}</Td>
                                        <Td align="right">{r.totalDeliveries ?? 0}</Td>
                                        <Td align="right">{(r.rating ?? 0).toFixed(1)}</Td>
                                        <Td>
                                            <StatusBadge status={r.status} kind="rider" dot />
                                        </Td>
                                    </Tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </>
            )}

            <RiderDrawer rider={selected} onClose={() => setSelectedId(null)} />
            <RejectRiderModal rider={rejecting} onClose={() => setRejecting(null)} />
            <AddRiderModal isOpen={adding} onClose={() => setAdding(false)} />
        </>
    );
};

export default Riders;
