import React, { useEffect, useState } from 'react';
import { Avatar } from '@/components/layout/AppShell';
import { Button, Icon, Input, Modal, Select, StatusBadge, Textarea } from '@/components/ui';
import { formatDate } from '@/utils/format';
import { ApiRider, RiderInput } from '../api/riders';
import { useCreateRider, useDeleteRider, useRejectRider, useRiderOrders, useUpdateRider } from '../hooks/useRiders';

export const VEHICLE_TYPES = ['Motorcycle', 'Bicycle', 'Car', 'Van', 'Truck'];

export const ID_TYPE_LABELS: Record<string, string> = {
    nin_card: 'NIN card',
    drivers_license: "Driver's licence",
    voters_card: "Voter's card",
    international_passport: 'International passport',
};

const EMPTY: RiderInput = { firstName: '', lastName: '', phone: '', email: '', vehicleType: 'Motorcycle', vehicleNumber: '' };

/** Shared name/contact/vehicle fields for the add and edit forms. */
const RiderFields: React.FC<{ value: RiderInput; onChange: (v: RiderInput) => void }> = ({ value, onChange }) => {
    const set = (k: keyof RiderInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange({ ...value, [k]: e.target.value });
    const vehicles = VEHICLE_TYPES.includes(value.vehicleType) ? VEHICLE_TYPES : [value.vehicleType, ...VEHICLE_TYPES];
    return (
        <div className="grid sm:grid-cols-2 gap-4">
            <Input label="First name" value={value.firstName} onChange={set('firstName')} required />
            <Input label="Last name" value={value.lastName} onChange={set('lastName')} required />
            <Input label="Phone" type="tel" value={value.phone} onChange={set('phone')} required />
            <Input label="Email" type="email" value={value.email ?? ''} onChange={set('email')} />
            <Select label="Vehicle" value={value.vehicleType} onChange={set('vehicleType')}>
                {vehicles.map((v) => (
                    <option key={v} value={v}>{v}</option>
                ))}
            </Select>
            <Input label="Plate number" value={value.vehicleNumber} onChange={set('vehicleNumber')} required />
        </div>
    );
};

export const AddRiderModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [form, setForm] = useState<RiderInput>(EMPTY);
    const { mutate: createRider, isPending } = useCreateRider();

    useEffect(() => {
        if (isOpen) setForm(EMPTY);
    }, [isOpen]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        createRider({ ...form, email: form.email || undefined }, { onSuccess: onClose });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add a rider"
            description="Riders added here skip the application review and can start right away."
            size="lg"
        >
            <form id="add-rider" onSubmit={submit}>
                <RiderFields value={form} onChange={setForm} />
                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" isLoading={isPending}>Add rider</Button>
                </div>
            </form>
        </Modal>
    );
};

export const RejectRiderModal: React.FC<{ rider: ApiRider | null; onClose: () => void }> = ({ rider, onClose }) => {
    const [reason, setReason] = useState('');
    const { mutate: reject, isPending } = useRejectRider();

    useEffect(() => setReason(''), [rider?.id]);

    return (
        <Modal
            isOpen={!!rider}
            onClose={onClose}
            title={`Reject ${rider?.name ?? 'application'}?`}
            description="The rider sees this reason when they try to sign in."
            size="sm"
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (rider) reject({ id: rider.id, reason: reason.trim() }, { onSuccess: onClose });
                }}
            >
                <Textarea label="Reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. ID photo is unreadable, please re-apply" required />
                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="danger" disabled={!reason.trim()} isLoading={isPending}>Reject</Button>
                </div>
            </form>
        </Modal>
    );
};

const toInput = (r: ApiRider): RiderInput => ({
    firstName: r.firstName,
    lastName: r.lastName,
    phone: r.phone,
    email: r.email ?? '',
    vehicleType: r.vehicleType,
    vehicleNumber: r.vehicleNumber,
});

export const RiderDrawer: React.FC<{ rider: ApiRider | null; onClose: () => void }> = ({ rider, onClose }) => {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState<RiderInput>(EMPTY);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { mutate: updateRider, isPending: saving } = useUpdateRider();
    const { mutate: deleteRider, isPending: deleting } = useDeleteRider();
    const { data: ordersData, isLoading: loadingOrders } = useRiderOrders(rider?.id ?? '');
    const orders = ordersData?.data?.orders ?? [];

    useEffect(() => {
        setEditing(false);
        setConfirmDelete(false);
        if (rider) setForm(toInput(rider));
    }, [rider?.id]);

    if (!rider) return <Modal isOpen={false} onClose={onClose}>{null}</Modal>;

    const deactivatable = rider.status === 'active' || rider.status === 'busy';

    return (
        <Modal
            isOpen
            onClose={onClose}
            position="right"
            title={rider.name}
            description={<StatusBadge status={rider.status} kind="rider" dot className="mt-1" />}
            footer={
                confirmDelete ? (
                    <>
                        <span className="text-sm text-ink-secondary mr-auto self-center">Delete this rider permanently?</span>
                        <Button variant="secondary" onClick={() => setConfirmDelete(false)}>Keep</Button>
                        <Button variant="danger" isLoading={deleting} onClick={() => deleteRider(rider.id, { onSuccess: onClose })}>Delete</Button>
                    </>
                ) : (
                    <>
                        <Button variant="ghost" className="mr-auto text-danger" onClick={() => setConfirmDelete(true)}>Delete</Button>
                        {deactivatable && (
                            <Button variant="secondary" isLoading={saving} onClick={() => updateRider({ id: rider.id, data: { status: 'inactive' } })}>
                                Deactivate
                            </Button>
                        )}
                        {rider.status === 'inactive' && (
                            <Button isLoading={saving} onClick={() => updateRider({ id: rider.id, data: { status: 'active' } })}>Reactivate</Button>
                        )}
                    </>
                )
            }
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Avatar name={rider.name} url={rider.passportPhotoUrl} className="size-16 text-xl" />
                    <div className="grid grid-cols-3 gap-4 flex-1 text-center">
                        <div>
                            <p className="text-lg font-bold text-ink">{rider.totalDeliveries ?? 0}</p>
                            <p className="text-[12px] text-ink-muted">Deliveries</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-ink">{(rider.rating ?? 0).toFixed(1)}</p>
                            <p className="text-[12px] text-ink-muted">Rating</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-ink">{rider.currentOrders ?? 0}</p>
                            <p className="text-[12px] text-ink-muted">Active</p>
                        </div>
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
                                updateRider({ id: rider.id, data: { ...form, email: form.email || undefined } }, { onSuccess: () => setEditing(false) });
                            }}
                        >
                            <RiderFields value={form} onChange={setForm} />
                            <div className="flex justify-end gap-3 mt-4">
                                <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
                                <Button type="submit" isLoading={saving}>Save</Button>
                            </div>
                        </form>
                    ) : (
                        <dl className="divide-y divide-line text-sm">
                            {[
                                ['Phone', rider.phone],
                                ['Email', rider.email],
                                ['Vehicle', `${rider.vehicleType} · ${rider.vehicleNumber}`],
                                ['Type', rider.riderType === 'premium' ? 'Premium (gig)' : 'Standard (fleet)'],
                                ['ID', rider.idType ? ID_TYPE_LABELS[rider.idType] ?? rider.idType : undefined],
                                ['Joined', rider.createdAt ? formatDate(rider.createdAt) : undefined],
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
                                        <p className="text-[12px] text-ink-muted truncate">{o.deliveryLocation}</p>
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
