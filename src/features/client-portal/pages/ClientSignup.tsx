import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Card, Icon, Input, Select } from '@/components/ui';
import { AuthFrame } from '@/components/layout/AuthFrame';
import { cn } from '@/utils/cn';
import { useClientRegisterCorporate, useClientRegisterPayAsYouGo } from '../hooks/useClientAuth';

type AccountType = 'payg' | 'corporate';

interface FormState {
    company: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    registrationNumber: string;
    estimatedMonthlyVolume: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = { company: '', contactName: '', email: '', phone: '', address: '', password: '', registrationNumber: '', estimatedMonthlyVolume: '' };

// Same rules as validatePasswordStrength in the backend's validate.middleware.ts
const PASSWORD_RULES: Array<[string, (p: string) => boolean]> = [
    ['8+ characters', (p) => p.length >= 8],
    ['Upper and lower case', (p) => /[A-Z]/.test(p) && /[a-z]/.test(p)],
    ['A number', (p) => /[0-9]/.test(p)],
    ['A symbol', (p) => /[!@#$%^&*(),.?":{}|<>\-_=+[\]\\;'`~]/.test(p)],
];

const validate = (f: FormState, type: AccountType): Errors => {
    const e: Errors = {};
    if (f.company.trim().length < 2) e.company = 'Enter your company name';
    if (f.contactName.trim().length < 2) e.contactName = 'Enter your full name';
    if (!/\S+@\S+\.\S+/.test(f.email)) e.email = 'Enter a valid email';
    if (!f.phone.trim()) e.phone = 'Enter a phone number';
    if (f.address.trim().length < 5) e.address = 'Enter your business address';
    if (type === 'payg' && !PASSWORD_RULES.every(([, ok]) => ok(f.password))) e.password = 'Password needs everything in the checklist';
    if (type === 'corporate') {
        if (f.registrationNumber.trim().length < 3) e.registrationNumber = 'Enter your RC number';
        if (!f.estimatedMonthlyVolume) e.estimatedMonthlyVolume = 'Choose your monthly volume';
    }
    return e;
};

const TypeOption: React.FC<{ selected: boolean; onClick: () => void; icon: string; title: string; body: string }> = ({ selected, onClick, icon, title, body }) => (
    <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={cn('text-left p-4 rounded-xl border-2 transition-colors', selected ? 'border-primary bg-primary-subtle' : 'border-line bg-surface-raised hover:border-ink-muted')}
    >
        <Icon name={icon} filled={selected} className={cn('text-[24px]', selected ? 'text-primary' : 'text-ink-secondary')} />
        <span className={cn('block text-[15px] font-semibold mt-2', selected ? 'text-primary' : 'text-ink')}>{title}</span>
        <span className="block text-[13px] text-ink-secondary mt-0.5">{body}</span>
    </button>
);

const ClientSignup: React.FC = () => {
    const [params] = useSearchParams();
    const [type, setType] = useState<AccountType>(params.get('type') === 'corporate' ? 'corporate' : 'payg');
    const [form, setForm] = useState<FormState>(INITIAL);
    const [errors, setErrors] = useState<Errors>({});
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const payg = useClientRegisterPayAsYouGo();
    const corporate = useClientRegisterCorporate();
    const isPending = payg.isPending || corporate.isPending;

    const bind = (k: keyof FormState) => ({
        value: form[k],
        error: errors[k],
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setForm((f) => ({ ...f, [k]: e.target.value }));
            setErrors((er) => ({ ...er, [k]: undefined }));
        },
    });

    const handlers = {
        onSuccess: () => setSubmitted(true),
        onError: (err: any) => {
            const fieldErrors: Array<{ field: string; message: string }> = err?.response?.data?.errors ?? [];
            // Field errors are shown on the fields themselves; only fall back to a banner when there are none
            if (fieldErrors.length) setErrors(Object.fromEntries(fieldErrors.map((fe) => [fe.field, fe.message])));
            else setServerError(err?.response?.data?.message ?? 'Something went wrong. Please try again.');
        },
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setServerError(null);
        const found = validate(form, type);
        setErrors(found);
        if (Object.keys(found).length) return;
        const base = {
            company: form.company.trim(),
            contactName: form.contactName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            address: form.address.trim(),
        };
        if (type === 'payg') payg.mutate({ ...base, password: form.password }, handlers);
        else corporate.mutate({ ...base, registrationNumber: form.registrationNumber.trim(), estimatedMonthlyVolume: form.estimatedMonthlyVolume }, handlers);
    };

    if (submitted) {
        return (
            <AuthFrame
                product="Business"
                title={type === 'payg' ? 'Account created' : 'Application received'}
                subtitle={
                    type === 'payg'
                        ? `We're reviewing ${form.company}. You can sign in as soon as it's approved.`
                        : `Thanks. Our team will review ${form.company} and contact ${form.email} to set up your corporate account and login.`
                }
            >
                <Card className="flex items-start gap-3">
                    <Icon name="mark_email_unread" className="text-primary text-[24px] flex-shrink-0" />
                    <p className="text-sm text-ink-secondary">
                        We'll email <span className="font-semibold text-ink">{form.email}</span> when your account is approved.
                    </p>
                </Card>
                <Link to="/client/login" className="mt-6 h-12 w-full rounded-xl bg-primary text-white font-semibold text-[15px] inline-flex items-center justify-center hover:bg-primary-hover">
                    Back to sign in
                </Link>
            </AuthFrame>
        );
    }

    return (
        <AuthFrame
            product="Business"
            title="Create a business account"
            subtitle="Book, pay for and track deliveries in one place."
            footer={
                <p>
                    Already have an account? <Link to="/client/login" className="font-semibold text-primary">Sign in</Link>
                </p>
            }
        >
            <div className="grid grid-cols-2 gap-2.5 mb-6">
                <TypeOption selected={type === 'payg'} onClick={() => setType('payg')} icon="account_balance_wallet" title="Pay as you go" body="Top up a wallet, pay per delivery" />
                <TypeOption selected={type === 'corporate'} onClick={() => setType('corporate')} icon="domain" title="Corporate" body="High volume, billed monthly" />
            </div>

            {serverError && (
                <div role="alert" className="mb-5 p-3 rounded-xl bg-danger-subtle text-danger text-sm font-medium">
                    {serverError}
                </div>
            )}

            <form onSubmit={submit} noValidate className="space-y-4">
                <Input label="Company name" autoComplete="organization" {...bind('company')} />
                <Input label="Your full name" autoComplete="name" {...bind('contactName')} />
                <Input label="Work email" type="email" autoComplete="email" inputMode="email" {...bind('email')} />
                <Input label="Phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="0801 234 5678" {...bind('phone')} />
                <Input label="Business address" autoComplete="street-address" {...bind('address')} />

                {type === 'payg' ? (
                    <div>
                        <Input
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            {...bind('password')}
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
                        <ul className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2" aria-label="Password requirements">
                            {PASSWORD_RULES.map(([label, ok]) => {
                                const met = ok(form.password);
                                return (
                                    <li key={label} className={cn('text-[13px] inline-flex items-center gap-1.5', met ? 'text-success' : 'text-ink-muted')}>
                                        <Icon name={met ? 'check_circle' : 'radio_button_unchecked'} filled={met} className="text-[16px]" />
                                        {label}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    <>
                        <Input label="Company registration (RC) number" placeholder="e.g. RC 1234567" {...bind('registrationNumber')} />
                        <Select label="Deliveries per month" {...bind('estimatedMonthlyVolume')}>
                            <option value="" disabled>Choose a range</option>
                            <option value="50-100">50 – 100</option>
                            <option value="100-500">100 – 500</option>
                            <option value="500-1000">500 – 1,000</option>
                            <option value="1000+">1,000+</option>
                        </Select>
                    </>
                )}

                <Button type="submit" size="lg" fullWidth isLoading={isPending} className="!mt-6">
                    {type === 'payg' ? 'Create account' : 'Apply for corporate account'}
                </Button>
            </form>
        </AuthFrame>
    );
};

export default ClientSignup;
