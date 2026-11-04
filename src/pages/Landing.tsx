import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/layout/AppShell';
import { Card, Icon, StatusBadge } from '@/components/ui';
import { JobStepper, RouteSummary } from '@/features/rider-portal/components/JobParts';

/** Illustrative delivery card built from the same components the portals use, so the page previews the real app. */
const DeliveryPreview: React.FC = () => (
    <div className="relative isolate w-full max-w-sm mx-auto" aria-hidden="true">
        <div className="absolute -inset-6 rounded-[2rem] bg-primary-subtle -z-10 rotate-2" />
        <Card className="space-y-5 shadow-overlay">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[13px] font-semibold text-ink-muted">ECO-48213</p>
                    <p className="text-[15px] font-semibold text-ink">Phone accessories</p>
                </div>
                <StatusBadge status="in_transit" />
            </div>
            <JobStepper status="in_transit" />
            <RouteSummary pickup="Ikeja City Mall, Obafemi Awolowo Way" dropoff="15 Opebi Road, Ikeja" />
            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-sunken">
                <span className="size-10 rounded-full bg-primary-subtle text-primary font-bold text-sm flex items-center justify-center">TB</span>
                <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-ink-muted">Your rider</p>
                    <p className="text-[15px] font-semibold text-ink">Tunde B. · Motorcycle</p>
                </div>
                <span className="size-10 rounded-full bg-primary text-white flex items-center justify-center">
                    <Icon name="call" filled className="text-[20px]" />
                </span>
            </div>
        </Card>
    </div>
);

const steps = [
    { title: 'Book online', body: 'Pickup, drop-off and price upfront' },
    { title: 'A verified rider picks it up', body: 'Every rider is ID-checked' },
    { title: 'Track it to the door', body: "Live status until it's delivered" },
];

/** Phone-sized stand-in for the preview card: what happens, in three lines. */
const HowItWorks: React.FC = () => (
    <section className="w-full max-w-sm mx-auto text-left">
        <p className="text-[13px] font-semibold text-ink-muted mb-3 px-1">How it works</p>
        <Card padding="none" className="divide-y divide-line">
            {steps.map((s, i) => (
                <div key={s.title} className="px-4 py-3.5 flex items-center gap-3">
                    <span className="size-9 rounded-full bg-primary-subtle text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                        {i + 1}
                    </span>
                    <div className="min-w-0">
                        <p className="text-[15px] font-semibold text-ink">{s.title}</p>
                        <p className="text-[13px] text-ink-secondary">{s.body}</p>
                    </div>
                </div>
            ))}
        </Card>
    </section>
);

const Landing: React.FC = () => (
    <div className="min-h-[100dvh] bg-surface flex flex-col">
        <header className="w-full max-w-6xl mx-auto px-5 h-20 flex items-center justify-between">
            <Logo />
            <nav className="flex items-center gap-2">
                <Link to="/signin" className="h-10 px-4 rounded-xl text-sm font-semibold text-ink-secondary hover:text-ink inline-flex items-center">
                    Log in
                </Link>
                <Link to="/client/signup" className="h-10 px-4 rounded-xl bg-primary text-white text-sm font-semibold inline-flex items-center hover:bg-primary-hover transition-colors">
                    Get started
                </Link>
            </nav>
        </header>

        <main className="flex-1 flex items-center">
            <div className="w-full max-w-6xl mx-auto px-5 py-8 lg:py-12 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-[44px] sm:text-6xl font-extrabold tracking-tight leading-[1.05] text-ink">
                        Deliveries, <span className="text-primary">sorted</span>.
                    </h1>
                    <p className="text-lg sm:text-xl text-ink-secondary mt-5 max-w-md mx-auto lg:mx-0">
                        Businesses book deliveries. Riders earn by making them.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mt-10">
                        <Link
                            to="/client/signup"
                            className="h-14 px-8 rounded-xl bg-primary text-white text-base font-semibold inline-flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors"
                        >
                            <Icon name="package_2" className="text-[22px]" /> Send a package
                        </Link>
                        <Link
                            to="/rider/signup"
                            className="h-14 px-8 rounded-xl border-2 border-line bg-surface-raised text-ink text-base font-semibold inline-flex items-center justify-center gap-2 hover:border-primary transition-colors"
                        >
                            <Icon name="two_wheeler" className="text-[22px]" /> Deliver with us
                        </Link>
                    </div>
                </div>

                <div className="lg:hidden">
                    <HowItWorks />
                </div>
                <div className="hidden lg:block">
                    <DeliveryPreview />
                </div>
            </div>
        </main>

        <footer className="py-8 text-center text-[13px] text-ink-muted">© {new Date().getFullYear()} EcoRoutes · Deliveries for Lagos businesses</footer>
    </div>
);

export default Landing;
