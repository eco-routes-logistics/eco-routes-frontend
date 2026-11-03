import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button, Icon, Input } from '@/components/ui';
import { AuthFrame } from '@/components/layout/AuthFrame';
import { DemoAccounts, DEMO_ACCOUNTS } from '@/components/common/DemoAccounts';
import { useAuthStore } from '@/stores/authStore';
import { useLogin } from '../hooks/useAuth';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const { mutate: login, isPending, error } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Return to the page that bounced the user here, if any
    const from = (location.state as { from?: string } | null)?.from ?? '/admin';

    if (isAuthenticated && localStorage.getItem('auth_token')) return <Navigate to={from} replace />;

    const message: string | null = error ? (error as any)?.response?.data?.message ?? 'Something went wrong. Please try again.' : null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login({ email: email.trim(), password }, { onSuccess: (res) => res.status === 'success' && navigate(from, { replace: true }) });
    };

    return (
        <AuthFrame
            product="Operations"
            title="Staff sign in"
            subtitle="Manage orders, riders and clients."
            footer={
                <p className="text-ink-muted">
                    <Link to="/client/login" className="hover:text-ink">Business login</Link>
                    {' · '}
                    <Link to="/rider/login" className="hover:text-ink">Rider login</Link>
                </p>
            }
        >
            {message && (
                <div role="alert" className="mb-6 flex gap-3 p-4 rounded-xl bg-danger-subtle text-danger">
                    <Icon name="error" filled className="text-[22px] flex-shrink-0" />
                    <p className="text-sm font-medium">{message}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Work email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@ecoroutes.com"
                    required
                    autoFocus
                />
                <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    rightIcon={
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            className="size-10 rounded-lg flex items-center justify-center hover:text-ink"
                        >
                            <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[20px]" />
                        </button>
                    }
                />
                <Button type="submit" size="lg" fullWidth isLoading={isPending} className="!mt-6">
                    Sign in
                </Button>
            </form>
            <DemoAccounts
                accounts={DEMO_ACCOUNTS.staff}
                onPick={(demoEmail, demoPassword) => {
                    setEmail(demoEmail);
                    setPassword(demoPassword);
                }}
            />
        </AuthFrame>
    );
};

export default Login;
