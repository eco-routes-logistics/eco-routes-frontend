import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Input } from '@/components/ui';
import { AuthFrame } from '@/components/layout/AuthFrame';
import { DemoAccounts, DEMO_ACCOUNTS } from '@/components/common/DemoAccounts';
import { cn } from '@/utils/cn';
import { useClientLogin } from '../hooks/useClientAuth';

// The backend blocks pending/deactivated accounts with a 403 and a message; show those as states, not errors
const describeError = (message: string) => {
    if (/pending/i.test(message)) {
        return { tone: 'info' as const, icon: 'hourglass_top', title: 'Account awaiting approval', body: "We're reviewing your sign-up and will email you once it's approved." };
    }
    if (/deactivated/i.test(message)) {
        return { tone: 'danger' as const, icon: 'block', title: 'Account deactivated', body: 'Please contact EcoRoutes support to restore access.' };
    }
    return { tone: 'danger' as const, icon: 'error', title: "Couldn't sign you in", body: message };
};

const ClientLogin: React.FC = () => {
    const { mutate: login, isPending, error } = useClientLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const message: string | null = error ? (error as any)?.response?.data?.message ?? 'Something went wrong. Please try again.' : null;
    const notice = message ? describeError(message) : null;

    return (
        <AuthFrame
            product="Business"
            title="Welcome back"
            subtitle="Book deliveries and track them live."
            footer={
                <>
                    <p>
                        New to EcoRoutes?{' '}
                        <Link to="/client/signup" className="font-semibold text-primary">Create a business account</Link>
                    </p>
                    <p className="text-ink-muted">
                        <Link to="/rider/login" className="hover:text-ink">Rider login</Link>
                    </p>
                </>
            }
        >
            {notice && (
                <div role="alert" className={cn('mb-6 flex gap-3 p-4 rounded-xl', notice.tone === 'info' ? 'bg-info-subtle text-info' : 'bg-danger-subtle text-danger')}>
                    <Icon name={notice.icon} filled className="text-[22px] flex-shrink-0" />
                    <div>
                        <p className="font-semibold text-[15px]">{notice.title}</p>
                        <p className="text-sm text-ink-secondary mt-0.5">{notice.body}</p>
                    </div>
                </div>
            )}

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    login({ email: email.trim(), password });
                }}
                className="space-y-4"
            >
                <Input label="Business email" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required autoFocus />
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
                accounts={DEMO_ACCOUNTS.client}
                onPick={(demoEmail, demoPassword) => {
                    setEmail(demoEmail);
                    setPassword(demoPassword);
                }}
            />
        </AuthFrame>
    );
};

export default ClientLogin;
