import React, { useEffect, useState } from 'react';
import { Button, Icon, Input, Modal, Select, StatusBadge } from '@/components/ui';
import { formatCurrency, formatDate } from '@/utils/format';
import { Client } from '@/types/client';
import { useClientOrders, useCreateClient, useDeleteClient, useUpdateClient } from '../hooks/useClients';

export const ACCOUNT_TYPE_LABELS: Record<string, string> = {
    pay_as_you_go: 'Pay as you go',
    corporate: 'Corporate',
};

type ClientInput = Pick<Client, 'company' | 'contactName' | 'email' | 'phone' | 'address' | 'accountType'>;

const EMPTY: ClientInput = { company: '', contactName: '', email: '', phone: '', address: '', accountType: 'pay_as_you_go' };

const ClientFields: React.FC<{ value: ClientInput; onChange: (v: ClientInput) => void }> = ({ value, onChange }) => {
    const set = (k: keyof ClientInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange({ ...value, [k]: e.target.value });
    return (
        <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Company" value={value.company} onChange={set('company')} required />
            <Input label="Contact name" value={value.contactName} onChange={set('contactName')} required />
            <Input label="Email" type="email" value={value.email} onChange={set('email')} required />
            <Input label="Phone" type="tel" value={value.phone} onChange={set('phone')} required />
            <Input label="Address" value={value.address ?? ''} onChange={set('address')} />
            <Select label="Account type" value={value.accountType} onChange={set('accountType')}>
                <option value="pay_as_you_go">Pay as you go</option>
                <option value="corporate">Corporate</option>
            </Select>
        </div>
    );
};

export const AddClientModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [form, setForm] = useState<ClientInput>(EMPTY);
    const { mutate: createClient, isPending } = useCreateClient();

    useEffect(() => {
        if (isOpen) setForm(EMPTY);
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add a client" description="Clients added here are active immediately." size="lg">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createClient(form, { onSuccess: onClose });
                }}
            >
                <ClientFields value={form} onChange={setForm} />
                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" isLoading={isPending}>Add client</Button>
                </div>
            </form>
        </Modal>
    );
};

export const ClientDrawer: React.FC<{ client: Client | null; onClose: () => void }> = ({ client, onClose }) => {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState<ClientInput>(EMPTY);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { mutate: updateClient, isPending: saving } = useUpdateClient();
    const { mutate: deleteClient, isPending: deleting } = useDeleteClient();
    const { data: ordersData, isLoading: loadingOrders } = useClientOrders(client?.id ?? '');
    const orders = ordersData?.data?.orders ?? [];

    useEffect(() => {
        setEditing(false);
        setConfirmDelete(false);
        if (client) {
            setForm({
                company: client.company,
                contactName: client.contactName,
                email: client.email,
                phone: client.phone,
                address: client.address ?? '',
                accountType: client.accountType ?? 'pay_as_you_go',
            });
        }
    }, [client?.id]);

    if (!client) return <Modal isOpen={false} onClose={onClose}>{null}</Modal>;

    const spend = orders.reduce((sum, o) => sum + (o.totalFee ?? 0), 0);

    return (
        <Modal
            isOpen
            onClose={onClose}
            position="right"
            title={client.company}
            description={
                <span className="inline-flex items-center gap-2 mt-1">
                    <StatusBadge status={client.status} kind="client" />
                    <span>{ACCOUNT_TYPE_LABELS[client.accountType ?? ''] ?? ''}</span>
                </span>
            }
            footer={
                confirmDelete ? (
                    <>
                        <span className="text-sm text-ink-secondary mr-auto self-center">Delete this client permanently?</span>
                        <Button variant="secondary" onClick={() => setConfirmDelete(false)}>Keep</Button>
                        <Button variant="danger" isLoading={deleting} onClick={() => deleteClient(client.id, { onSuccess: onClose })}>Delete</Button>
                    </>
                ) : (
                    <>
                        <Button variant="ghost" className="mr-auto text-danger" onClick={() => setConfirmDelete(true)}>Delete</Button>
                        {client.status === 'active' ? (
                            <Button variant="secondary" isLoading={saving} onClick={() => updateClient({ id: client.id, data: { status: 'inactive' } })}>Suspend</Button>
                        ) : (
                            <Button isLoading={saving} onClick={() => updateClient({ id: client.id, data: { status: 'active' } })}>Activate</Button>
                        )}
                    </>
                )
            }
        >
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-surface-sunken p-3">
                        <p className="text-[12px] text-ink-muted">Orders</p>
                        <p className="text-lg font-bold text-ink">{orders.length}</p>
                    </div>
                    <div className="rounded-xl bg-surface-sunken p-3">
                        <p className="text-[12px] text-ink-muted">Total spend</p>
                        <p className="text-lg font-bold text-ink">{formatCurrency(spend)}</p>
                    </div>
                </div>

                <section>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-[13px] font-semibold text-ink-muted">Details</h3>
                        {!editing && (
                            <Button variant="ghost" size="sm" onClick={() => setEditing(true)} leftIcon={<Icon name="edit" className="text-[16px]" />}>
                                Edit
                            </Button>
                        )}
                    </div>
                    {editing ? (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                updateClient({ id: client.id, data: form }, { onSuccess: () => setEditing(false) });
                            }}
                        >
                            <ClientFields value={form} onChange={setForm} />
                            <div className="flex justify-end gap-3 mt-4">
                                <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
                                <Button type="submit" isLoading={saving}>Save</Button>
                            </div>
                        </form>
                    ) : (
                        <dl className="divide-y divide-line text-sm">
                            {[
                                ['Contact', client.contactName],
                                ['Email', client.email],
                                ['Phone', client.phone],
                                ['Address', client.address],
                                ['Registration no.', client.registrationNumber],
                                ['Monthly volume', client.estimatedMonthlyVolume],
                                ['Joined', client.createdAt ? formatDate(client.createdAt) : undefined],
                            ].map(([k, v]) => (
                                <div key={k} className="flex justify-between gap-4 py-2">
                                    <dt className="text-ink-secondary">{k}</dt>
                                    <dd className="font-semibold text-ink text-right">{v || '—'}</dd>
                                </div>
                            ))}
                        </dl>
                    )}
                </section>

                <section>
                    <h3 className="text-[13px] font-semibold text-ink-muted mb-2">Recent orders</h3>
                    {loadingOrders ? (
                        <p className="text-sm text-ink-muted">Loading…</p>
                    ) : orders.length === 0 ? (
                        <p className="text-sm text-ink-muted">No orders yet.</p>
                    ) : (
                        <ul className="divide-y divide-line">
                            {orders.slice(0, 8).map((o) => (
                                <li key={o.id} className="py-2.5 flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-ink">{o.trackingId}</p>
                                        <p className="text-[12px] text-ink-muted truncate">{o.customerName} · {formatDate(o.createdAt, 'd MMM')}</p>
                                    </div>
                                    <StatusBadge status={o.status} />
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </Modal>
    );
};
