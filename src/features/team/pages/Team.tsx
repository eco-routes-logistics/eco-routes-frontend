import React, { useEffect, useMemo, useState } from 'react';
import { Avatar } from '@/components/layout/AppShell';
import { Button, Icon, Input, Modal, PageHeader, SearchInput, Select, Skeleton, StatusBadge, Table, Td, Th, Tr } from '@/components/ui';
import { EmptyState } from '@/components/common/EmptyState';
import { useAuthStore } from '@/stores/authStore';
import { User } from '@/types/user';
import { useCreateTeamUser, useDeleteTeamUser, useTeamUsers, useToggleTeamUserStatus, useUpdateTeamUser } from '../hooks/useTeam';

const ROLES = [
    { value: 'super_admin', label: 'Super admin', hint: 'Everything, including deleting staff' },
    { value: 'admin', label: 'Admin', hint: 'Operations, finance and team' },
    { value: 'logistics_staff', label: 'Logistics staff', hint: 'Orders, riders and clients only' },
];

const roleLabel = (role: string) => ROLES.find((r) => r.value === role)?.label ?? role;

interface MemberForm {
    name: string;
    email: string;
    phone: string;
    role: string;
    password: string;
}

const EMPTY: MemberForm = { name: '', email: '', phone: '', role: 'logistics_staff', password: '' };

const MemberModal: React.FC<{ isOpen: boolean; member: User | null; onClose: () => void }> = ({ isOpen, member, onClose }) => {
    const [form, setForm] = useState<MemberForm>(EMPTY);
    const { mutate: createUser, isPending: creating } = useCreateTeamUser();
    const { mutate: updateUser, isPending: updating } = useUpdateTeamUser();
    const editing = !!member;

    useEffect(() => {
        if (!isOpen) return;
        setForm(member ? { name: member.name, email: member.email, phone: member.phone, role: member.role, password: '' } : EMPTY);
    }, [isOpen, member]);

    const set = (k: keyof MemberForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (member) {
            const { password: _password, ...rest } = form;
            updateUser({ id: member.id, data: rest as Partial<User> }, { onSuccess: onClose });
        } else {
            createUser(form as unknown as Partial<User>, { onSuccess: onClose });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={editing ? `Edit ${member?.name}` : 'Add a team member'} size="lg">
            <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Full name" value={form.name} onChange={set('name')} required />
                    <Input label="Email" type="email" value={form.email} onChange={set('email')} required />
                    <Input label="Phone" type="tel" value={form.phone} onChange={set('phone')} required />
                    <Select label="Role" value={form.role} onChange={set('role')} hint={ROLES.find((r) => r.value === form.role)?.hint}>
                        {ROLES.map((r) => (
                            <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                    </Select>
                </div>
                {!editing && (
                    <Input
                        label="Temporary password"
                        type="password"
                        autoComplete="new-password"
                        minLength={8}
                        value={form.password}
                        onChange={set('password')}
                        hint="At least 8 characters. Share it with them securely."
                        required
                    />
                )}
                <div className="flex justify-end gap-3 pt-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" isLoading={creating || updating}>{editing ? 'Save' : 'Add member'}</Button>
                </div>
            </form>
        </Modal>
    );
};

const Team: React.FC = () => {
    const me = useAuthStore((s) => s.user);
    const { data, isLoading } = useTeamUsers();
    const { mutate: toggleStatus, isPending: toggling, variables: togglingId } = useToggleTeamUserStatus();
    const { mutate: deleteUser, isPending: deleting } = useDeleteTeamUser();

    const [search, setSearch] = useState('');
    const [modal, setModal] = useState<{ open: boolean; member: User | null }>({ open: false, member: null });
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    // Rider accounts live in their own collection; hide any legacy rider-role users here
    const users = useMemo(() => (data?.data?.users ?? []).filter((u) => u.role !== 'rider'), [data]);
    const visible = useMemo(() => {
        const q = search.trim().toLowerCase();
        return q ? users.filter((u) => [u.name, u.email, u.phone].some((v) => v?.toLowerCase().includes(q))) : users;
    }, [users, search]);

    const canDelete = me?.role === 'super_admin';

    return (
        <>
            <PageHeader
                title="Team"
                description="Staff who can sign in to this console."
                actions={
                    <Button onClick={() => setModal({ open: true, member: null })} leftIcon={<Icon name="person_add" className="text-[20px]" />}>
                        Add member
                    </Button>
                }
            />

            <SearchInput value={search} onChange={setSearch} placeholder="Search by name, email or phone" className="max-w-md mb-4" />

            {isLoading ? (
                <Skeleton className="h-80" />
            ) : visible.length === 0 ? (
                <EmptyState icon="group" title="No team members found" />
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <Th>Member</Th>
                            <Th>Role</Th>
                            <Th>Phone</Th>
                            <Th>Status</Th>
                            <Th />
                        </tr>
                    </thead>
                    <tbody>
                        {visible.map((u) => {
                            const isMe = u.id === me?.id;
                            return (
                                <Tr key={u.id}>
                                    <Td>
                                        <div className="flex items-center gap-3">
                                            <Avatar name={u.name} className="size-9 text-[13px] flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="font-semibold whitespace-nowrap">
                                                    {u.name}
                                                    {isMe && <span className="ml-2 text-[12px] font-medium text-ink-muted">You</span>}
                                                </p>
                                                <p className="text-[12px] text-ink-muted">{u.email}</p>
                                            </div>
                                        </div>
                                    </Td>
                                    <Td className="whitespace-nowrap">{roleLabel(u.role)}</Td>
                                    <Td className="text-ink-secondary whitespace-nowrap">{u.phone}</Td>
                                    <Td>
                                        <StatusBadge status={u.isActive ? 'active' : 'inactive'} kind="staff" />
                                    </Td>
                                    <Td align="right">
                                        {confirmDeleteId === u.id ? (
                                            <div className="flex justify-end items-center gap-2">
                                                <span className="text-[13px] text-ink-secondary whitespace-nowrap">Delete?</span>
                                                <Button size="sm" variant="secondary" onClick={() => setConfirmDeleteId(null)}>No</Button>
                                                <Button size="sm" variant="danger" isLoading={deleting} onClick={() => deleteUser(u.id, { onSuccess: () => setConfirmDeleteId(null) })}>
                                                    Delete
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex justify-end gap-1">
                                                <Button size="sm" variant="ghost" onClick={() => setModal({ open: true, member: u })}>Edit</Button>
                                                {!isMe && (
                                                    <Button size="sm" variant="ghost" isLoading={toggling && togglingId === u.id} onClick={() => toggleStatus(u.id)}>
                                                        {u.isActive ? 'Deactivate' : 'Activate'}
                                                    </Button>
                                                )}
                                                {canDelete && !isMe && (
                                                    <Button size="sm" variant="ghost" className="text-danger" onClick={() => setConfirmDeleteId(u.id)} aria-label={`Delete ${u.name}`}>
                                                        <Icon name="delete" className="text-[18px]" />
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    </Td>
                                </Tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}

            <MemberModal isOpen={modal.open} member={modal.member} onClose={() => setModal({ open: false, member: null })} />
        </>
    );
};

export default Team;
