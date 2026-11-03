import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Input } from '@/components/ui';
import { cn } from '@/utils/cn';
import { useRiderRegister } from '../hooks/useRiderAuth';
import { AuthFrame } from '@/components/layout/AuthFrame';

const STEPS = ['Your details', 'Vehicle', 'Verification', 'Review'];

const VEHICLES = [
    { value: 'Motorcycle', icon: 'two_wheeler' },
    { value: 'Bicycle', icon: 'pedal_bike' },
    { value: 'Car', icon: 'directions_car' },
    { value: 'Van', icon: 'airport_shuttle' },
    { value: 'Truck', icon: 'local_shipping' },
];

const ID_TYPES = [
    { label: 'NIN card', value: 'nin_card' },
    { label: "Driver's licence", value: 'drivers_license' },
    { label: "Voter's card", value: 'voters_card' },
    { label: 'Passport', value: 'international_passport' },
];

const MAX_FILE_BYTES = 5 * 1024 * 1024; // backend upload limit

interface FormState {
    name: string;
    phone: string;
    email: string;
    password: string;
    vehicleType: string;
    vehicleNumber: string;
    nin: string;
    idType: string;
    idDocument: File | null;
    passportPhoto: File | null;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = {
    name: '', phone: '', email: '', password: '',
    vehicleType: 'Motorcycle', vehicleNumber: '',
    nin: '', idType: '', idDocument: null, passportPhoto: null,
};

const validate = (step: number, f: FormState): FieldErrors => {
    const e: FieldErrors = {};
    if (step === 1) {
        if (!f.name.trim()) e.name = 'Enter your full name';
        if (!f.phone.trim()) e.phone = 'Enter your phone number';
        if (!/\S+@\S+\.\S+/.test(f.email)) e.email = 'Enter a valid email';
        if (f.password.length < 8) e.password = 'Use at least 8 characters';
    }
    if (step === 2 && !f.vehicleNumber.trim()) e.vehicleNumber = 'Enter your plate number';
    if (step === 3) {
        if (f.nin.replace(/\s/g, '').length !== 11) e.nin = 'NIN must be 11 digits';
        if (!f.idType) e.idType = 'Choose an ID type';
        if (!f.idDocument) e.idDocument = 'Add a photo of your ID';
        if (!f.passportPhoto) e.passportPhoto = 'Add a photo of yourself';
    }
    return e;
};

/** Large tappable option used for vehicle and ID type choices. */
const ChoiceTile: React.FC<{ selected: boolean; onClick: () => void; children: React.ReactNode }> = ({ selected, onClick, children }) => (
    <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={cn(
            'min-h-14 px-3 py-3 rounded-xl border-2 text-[15px] font-semibold flex items-center gap-2.5 transition-colors text-left',
            selected ? 'border-primary bg-primary-subtle text-primary' : 'border-line bg-surface-raised text-ink hover:border-ink-muted'
        )}
    >
        {children}
    </button>
);

const PhotoPicker: React.FC<{
    label: string;
    hint: string;
    icon: string;
    file: File | null;
    error?: string;
    onPick: (file: File | null, error?: string) => void;
}> = ({ label, hint, icon, file, error, onPick }) => {
    const ref = useRef<HTMLInputElement>(null);
    const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
    useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const picked = e.target.files?.[0];
        if (!picked) return;
        if (!picked.type.startsWith('image/')) return onPick(null, 'Please choose an image file');
        if (picked.size > MAX_FILE_BYTES) return onPick(null, 'Image must be under 5 MB');
        onPick(picked);
    };

    return (
        <div>
            <p className="text-[13px] font-semibold text-ink-secondary mb-1.5">{label}</p>
            <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleChange} />
            <button
                type="button"
                onClick={() => ref.current?.click()}
                className={cn(
                    'w-full rounded-xl border-2 border-dashed flex items-center gap-4 p-3 text-left transition-colors',
                    error ? 'border-danger bg-danger-subtle' : 'border-line bg-surface-raised hover:border-primary'
                )}
            >
                {preview ? (
                    <img src={preview} alt="" className="size-16 rounded-lg object-cover flex-shrink-0" />
                ) : (
                    <span className="size-16 rounded-lg bg-surface-sunken flex items-center justify-center flex-shrink-0">
                        <Icon name={icon} className="text-ink-muted text-[28px]" />
                    </span>
                )}
                <span className="min-w-0">
                    <span className="block text-[15px] font-semibold text-ink">{file ? 'Change photo' : 'Add photo'}</span>
                    <span className="block text-[13px] text-ink-muted truncate">{file ? file.name : hint}</span>
                </span>
            </button>
            {error && <p className="text-[13px] text-danger font-medium mt-1.5">{error}</p>}
        </div>
    );
};

const ReviewRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex justify-between gap-4 py-2.5">
        <span className="text-sm text-ink-secondary">{label}</span>
        <span className="text-sm font-semibold text-ink text-right">{value}</span>
    </div>
);

const RiderSignup: React.FC = () => {
    const { mutate: register, isPending } = useRiderRegister();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<FormState>(INITIAL);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const set = <K extends keyof FormState>(field: K, value: FormState[K]) => {
        setForm((f) => ({ ...f, [field]: value }));
        setErrors((e) => ({ ...e, [field]: undefined }));
    };

    const next = () => {
        const e = validate(step, form);
        setErrors(e);
        if (Object.keys(e).length === 0) setStep((s) => s + 1);
    };

    const submit = () =>
        register(
            {
                name: form.name.trim(),
                phone: form.phone.trim(),
                email: form.email.trim(),
                password: form.password,
                vehicleType: form.vehicleType,
                vehicleNumber: form.vehicleNumber.trim(),
                nin: form.nin.replace(/\s/g, ''),
                idType: form.idType,
                idDocument: form.idDocument!,
                passportPhoto: form.passportPhoto!,
            },
            { onSuccess: () => setSubmitted(true) }
        );

    if (submitted) {
        return (
            <AuthFrame title="Application sent" subtitle={`Thanks, ${form.name.split(' ')[0]}. Our team will review your details.`}>
                <Card className="space-y-4">
                    {[
                        { icon: 'task_alt', text: 'Application received', done: true },
                        { icon: 'verified_user', text: 'We check your ID and photo', done: false },
                        { icon: 'mail', text: `We email ${form.email} when you're approved`, done: false },
                    ].map((s) => (
                        <div key={s.text} className="flex items-center gap-3">
                            <span className={cn('size-9 rounded-full flex items-center justify-center', s.done ? 'bg-primary text-white' : 'bg-surface-sunken text-ink-muted')}>
                                <Icon name={s.icon} className="text-[20px]" />
                            </span>
                            <span className={cn('text-[15px]', s.done ? 'font-semibold text-ink' : 'text-ink-secondary')}>{s.text}</span>
                        </div>
                    ))}
                </Card>
                <Link
                    to="/rider/login"
                    className="mt-6 h-12 w-full rounded-xl bg-primary text-white font-semibold text-[15px] inline-flex items-center justify-center hover:bg-primary-hover transition-colors"
                >
                    Back to sign in
                </Link>
            </AuthFrame>
        );
    }

    return (
        <AuthFrame
            title="Apply to ride"
            subtitle="Takes about 3 minutes. Have your ID ready."
            footer={
                <p>
                    Already a rider? <Link to="/rider/login" className="font-semibold text-primary">Sign in</Link>
                </p>
            }
        >
            {/* Progress */}
            <div className="mb-6">
                <div className="flex gap-1.5" aria-hidden="true">
                    {STEPS.map((_, i) => (
                        <span key={i} className={cn('h-1.5 flex-1 rounded-full transition-colors', i < step ? 'bg-primary' : 'bg-line')} />
                    ))}
                </div>
                <p className="text-[13px] font-semibold text-ink-secondary mt-2">
                    Step {step} of {STEPS.length} · {STEPS[step - 1]}
                </p>
            </div>

            <div className="space-y-4">
                {step === 1 && (
                    <>
                        <Input label="Full name" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} error={errors.name} placeholder="e.g. Tunde Bakare" />
                        <Input label="Phone number" type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} error={errors.phone} placeholder="0801 234 5678" />
                        <Input label="Email" type="email" autoComplete="email" inputMode="email" value={form.email} onChange={(e) => set('email', e.target.value)} error={errors.email} placeholder="you@example.com" />
                        <Input
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            value={form.password}
                            onChange={(e) => set('password', e.target.value)}
                            error={errors.password}
                            hint="At least 8 characters"
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
                    </>
                )}

                {step === 2 && (
                    <>
                        <div>
                            <p className="text-[13px] font-semibold text-ink-secondary mb-1.5">What do you ride?</p>
                            <div className="grid grid-cols-2 gap-2.5">
                                {VEHICLES.map((v) => (
                                    <ChoiceTile key={v.value} selected={form.vehicleType === v.value} onClick={() => set('vehicleType', v.value)}>
                                        <Icon name={v.icon} filled={form.vehicleType === v.value} className="text-[22px]" />
                                        {v.value}
                                    </ChoiceTile>
                                ))}
                            </div>
                        </div>
                        <Input
                            label="Plate number"
                            value={form.vehicleNumber}
                            onChange={(e) => set('vehicleNumber', e.target.value.toUpperCase())}
                            error={errors.vehicleNumber}
                            placeholder="e.g. LND 123 AB"
                            autoCapitalize="characters"
                        />
                    </>
                )}

                {step === 3 && (
                    <>
                        <Input
                            label="NIN (National Identification Number)"
                            inputMode="numeric"
                            maxLength={11}
                            value={form.nin}
                            onChange={(e) => set('nin', e.target.value.replace(/\D/g, ''))}
                            error={errors.nin}
                            placeholder="11 digits"
                        />
                        <div>
                            <p className="text-[13px] font-semibold text-ink-secondary mb-1.5">ID you'll upload</p>
                            <div className="grid grid-cols-2 gap-2.5">
                                {ID_TYPES.map((t) => (
                                    <ChoiceTile key={t.value} selected={form.idType === t.value} onClick={() => set('idType', t.value)}>
                                        {t.label}
                                    </ChoiceTile>
                                ))}
                            </div>
                            {errors.idType && <p className="text-[13px] text-danger font-medium mt-1.5">{errors.idType}</p>}
                        </div>
                        <PhotoPicker
                            label="Photo of your ID"
                            hint="Clear photo, all corners visible"
                            icon="badge"
                            file={form.idDocument}
                            error={errors.idDocument}
                            onPick={(file, err) => (err ? setErrors((e) => ({ ...e, idDocument: err })) : set('idDocument', file))}
                        />
                        <PhotoPicker
                            label="Photo of you"
                            hint="Face the camera, good lighting"
                            icon="photo_camera"
                            file={form.passportPhoto}
                            error={errors.passportPhoto}
                            onPick={(file, err) => (err ? setErrors((e) => ({ ...e, passportPhoto: err })) : set('passportPhoto', file))}
                        />
                    </>
                )}

                {step === 4 && (
                    <Card padding="sm" className="divide-y divide-line">
                        <ReviewRow label="Name" value={form.name} />
                        <ReviewRow label="Phone" value={form.phone} />
                        <ReviewRow label="Email" value={form.email} />
                        <ReviewRow label="Vehicle" value={`${form.vehicleType} · ${form.vehicleNumber}`} />
                        <ReviewRow label="NIN" value={`${form.nin.slice(0, 3)}•••••${form.nin.slice(-3)}`} />
                        <ReviewRow label="ID type" value={ID_TYPES.find((t) => t.value === form.idType)?.label ?? ''} />
                        <ReviewRow label="Photos" value="2 added" />
                    </Card>
                )}
            </div>

            <div className="flex gap-3 mt-8">
                {step > 1 && (
                    <Button variant="secondary" size="lg" onClick={() => setStep((s) => s - 1)} disabled={isPending}>
                        Back
                    </Button>
                )}
                {step < STEPS.length ? (
                    <Button size="lg" className="flex-1" onClick={next}>
                        Continue
                    </Button>
                ) : (
                    <Button size="lg" className="flex-1" onClick={submit} isLoading={isPending}>
                        Submit application
                    </Button>
                )}
            </div>
        </AuthFrame>
    );
};

export default RiderSignup;
