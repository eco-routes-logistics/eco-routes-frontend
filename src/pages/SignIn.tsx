import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/layout/AppShell';
import { Icon } from '@/components/ui';

// Businesses and riders each have their own login; this page just routes people to the right one.
// The staff console (/login) is deliberately not advertised here; staff bookmark it.
const OPTIONS = [
    { to: '/client/login', icon: 'package_2', title: 'I send packages', body: 'Business account' },
    { to: '/rider/login', icon: 'two_wheeler', title: 'I deliver packages', body: 'Rider account' },
];

const SignIn: React.FC = () => (
    <div className="min-h-[100dvh] bg-surface flex flex-col items-center px-5 py-12">
        <Link to="/" aria-label="EcoRoutes home">
            <Logo />
        </Link>

        <div className="w-full max-w-md mt-10 bg-surface-raised border border-line rounded-card shadow-raised p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-ink text-center">Log in to EcoRoutes</h1>
            <p className="text-sm text-ink-secondary text-center mt-1">Who are you?</p>

            <div className="mt-6 space-y-3">
                {OPTIONS.map((o) => (
                    <Link
                        key={o.to}
                        to={o.to}
                        className="flex items-center gap-4 p-4 rounded-xl border-2 border-line hover:border-primary hover:bg-primary-subtle transition-colors group"
                    >
                        <span className="size-11 rounded-xl bg-primary-subtle text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                            <Icon name={o.icon} className="text-[22px]" />
                        </span>
                        <span className="flex-1">
                            <span className="block text-[15px] font-semibold text-ink">{o.title}</span>
                            <span className="block text-[13px] text-ink-muted">{o.body}</span>
                        </span>
                        <Icon name="arrow_forward" className="text-ink-muted text-[20px] group-hover:text-primary" />
                    </Link>
                ))}
            </div>
        </div>

        <p className="text-sm text-ink-secondary mt-6 text-center">
            New to EcoRoutes?{' '}
            <Link to="/client/signup" className="font-semibold text-primary">Create a business account</Link>
            {' or '}
            <Link to="/rider/signup" className="font-semibold text-primary">apply to ride</Link>
        </p>
    </div>
);

export default SignIn;
