import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@/components/layout/AppShell';
import { Button, Card, Icon, Input, Select, SectionTitle, Skeleton, StatusBadge } from '@/components/ui';
import { cn } from '@/utils/cn';
import { useRiderAuthStore } from '@/stores/riderAuthStore';
import { useUIStore } from '@/stores/uiStore';
import { useRiderMe, useUpdateRiderProfile } from '../hooks/useRiderAuth';

export const VEHICLE_OPTIONS = ['Motorcycle', 'Bicycle', 'Car', 'Van', 'Truck'];

const DetailRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
    <div className="flex items-center justify-between gap-4 py-3">
        <span className="text-sm text-ink-secondary">{label}</span>
        <span className="text-[15px] font-semibold text-ink text-right truncate">{value || '—'}</span>
    </div>
);

const RiderProfile: React.FC = () => {
    const logout = useRiderAuthStore((s) => s.logout);
    const { theme, setTheme } = useUIStore();
    const navigate = useNavigate();
    const { data: meData, isLoading } = useRiderMe();
    const { mutate: updateProfile, isPending: isSaving } = useUpdateRiderProfile();
    const rider = meData?.data?.rider;

    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', vehicleType: '' });

    if (isLoading || !rider) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-28" />
                <Skeleton className="h-20" />
                <Skeleton className="h-56" />
            </div>
        );
    }

    const startEditing = () => {
        setForm({ name: rider.name, phone: rider.phone, vehicleType: rider.vehicleType });
        setEditing(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(
            { name: form.name.trim(), phone: form.phone.trim(), vehicleType: form.vehicleType },
            { onSuccess: () => setEditing(false) }
        );
    };

    const handleSignOut = () => {
        logout();
        navigate('/rider/login');
    };

    const vehicleOptions = VEHICLE_OPTIONS.includes(rider.vehicleType) ? VEHICLE_OPTIONS : [rider.vehicleType, ...VEHICLE_OPTIONS];
    const isDark = theme === 'dark';

    return (
        <div className="space-y-6">
            {/* Identity */}
            <Card className="flex items-center gap-4">
                <Avatar name={rider.name} url={rider.passportPhotoUrl} className="size-16 text-xl flex-shrink-0" />
                <div className="min-w-0 flex-1">
                    <p className="text-lg font-bold text-ink truncate">{rider.name}</p>
                    <p className="text-sm text-ink-secondary truncate">{rider.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <StatusBadge status={rider.status} kind="rider" dot />
                        {rider.riderType === 'premium' && <span className="text-[12px] font-semibold text-primary">Premium rider</span>}
                    </div>
                </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Deliveries', value: rider.totalDeliveries ?? 0 },
                    { label: 'Rating', value: (rider.rating ?? 0).toFixed(1), icon: 'star' },
                    { label: 'Active', value: rider.currentOrders ?? 0 },
                ].map((s) => (
                    <Card key={s.label} padding="sm" className="text-center">
                        <p className="text-xl font-bold text-ink inline-flex items-center gap-1">
                            {s.value}
                            {s.icon && <Icon name={s.icon} filled className="text-warning text-[18px]" />}
                        </p>
                        <p className="text-[12px] font-medium text-ink-muted">{s.label}</p>
                    </Card>
                ))}
            </div>

            {/* Details */}
            <section>
                <SectionTitle
                    action={
                        !editing && (
                            <Button variant="ghost" size="sm" onClick={startEditing} leftIcon={<Icon name="edit" className="text-[16px]" />}>
                                Edit
                            </Button>
                        )
                    }
                >
                    Your details
                </SectionTitle>
                <Card>
                    {editing ? (
                        <form onSubmit={handleSave} className="space-y-4">
                            <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                            <Input label="Phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                            <Select label="Vehicle" value={form.vehicleType} onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}>
                                {vehicleOptions.map((v) => (
                                    <option key={v} value={v}>{v}</option>
                                ))}
                            </Select>
                            <div className="flex gap-3 pt-1">
                                <Button variant="secondary" size="lg" className="flex-1" onClick={() => setEditing(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" size="lg" className="flex-1" isLoading={isSaving}>
                                    Save
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="divide-y divide-line -my-3">
                            <DetailRow label="Phone" value={rider.phone} />
                            <DetailRow label="Email" value={rider.email} />
                            <DetailRow label="Vehicle" value={rider.vehicleType} />
                            <DetailRow label="Plate number" value={rider.vehicleNumber} />
                        </div>
                    )}
                </Card>
            </section>

            {/* Settings */}
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
                    <button type="button" onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 h-14 text-left text-danger">
                        <Icon name="logout" className="text-[22px]" />
                        <span className="flex-1 text-[15px] font-semibold">Sign out</span>
                    </button>
                </Card>
            </section>
        </div>
    );
};

export default RiderProfile;
