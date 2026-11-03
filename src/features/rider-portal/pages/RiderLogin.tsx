import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Input } from '@/components/ui';
import { cn } from '@/utils/cn';
import { useRiderLogin } from '../hooks/useRiderAuth';
import { AuthFrame } from '@/components/layout/AuthFrame';
import { DemoAccounts, DEMO_ACCOUNTS } from '@/components/common/DemoAccounts';

// The backend blocks pending/rejected/inactive riders with a 403 and a message; show those as states, not errors
const describeError = (message: string) => {
    if (/under review/i.test(message)) {
        return { tone: 'info' as const, icon: 'hourglass_top', title: 'Application under review', body: "We'll email you as soon as your account is approved." };
    }
    if (/not approved/i.test(message)) {
        const reason = message.split('Reason:')[1]?.trim();
        return { tone: 'danger' as const, icon: 'cancel', title: 'Application not approved', body: reason ? `Reason: ${reason}` : message };
    }
    return { tone: 'danger' as const, icon: 'error', title: "Couldn't sign you in", body: message };
};

const RiderLogin: React.FC = () => {
    const { mutate: login, isPending, error } = useRiderLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const message: string | null = (error as any)?.response?.data?.message ?? (error ? 'Something went wrong. Please try again.' : null);
    const notice = message ? describeError(message) : null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login({ email: email.trim(), password });
    };

    return (
        <AuthFrame
            title="Welcome back"
            subtitle="Sign in to see jobs and track your earnings."
            footer={
                <>
                    <p>
                        New to EcoRoutes?{' '}
                        <Link to="/rider/signup" className="font-semibold text-primary">Apply to ride</Link>
                    </p>
                    <p className="text-ink-muted">
                        <Link to="/client/login" className="hover:text-ink">Business login</Link>
                    </p>
                </>
            }
        >
            {notice && (
                <div
                    role="alert"
                    className={cn(
                        'mb-6 flex gap-3 p-4 rounded-xl',
                        notice.tone === 'info' ? 'bg-info-subtle text-info' : 'bg-danger-subtle text-danger'
                    )}
                >
                    <Icon name={notice.icon} filled className="text-[22px] flex-shrink-0" />
                    <div>
                        <p className="font-semibold text-[15px]">{notice.title}</p>
                        <p className="text-sm text-ink-secondary mt-0.5">{notice.body}</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
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
                accounts={DEMO_ACCOUNTS.rider}
                onPick={(demoEmail, demoPassword) => {
                    setEmail(demoEmail);
                    setPassword(demoPassword);
                }}
            />
        </AuthFrame>
    );
};

export default RiderLogin;
