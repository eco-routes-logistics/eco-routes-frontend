import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientAuthStore } from '@/stores/clientAuthStore';
import { useOrderStore } from '@/stores/orderStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { DELIVERY_TYPES } from '@/utils/constants';
import { generateOrderId, formatDate } from '@/utils/seedData';

const STEPS = ['Pickup', 'Delivery', 'Package', 'Review'];

const ClientNewOrder: React.FC = () => {
    const { loggedInClient } = useClientAuthStore();
    const { addOrder } = useOrderStore();
    const { system } = useSettingsStore();
    const navigate = useNavigate();
    const currencySymbol = system.currency === 'NGN' ? '₦' : '£';

    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        // Pickup
        pickupLocation: '',
        pickupContact: '',
        pickupPhone: '',
        // Delivery
        customerName: '',
        customerPhone: '',
        customerAddress: '',
        landmark: '',
        // Package
        description: '',
        weight: '',
        value: '',
        deliveryType: DELIVERY_TYPES.STANDARD as string,
        specialInstructions: '',
    });

    const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

    const canProceed = () => {
        if (step === 0) return form.pickupLocation && form.pickupContact && form.pickupPhone;
        if (step === 1) return form.customerName && form.customerPhone && form.customerAddress;
        if (step === 2) return form.description && form.weight && form.value;
        return true;
    };

    const handleSubmit = () => {
        if (!loggedInClient) return;
        setIsSubmitting(true);
        setTimeout(() => {
            const orderId = generateOrderId();
            addOrder({
                id: orderId,
                trackingId: `TRK-${orderId.replace('ORD-', '')}`,
                customer: form.customerName,
                customerPhone: form.customerPhone,
                customerLocation: form.customerAddress,
                businessClient: loggedInClient.company,
                businessClientId: loggedInClient.id,
                status: 'Pending' as any,
                deliveryType: form.deliveryType as any,
                weight: `${form.weight}kg`,
                value: `${currencySymbol}${Number(form.value).toLocaleString()}`,
                description: form.description,
                specialInstructions: form.specialInstructions,
                pickupLocation: form.pickupLocation,
                deliveryLocation: form.customerAddress,
                landmark: form.landmark,
                date: formatDate(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                totalFee: Number(form.value),
            });
            setIsSubmitting(false);
            navigate('/client/orders');
        }, 800);
    };

    const inputClass = 'w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm font-medium outline-none transition-all';
    const labelClass = 'block text-xs font-bold text-slate-500 uppercase mb-1.5';

    return (
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white">Place New Order</h1>
                    <p className="text-slate-500 text-sm mt-1">Fill in the delivery details below</p>
                </div>

                {/* Step indicator */}
                <div className="flex items-center gap-2">
                    {STEPS.map((s, i) => (
                        <React.Fragment key={s}>
                            <div className={`flex items-center gap-2 ${i <= step ? 'text-primary' : 'text-slate-300 dark:text-gray-600'}`}>
                                <div className={`size-7 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${i < step ? 'bg-primary border-primary text-white' :
                                        i === step ? 'border-primary text-primary bg-primary/10' :
                                            'border-slate-200 dark:border-gray-700 text-slate-400'
                                    }`}>
                                    {i < step ? <span className="material-symbols-outlined text-[14px]">check</span> : i + 1}
                                </div>
                                <span className="text-xs font-bold hidden sm:block">{s}</span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={`flex-1 h-0.5 rounded-full transition-all ${i < step ? 'bg-primary' : 'bg-slate-200 dark:bg-gray-700'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Form card */}
                <div className="bg-white dark:bg-[#1a202c] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-5">
                    {/* Step 0: Pickup */}
                    {step === 0 && (
                        <>
                            <h2 className="font-black text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">location_on</span> Pickup Details
                            </h2>
                            <div>
                                <label className={labelClass}>Pickup Location *</label>
                                <input className={inputClass} placeholder="e.g. 15 Allen Avenue, Ikeja, Lagos" value={form.pickupLocation} onChange={(e) => update('pickupLocation', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Contact Person *</label>
                                    <input className={inputClass} placeholder="Name at pickup" value={form.pickupContact} onChange={(e) => update('pickupContact', e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelClass}>Contact Phone *</label>
                                    <input className={inputClass} type="tel" placeholder="+234 801 234 5678" value={form.pickupPhone} onChange={(e) => update('pickupPhone', e.target.value)} />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Step 1: Delivery */}
                    {step === 1 && (
                        <>
                            <h2 className="font-black text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">person_pin_circle</span> Delivery Details
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Recipient Name *</label>
                                    <input className={inputClass} placeholder="Customer full name" value={form.customerName} onChange={(e) => update('customerName', e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelClass}>Recipient Phone *</label>
                                    <input className={inputClass} type="tel" placeholder="+234 802 345 6789" value={form.customerPhone} onChange={(e) => update('customerPhone', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Delivery Address *</label>
                                <input className={inputClass} placeholder="Full delivery address" value={form.customerAddress} onChange={(e) => update('customerAddress', e.target.value)} />
                            </div>
                            <div>
                                <label className={labelClass}>Landmark (Optional)</label>
                                <input className={inputClass} placeholder="Near a notable landmark" value={form.landmark} onChange={(e) => update('landmark', e.target.value)} />
                            </div>
                        </>
                    )}

                    {/* Step 2: Package */}
                    {step === 2 && (
                        <>
                            <h2 className="font-black text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">inventory_2</span> Package Details
                            </h2>
                            <div>
                                <label className={labelClass}>Package Description *</label>
                                <input className={inputClass} placeholder="e.g. Electronics, Clothing, Documents" value={form.description} onChange={(e) => update('description', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Weight (kg) *</label>
                                    <input className={inputClass} type="number" min="0.1" step="0.1" placeholder="e.g. 2.5" value={form.weight} onChange={(e) => update('weight', e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelClass}>Declared Value ({currencySymbol}) *</label>
                                    <input className={inputClass} type="number" min="0" placeholder="e.g. 15000" value={form.value} onChange={(e) => update('value', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Delivery Type *</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {Object.values(DELIVERY_TYPES).map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => update('deliveryType', type)}
                                            className={`p-3 rounded-xl border-2 text-sm font-bold text-left transition-all ${form.deliveryType === type
                                                    ? 'border-primary bg-primary/5 text-primary'
                                                    : 'border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-400 hover:border-primary/50'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Special Instructions (Optional)</label>
                                <textarea
                                    className={inputClass}
                                    rows={2}
                                    placeholder="Fragile, keep upright, call before delivery..."
                                    value={form.specialInstructions}
                                    onChange={(e) => update('specialInstructions', e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    {/* Step 3: Review */}
                    {step === 3 && (
                        <>
                            <h2 className="font-black text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">fact_check</span> Review & Confirm
                            </h2>
                            {[
                                { section: 'Pickup', items: [['Location', form.pickupLocation], ['Contact', form.pickupContact], ['Phone', form.pickupPhone]] },
                                { section: 'Delivery', items: [['Recipient', form.customerName], ['Phone', form.customerPhone], ['Address', form.customerAddress], form.landmark ? ['Landmark', form.landmark] : null].filter(Boolean) as [string, string][] },
                                { section: 'Package', items: [['Description', form.description], ['Weight', `${form.weight}kg`], ['Value', `${currencySymbol}${Number(form.value).toLocaleString()}`], ['Type', form.deliveryType]] },
                            ].map(({ section, items }) => (
                                <div key={section} className="bg-slate-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-2">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{section}</p>
                                    {items.map(([label, value]) => (
                                        <div key={label} className="flex justify-between text-sm">
                                            <span className="text-slate-500">{label}</span>
                                            <span className="font-bold text-slate-900 dark:text-white text-right max-w-[60%]">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                    {step > 0 && (
                        <button
                            onClick={() => setStep((s) => s - 1)}
                            className="px-6 py-3 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-bold text-sm text-slate-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                        >
                            ← Back
                        </button>
                    )}
                    {step < STEPS.length - 1 ? (
                        <button
                            onClick={() => setStep((s) => s + 1)}
                            disabled={!canProceed()}
                            className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:opacity-40"
                        >
                            Continue →
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <><span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span> Submitting...</>
                            ) : (
                                <><span className="material-symbols-outlined text-[18px]">check_circle</span> Confirm & Place Order</>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientNewOrder;
