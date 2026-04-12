import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useRiderRegister } from '../hooks/useRiderAuth';

const STEPS = ['Personal Info', 'Vehicle', 'Verification', 'Review'];

const VEHICLE_TYPES = ['Motorcycle', 'Bicycle', 'Car', 'Van', 'Truck'];
const ID_TYPES = [
    { label: "NIN Card", value: "nin_card" },
    { label: "Driver's License", value: "drivers_license" },
    { label: "Voter's Card", value: "voters_card" },
    { label: "International Passport", value: "international_passport" },
];

interface FormState {
    // Step 1
    name: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    // Step 2
    vehicleType: string;
    vehicleNumber: string;
    // Step 3
    nin: string;
    idType: string;
    idDocumentFile: File | null;
    idDocumentUrl: string;
    passportPhotoFile: File | null;
    passportPhotoUrl: string;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = {
    name: '', phone: '', email: '', password: '', confirmPassword: '',
    vehicleType: 'Motorcycle', vehicleNumber: '',
    nin: '', idType: '', idDocumentFile: null, idDocumentUrl: '', passportPhotoFile: null, passportPhotoUrl: '',
};

const inputClass = 'w-full h-11 px-4 rounded-xl border bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all';
const errorInput = 'border-red-300 bg-red-50';
const normalInput = 'border-gray-200';

const RiderSignup: React.FC = () => {
    const { mutateAsync: register, isPending } = useRiderRegister();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<FormState>(INITIAL);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [showPw, setShowPw] = useState(false);

    const idDocRef = useRef<HTMLInputElement>(null);
    const passportRef = useRef<HTMLInputElement>(null);

    const set = (field: keyof FormState, value: string | File | null) =>
        setForm((f) => ({ ...f, [field]: value }));

    const clearError = (field: keyof FormState) =>
        setErrors((e) => ({ ...e, [field]: undefined }));

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fileField: 'idDocumentFile' | 'passportPhotoFile',
        urlField: 'idDocumentUrl' | 'passportPhotoUrl'
    ) => {
        const file = e.target.files?.[0] ?? null;
        if (file) {
            const url = URL.createObjectURL(file);
            setForm((f) => ({ ...f, [fileField]: file, [urlField]: url }));
            clearError(fileField);
        }
    };

    const validateStep = (s: number): boolean => {
        const e: FieldErrors = {};
        if (s === 1) {
            if (!form.name.trim()) e.name = 'Required';
            if (!form.phone.trim()) e.phone = 'Required';
            if (!form.email.trim()) e.email = 'Required';
            else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
            if (form.password.length < 6) e.password = 'Min 6 characters';
            if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
        }
        if (s === 2) {
            if (!form.vehicleNumber.trim()) e.vehicleNumber = 'Required';
        }
        if (s === 3) {
            if (!form.nin.trim()) e.nin = 'Required';
            else if (form.nin.replace(/\s/g, '').length !== 11) e.nin = 'NIN must be 11 digits';
            if (!form.idType) e.idType = 'Required';
            if (!form.idDocumentFile) e.idDocumentFile = 'Required';
            if (!form.passportPhotoFile) e.passportPhotoFile = 'Required';
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const next = () => {
        if (validateStep(step)) setStep((s) => s + 1);
    };

    const back = () => setStep((s) => s - 1);

    const handleSubmit = async () => {
        try {
            await register({
                name: form.name,
                phone: form.phone,
                email: form.email,
                password: form.password,
                vehicleType: form.vehicleType,
                vehicleNumber: form.vehicleNumber,
                nin: form.nin,
                idType: form.idType,
                idDocument: form.idDocumentFile!,
                passportPhoto: form.passportPhotoFile!,
            });
            setSubmitted(true);
        } catch {
            // error toast handled in hook
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center p-6">
                <div className="w-full max-w-md text-center">
                    <div className="size-16 bg-emerald-50 border-2 border-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <span className="material-symbols-outlined text-emerald-500 text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Application Submitted</h2>
                    <p className="text-sm text-slate-500 mb-6">
                        Thank you, <strong>{form.name}</strong>. Your application is under review. We will notify you at <strong>{form.email}</strong> once it has been approved.
                    </p>
                    <Link
                        to="/rider/login"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition-all"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center p-6">
            <div className="w-full max-w-[520px]">

                {/* Header */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="size-8 rounded-xl bg-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>delivery_dining</span>
                    </div>
                    <p className="text-[14px] font-bold text-slate-900">EcoRoute</p>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-1">Apply as a Rider</h1>
                <p className="text-sm text-slate-500 mb-8">All applications are reviewed by our team before activation.</p>

                {/* Step indicator */}
                <div className="flex items-center mb-8">
                    {STEPS.map((label, i) => {
                        const num = i + 1;
                        const done = step > num;
                        const active = step === num;
                        return (
                            <React.Fragment key={label}>
                                <div className="flex flex-col items-center gap-1">
                                    <div className={`size-8 rounded-full flex items-center justify-center text-[13px] font-black border-2 transition-all ${done ? 'bg-primary border-primary text-white' : active ? 'border-primary bg-white text-primary' : 'border-gray-200 bg-white text-gray-300'}`}>
                                        {done
                                            ? <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                                            : num
                                        }
                                    </div>
                                    <span className={`text-[10px] font-bold hidden sm:block ${active ? 'text-primary' : 'text-slate-400'}`}>{label}</span>
                                </div>
                                {i < STEPS.length - 1 && (
                                    <div className={`flex-1 h-0.5 mx-1 mb-4 transition-all ${step > num ? 'bg-primary' : 'bg-gray-200'}`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Step 1 — Personal Info */}
                {step === 1 && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Personal Information</p>

                        <div>
                            <label htmlFor="rs-name" className="block text-[12px] font-semibold text-slate-700 mb-1.5">Full Name</label>
                            <input id="rs-name" className={`${inputClass} ${errors.name ? errorInput : normalInput}`} value={form.name} onChange={e => { set('name', e.target.value); clearError('name'); }} placeholder="John Doe" />
                            {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="rs-phone" className="block text-[12px] font-semibold text-slate-700 mb-1.5">Phone Number</label>
                            <input id="rs-phone" className={`${inputClass} ${errors.phone ? errorInput : normalInput}`} value={form.phone} onChange={e => { set('phone', e.target.value); clearError('phone'); }} placeholder="+234 800 000 0000" type="tel" />
                            {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                        </div>
                        <div>
                            <label htmlFor="rs-email" className="block text-[12px] font-semibold text-slate-700 mb-1.5">Email Address</label>
                            <input id="rs-email" className={`${inputClass} ${errors.email ? errorInput : normalInput}`} value={form.email} onChange={e => { set('email', e.target.value); clearError('email'); }} placeholder="john@email.com" type="email" />
                            {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="rs-password" className="block text-[12px] font-semibold text-slate-700">Password</label>
                                <button type="button" onClick={() => setShowPw(!showPw)} className="text-[11px] text-slate-400 hover:text-primary flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">{showPw ? 'visibility_off' : 'visibility'}</span>
                                    {showPw ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            <input id="rs-password" className={`${inputClass} ${errors.password ? errorInput : normalInput}`} value={form.password} onChange={e => { set('password', e.target.value); clearError('password'); }} placeholder="Min 6 characters" type={showPw ? 'text' : 'password'} />
                            {errors.password && <p className="text-[11px] text-red-500 mt-1">{errors.password}</p>}
                        </div>
                        <div>
                            <label htmlFor="rs-confirm-password" className="block text-[12px] font-semibold text-slate-700 mb-1.5">Confirm Password</label>
                            <input id="rs-confirm-password" className={`${inputClass} ${errors.confirmPassword ? errorInput : normalInput}`} value={form.confirmPassword} onChange={e => { set('confirmPassword', e.target.value); clearError('confirmPassword'); }} placeholder="Repeat password" type={showPw ? 'text' : 'password'} />
                            {errors.confirmPassword && <p className="text-[11px] text-red-500 mt-1">{errors.confirmPassword}</p>}
                        </div>
                    </div>
                )}

                {/* Step 2 — Vehicle Info */}
                {step === 2 && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Vehicle Information</p>

                        <div>
                            <label htmlFor="rs-vehicle-type" className="block text-[12px] font-semibold text-slate-700 mb-1.5">Vehicle Type</label>
                            <select id="rs-vehicle-type" className={`${inputClass} ${normalInput}`} value={form.vehicleType} onChange={e => set('vehicleType', e.target.value)}>
                                {VEHICLE_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="rs-vehicle-number" className="block text-[12px] font-semibold text-slate-700 mb-1.5">Plate / Vehicle Number</label>
                            <input id="rs-vehicle-number" className={`${inputClass} ${errors.vehicleNumber ? errorInput : normalInput}`} value={form.vehicleNumber} onChange={e => { set('vehicleNumber', e.target.value); clearError('vehicleNumber'); }} placeholder="e.g. LND 123 AB" />
                            {errors.vehicleNumber && <p className="text-[11px] text-red-500 mt-1">{errors.vehicleNumber}</p>}
                        </div>
                    </div>
                )}

                {/* Step 3 — KYC */}
                {step === 3 && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Identity Verification</p>

                        <div>
                            <label htmlFor="rs-nin" className="block text-[12px] font-semibold text-slate-700 mb-1.5">NIN (National Identification Number)</label>
                            <input
                                id="rs-nin"
                                className={`${inputClass} ${errors.nin ? errorInput : normalInput}`}
                                value={form.nin}
                                onChange={e => { set('nin', e.target.value); clearError('nin'); }}
                                placeholder="11-digit NIN"
                                maxLength={11}
                            />
                            {errors.nin && <p className="text-[11px] text-red-500 mt-1">{errors.nin}</p>}
                        </div>

                        <div>
                            <label htmlFor="rs-id-type" className="block text-[12px] font-semibold text-slate-700 mb-1.5">ID Document Type</label>
                            <select id="rs-id-type" className={`${inputClass} ${errors.idType ? errorInput : normalInput}`} value={form.idType} onChange={e => { set('idType', e.target.value); clearError('idType'); }}>
                                <option value="">Select ID type</option>
                                {ID_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                            </select>
                            {errors.idType && <p className="text-[11px] text-red-500 mt-1">{errors.idType}</p>}
                        </div>

                        {/* ID Document upload */}
                        <div>
                            <label htmlFor="rs-id-doc" className="block text-[12px] font-semibold text-slate-700 mb-1.5">ID Document Photo</label>
                            <input id="rs-id-doc" ref={idDocRef} type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, 'idDocumentFile', 'idDocumentUrl')} />
                            {form.idDocumentUrl ? (
                                <div className="relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 group">
                                    <img src={form.idDocumentUrl} alt="ID Document" className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => idDocRef.current?.click()} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-[12px] font-bold">Change</span>
                                    </button>
                                </div>
                            ) : (
                                <button type="button" onClick={() => idDocRef.current?.click()} className={`w-full h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-all hover:border-primary hover:bg-primary/5 ${errors.idDocumentFile ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                                    <span className="material-symbols-outlined text-slate-400 text-[24px]">upload_file</span>
                                    <span className="text-[12px] text-slate-500 font-medium">Upload ID document</span>
                                </button>
                            )}
                            {errors.idDocumentFile && <p className="text-[11px] text-red-500 mt-1">{errors.idDocumentFile}</p>}
                        </div>

                        {/* Passport photo upload */}
                        <div>
                            <label htmlFor="rs-passport" className="block text-[12px] font-semibold text-slate-700 mb-1.5">Passport Photo / Selfie</label>
                            <input id="rs-passport" ref={passportRef} type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, 'passportPhotoFile', 'passportPhotoUrl')} />
                            {form.passportPhotoUrl ? (
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200 group">
                                    <img src={form.passportPhotoUrl} alt="Passport Photo" className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => passportRef.current?.click()} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                        <span className="text-white text-[11px] font-bold">Change</span>
                                    </button>
                                </div>
                            ) : (
                                <button type="button" onClick={() => passportRef.current?.click()} className={`w-24 h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-all hover:border-primary hover:bg-primary/5 ${errors.passportPhotoFile ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                                    <span className="material-symbols-outlined text-slate-400 text-[24px]">photo_camera</span>
                                    <span className="text-[10px] text-slate-500 font-medium text-center leading-tight">Passport photo</span>
                                </button>
                            )}
                            {errors.passportPhotoFile && <p className="text-[11px] text-red-500 mt-1">{errors.passportPhotoFile}</p>}
                        </div>
                    </div>
                )}

                {/* Step 4 — Review */}
                {step === 4 && (
                    <div className="space-y-3">
                        {[
                            {
                                title: 'Personal Info',
                                rows: [
                                    ['Name', form.name],
                                    ['Phone', form.phone],
                                    ['Email', form.email],
                                ],
                            },
                            {
                                title: 'Vehicle',
                                rows: [
                                    ['Type', form.vehicleType],
                                    ['Plate', form.vehicleNumber],
                                ],
                            },
                            {
                                title: 'Identity',
                                rows: [
                                    ['NIN', `${form.nin.slice(0, 3)}${'•'.repeat(5)}${form.nin.slice(-3)}`],
                                    ['ID Type', ID_TYPES.find(t => t.value === form.idType)?.label ?? form.idType],
                                ],
                            },
                        ].map(section => (
                            <div key={section.title} className="bg-white rounded-2xl border border-gray-200 p-5">
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">{section.title}</p>
                                <div className="space-y-2">
                                    {section.rows.map(([label, value]) => (
                                        <div key={label} className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500">{label}</span>
                                            <span className="font-semibold text-slate-800">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Document thumbnails */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-5">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Documents</p>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
                                        <img src={form.idDocumentUrl} alt="ID" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium">ID Document</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
                                        <img src={form.passportPhotoUrl} alt="Passport" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium">Passport Photo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation buttons */}
                <div className="flex gap-3 mt-5">
                    {step > 1 && (
                        <button type="button" onClick={back} className="px-6 h-11 border-2 border-gray-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-gray-50 transition-all">
                            Back
                        </button>
                    )}
                    {step < 4 ? (
                        <button type="button" onClick={next} className="flex-1 h-11 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition-all">
                            Continue
                        </button>
                    ) : (
                        <button type="button" onClick={handleSubmit} disabled={isPending} className="flex-1 h-11 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                            {isPending ? (
                                <>
                                    <svg className="animate-spin size-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Submitting...
                                </>
                            ) : 'Submit Application'}
                        </button>
                    )}
                </div>

                <p className="text-center text-[12px] text-slate-500 mt-4">
                    Already have an account?{' '}
                    <Link to="/rider/login" className="text-primary font-semibold hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default RiderSignup;
