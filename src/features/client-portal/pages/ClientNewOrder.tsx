import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Icon, Input, Textarea } from '@/components/ui';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/format';
import { useClientMe, useCreateClientOrder } from '../hooks/useClientAuth';
import { DeliveryModel, DeliveryType } from '../api/clientAuth';
import { DELIVERY_TYPE_LABELS, PREMIUM_MULTIPLIER, estimateDeliveryFee } from '../utils/clientOrders';

interface FormState {
    pickupLocation: string;
    pickupContact: string;
    pickupPhone: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    landmark: string;
    description: string;
    weight: string;
    value: string;
    specialInstructions: string;
    deliveryType: DeliveryType;
    deliveryModel: DeliveryModel;
}

type Errors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = {
    pickupLocation: '', pickupContact: '', pickupPhone: '',
    customerName: '', customerPhone: '', customerAddress: '', landmark: '',
    description: '', weight: '', value: '', specialInstructions: '',
    deliveryType: 'standard', deliveryModel: 'Standard',
};

const REQUIRED: Array<[keyof FormState, string]> = [
    ['pickupLocation', 'Enter the pickup address'],
    ['pickupContact', 'Who should the rider ask for?'],
    ['pickupPhone', 'Enter a pickup phone number'],
    ['customerName', "Enter the recipient's name"],
    ['customerPhone', "Enter the recipient's phone"],
    ['customerAddress', 'Enter the delivery address'],
    ['description', "Say what's in the package"],
];

const validate = (f: FormState): Errors => {
    const e: Errors = {};
    for (const [k, msg] of REQUIRED) if (!String(f[k]).trim()) e[k] = msg;
    if (!(Number(f.weight) > 0)) e.weight = 'Enter a weight above 0';
    if (f.value === '' || Number(f.value) < 0) e.value = 'Enter the item value (0 if none)';
    return e;
};

const FormSection: React.FC<{ step: number; title: string; children: React.ReactNode }> = ({ step, title, children }) => (
    <Card>
        <h2 className="flex items-center gap-2.5 text-[15px] font-bold text-ink mb-4">
            <span className="size-6 rounded-full bg-primary-subtle text-primary text-[12px] font-bold flex items-center justify-center">{step}</span>
            {title}
        </h2>
        <div className="space-y-4">{children}</div>
    </Card>
);

const Choice: React.FC<{ selected: boolean; onClick: () => void; title: string; detail: string; price?: string }> = ({ selected, onClick, title, detail, price }) => (
    <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={cn(
            'w-full text-left p-3.5 rounded-xl border-2 transition-colors',
            selected ? 'border-primary bg-primary-subtle' : 'border-line bg-surface-raised hover:border-ink-muted'
        )}
    >
        <span className="flex items-center justify-between gap-2">
            <span className={cn('text-[15px] font-semibold', selected ? 'text-primary' : 'text-ink')}>{title}</span>
            {price && <span className="text-sm font-semibold text-ink">{price}</span>}
        </span>
        <span className="block text-[13px] text-ink-secondary mt-0.5">{detail}</span>
    </button>
);

const ClientNewOrder: React.FC = () => {
    const navigate = useNavigate();
    const { data: meData } = useClientMe();
    const { mutate: createOrder, isPending, error } = useCreateClientOrder();
    const [form, setForm] = useState<FormState>(INITIAL);
    const [errors, setErrors] = useState<Errors>({});

    const payAsYouGo = meData?.data?.client?.accountType === 'pay_as_you_go';
    const balance = meData?.data?.walletBalance ?? 0;
    const weight = Number(form.weight) || 0;
    const fee = estimateDeliveryFee(weight, form.deliveryType, form.deliveryModel);
    const shortBy = payAsYouGo ? Math.max(0, fee - balance) : 0;

    const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
        setForm((f) => ({ ...f, [k]: v }));
        setErrors((e) => ({ ...e, [k]: undefined }));
    };
    const bind = (k: keyof FormState) => ({
        value: form[k] as string,
        error: errors[k],
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(k, e.target.value as never),
    });

    const apiError = error as any;
    const serverMessage: string | null = apiError ? apiError.response?.data?.message ?? 'Could not book the delivery. Please try again.' : null;
    const insufficientFunds = apiError?.response?.status === 402;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const found = validate(form);
        setErrors(found);
        if (Object.keys(found).length) {
            document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
            return;
        }
        createOrder(
            {
                pickupLocation: form.pickupLocation.trim(),
                pickupContact: form.pickupContact.trim(),
                pickupPhone: form.pickupPhone.trim(),
                customerName: form.customerName.trim(),
                customerPhone: form.customerPhone.trim(),
                customerAddress: form.customerAddress.trim(),
                landmark: form.landmark.trim() || undefined,
                description: form.description.trim(),
                weight,
                value: Number(form.value),
                specialInstructions: form.specialInstructions.trim() || undefined,
                deliveryType: form.deliveryType,
                deliveryModel: form.deliveryModel,
            },
            {
                onSuccess: () => navigate('/client/orders'),
                onError: (err: any) => {
                    // Map backend field errors (validate.middleware) onto the form
                    const fieldErrors: Array<{ field: string; message: string }> = err?.response?.data?.errors ?? [];
                    if (fieldErrors.length) setErrors(Object.fromEntries(fieldErrors.map((fe) => [fe.field, fe.message])));
                },
            }
        );
    };

    return (
        <form onSubmit={submit} noValidate className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-6 lg:items-start space-y-4 lg:space-y-0">
            <div className="space-y-4">
                <FormSection step={1} title="Pickup">
                    <Input id="f-pickupLocation" label="Pickup address" placeholder="e.g. 12 Admiralty Way, Lekki Phase 1" autoComplete="street-address" {...bind('pickupLocation')} />
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Input id="f-pickupContact" label="Contact name" placeholder="Who hands over the package" {...bind('pickupContact')} />
                        <Input id="f-pickupPhone" label="Contact phone" type="tel" inputMode="tel" placeholder="0801 234 5678" {...bind('pickupPhone')} />
                    </div>
                </FormSection>

                <FormSection step={2} title="Recipient">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Input id="f-customerName" label="Name" placeholder="Recipient's full name" {...bind('customerName')} />
                        <Input id="f-customerPhone" label="Phone" type="tel" inputMode="tel" placeholder="0809 876 5432" {...bind('customerPhone')} />
                    </div>
                    <Input id="f-customerAddress" label="Delivery address" placeholder="e.g. 4 Bourdillon Road, Ikoyi" {...bind('customerAddress')} />
                    <Input id="f-landmark" label="Landmark (optional)" placeholder="e.g. Opposite the filling station" {...bind('landmark')} />
                </FormSection>

                <FormSection step={3} title="Package">
                    <Input id="f-description" label="What's inside?" placeholder="e.g. 2 pairs of shoes" {...bind('description')} />
                    <div className="grid grid-cols-2 gap-4">
                        <Input id="f-weight" label="Weight (kg)" type="number" inputMode="decimal" min={0} step="0.1" placeholder="e.g. 2" {...bind('weight')} />
                        <Input id="f-value" label="Item value (₦)" type="number" inputMode="numeric" min={0} placeholder="e.g. 25000" {...bind('value')} />
                    </div>
                    <Textarea id="f-specialInstructions" label="Notes for the rider (optional)" rows={2} placeholder="e.g. Fragile, keep upright" {...bind('specialInstructions')} />
                </FormSection>

                <FormSection step={4} title="Delivery speed">
                    <div className="grid sm:grid-cols-3 gap-2.5">
                        {(['standard', 'express', 'same_day'] as DeliveryType[]).map((t) => (
                            <Choice
                                key={t}
                                selected={form.deliveryType === t}
                                onClick={() => set('deliveryType', t)}
                                title={DELIVERY_TYPE_LABELS[t]}
                                detail={t === 'standard' ? 'Best price' : t === 'express' ? 'Prioritised pickup' : 'Delivered today'}
                                price={formatCurrency(estimateDeliveryFee(weight, t, form.deliveryModel))}
                            />
                        ))}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                        <Choice selected={form.deliveryModel === 'Standard'} onClick={() => set('deliveryModel', 'Standard')} title="EcoRoutes fleet" detail="Our own riders" />
                        <Choice
                            selected={form.deliveryModel === 'Premium'}
                            onClick={() => set('deliveryModel', 'Premium')}
                            title="Premium"
                            detail={`Independent riders · +${Math.round((PREMIUM_MULTIPLIER - 1) * 100)}%`}
                        />
                    </div>
                </FormSection>
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-24">
                <Card>
                    <h2 className="text-[15px] font-bold text-ink mb-3">Summary</h2>
                    <dl className="space-y-2 text-sm">
                        <div className="flex justify-between gap-3">
                            <dt className="text-ink-secondary">To</dt>
                            <dd className="font-semibold text-ink text-right truncate">{form.customerAddress || '—'}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                            <dt className="text-ink-secondary">Speed</dt>
                            <dd className="font-semibold text-ink">{DELIVERY_TYPE_LABELS[form.deliveryType]}{form.deliveryModel === 'Premium' && ' · Premium'}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                            <dt className="text-ink-secondary">Weight</dt>
                            <dd className="font-semibold text-ink">{weight ? `${weight} kg` : '—'}</dd>
                        </div>
                    </dl>
                    <div className="flex items-end justify-between border-t border-line mt-4 pt-4">
                        <span className="text-sm text-ink-secondary">Delivery fee</span>
                        <span className="text-2xl font-bold text-ink">{formatCurrency(fee)}</span>
                    </div>

                    {payAsYouGo && (
                        <p className={cn('text-[13px] mt-2', shortBy > 0 ? 'text-danger font-medium' : 'text-ink-muted')}>
                            {shortBy > 0
                                ? `Wallet balance ${formatCurrency(balance)}, so you're ${formatCurrency(shortBy)} short.`
                                : `Paid from your wallet (${formatCurrency(balance)} available).`}
                        </p>
                    )}

                    {serverMessage && (
                        <div role="alert" className="mt-4 p-3 rounded-xl bg-danger-subtle text-danger text-sm font-medium">
                            {serverMessage}
                            {insufficientFunds && (
                                <Link to="/client/payments" className="block mt-1 underline">Top up your wallet</Link>
                            )}
                        </div>
                    )}

                    {shortBy > 0 ? (
                        <Link
                            to="/client/payments"
                            className="mt-4 h-12 w-full rounded-xl bg-primary text-white font-semibold text-[15px] inline-flex items-center justify-center gap-2 hover:bg-primary-hover"
                        >
                            <Icon name="account_balance_wallet" className="text-[20px]" /> Top up wallet
                        </Link>
                    ) : (
                        <Button type="submit" size="lg" fullWidth className="mt-4" isLoading={isPending}>
                            Book delivery
                        </Button>
                    )}
                    <p className="text-[12px] text-ink-muted mt-3 text-center">You'll see live status in Orders once a rider is assigned.</p>
                </Card>
            </div>
        </form>
    );
};

export default ClientNewOrder;
