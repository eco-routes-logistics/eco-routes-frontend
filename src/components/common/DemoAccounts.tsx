import React from 'react';

// Accounts created by the backend's `npm run seed:demo`
export const DEMO_ACCOUNTS = {
    staff: [
        { label: 'Super admin', email: 'demo.superadmin@ecoroutes.test' },
        { label: 'Admin', email: 'demo.admin@ecoroutes.test' },
        { label: 'Logistics staff', email: 'demo.staff@ecoroutes.test' },
    ],
    client: [
        { label: 'Pay as you go', email: 'demo.business@ecoroutes.test' },
        { label: 'Corporate', email: 'demo.corporate@ecoroutes.test' },
    ],
    rider: [{ label: 'Demo rider', email: 'demo.rider@ecoroutes.test' }],
};

// Only set in .env.local for demos; when absent, Vite leaves the buttons and password out of the build
const DEMO_PASSWORD = import.meta.env.VITE_DEMO_PASSWORD as string | undefined;

interface DemoAccountsProps {
    accounts: Array<{ label: string; email: string }>;
    onPick: (email: string, password: string) => void;
}

/** "Jump in as…" buttons that fill a login form with a seeded demo account. */
export const DemoAccounts: React.FC<DemoAccountsProps> = ({ accounts, onPick }) => {
    if (!DEMO_PASSWORD) return null;
    return (
        <div className="mt-8 pt-6 border-t border-dashed border-line">
            <p className="text-[13px] text-ink-muted text-center mb-3">Demo · sign in as</p>
            <div className="flex flex-wrap justify-center gap-2">
                {accounts.map((a) => (
                    <button
                        key={a.email}
                        type="button"
                        onClick={() => onPick(a.email, DEMO_PASSWORD)}
                        className="h-10 px-4 rounded-xl border border-primary/40 text-sm font-semibold text-primary hover:bg-primary-subtle transition-colors"
                    >
                        {a.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
