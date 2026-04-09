import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClientRegisterCorporate } from '../hooks/useClientAuth';

interface FormState {
    company: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
    registrationNumber: string;
    estimatedMonthlyVolume: string;
}

const INITIAL: FormState = {
    company: '', contactName: '', email: '', phone: '', address: '', registrationNumber: '', estimatedMonthlyVolume: '',
};

const CorporateSignup: React.FC = () => {
    const navigate = useNavigate();
    const { mutateAsync: register, isPending } = useClientRegisterCorporate();
    const [form, setForm] = useState<FormState>(INITIAL);
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
        setErrors((p) => ({ ...p, [name]: undefined }));
    };

    const validate = (): boolean => {
        const e: Partial<FormState> = {};
        if (!form.company.trim()) e.company = 'Required';
        if (!form.contactName.trim()) e.contactName = 'Required';
        if (!form.email.trim()) e.email = 'Required';
        if (!form.phone.trim()) e.phone = 'Required';
        if (!form.registrationNumber.trim()) e.registrationNumber = 'Company RC Number required';
        if (!form.estimatedMonthlyVolume.trim()) e.estimatedMonthlyVolume = 'Please select estimated volume';

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            await register({
                company: form.company,
                contactName: form.contactName,
                email: form.email,
                phone: form.phone,
                address: form.address,
                registrationNumber: form.registrationNumber,
                estimatedMonthlyVolume: form.estimatedMonthlyVolume,
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
                    <div className="size-16 bg-blue-50 border-2 border-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <span className="material-symbols-outlined text-blue-500 text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Application Received</h2>
                    <p className="text-sm text-slate-500 mb-6">
                        Thank you for applying for a Corporate Post-Paid account for <strong>{form.company}</strong>. Our team will review your details (RC: {form.registrationNumber}) and contact you at <strong>{form.email}</strong> within 1-2 business days to set up your credit limit and dashboard access.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition-all"
                    >
                        Return to Homepage
                    </Link>
                </div>
            </div>
        );
    }

    const field = (
        name: keyof FormState,
        label: string,
        type = 'text',
        placeholder = '',
        extra?: React.ReactNode
    ) => (
        <div>
            <label htmlFor={`cs-${name}`} className="block text-[12px] font-semibold text-slate-700 mb-1.5">{label}</label>
            <div className="relative">
                <input
                    id={`cs-${name}`}
                    name={name}
                    type={type}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`w-full h-11 px-4 rounded-xl border bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                />
                {extra}
            </div>
            {errors[name] && <p className="text-[11px] text-red-500 mt-1">{errors[name]}</p>}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center p-6">
            <div className="w-full max-w-[480px]">
                {/* Header */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="size-8 rounded-xl bg-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>business</span>
                    </div>
                    <p className="text-[14px] font-bold text-slate-900">EcoRoute Corporate</p>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-1">Apply for Corporate Invoicing</h1>
                <p className="text-sm text-slate-500 mb-8">Consolidate your billing to a single monthly invoice with a dedicated credit limit.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Company section */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Company Details</p>
                        {field('company', 'Company name', 'text', 'Acme Logistics Ltd.')}
                        {field('registrationNumber', 'Registration Number (CAC)', 'text', 'RC-123456')}
                        {field('address', 'Business address', 'text', '123 Main Street, Lagos')}

                        <div>
                            <label htmlFor="cs-estimatedMonthlyVolume" className="block text-[12px] font-semibold text-slate-700 mb-1.5">Estimated Monthly Deliveries</label>
                            <select
                                id="cs-estimatedMonthlyVolume"
                                name="estimatedMonthlyVolume"
                                value={form.estimatedMonthlyVolume}
                                onChange={handleChange}
                                className={`w-full h-11 px-4 rounded-xl border bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${errors.estimatedMonthlyVolume ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                            >
                                <option value="" disabled>Select approximate volume</option>
                                <option value="50-100">50 - 100 deliveries</option>
                                <option value="100-500">100 - 500 deliveries</option>
                                <option value="500-1000">500 - 1,000 deliveries</option>
                                <option value="1000+">1,000+ deliveries</option>
                            </select>
                            {errors.estimatedMonthlyVolume && <p className="text-[11px] text-red-500 mt-1">{errors.estimatedMonthlyVolume}</p>}
                        </div>
                    </div>

                    {/* Contact section */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Primary Contact Person</p>
                        {field('contactName', 'Full name', 'text', 'John Doe')}
                        {field('email', 'Work Email address', 'email', 'john@company.com')}
                        {field('phone', 'Phone number', 'tel', '+234 800 000 0000')}
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full h-11 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                        {isPending ? (
                            <>
                                <svg className="animate-spin size-4 text-white" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Submitting application...
                            </>
                        ) : 'Submit Application'}
                    </button>

                    <p className="text-center text-[12px] text-slate-500">
                        Looking for a standard Pay-As-You-Go account?{' '}
                        <Link to="/client/signup" className="text-primary font-semibold hover:underline">Sign up instantly here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default CorporateSignup;
