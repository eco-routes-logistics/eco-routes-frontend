import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClientStore } from '@/stores/clientStore';

interface FormState {
    company: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    confirmPassword: string;
}

const INITIAL: FormState = {
    company: '', contactName: '', email: '', phone: '', address: '', password: '', confirmPassword: '',
};

const ClientSignup: React.FC = () => {
    const { addClient } = useClientStore();
    const navigate = useNavigate();
    const [form, setForm] = useState<FormState>(INITIAL);
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showPw, setShowPw] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        if (form.password.length < 6) e.password = 'Min 6 characters';
        if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        addClient({
            id: `CLI-${Date.now()}`,
            company: form.company,
            contactName: form.contactName,
            email: form.email,
            phone: form.phone,
            address: form.address,
            password: form.password,
            totalOrders: 0,
            activeOrders: 0,
            status: 'pending',
            createdAt: new Date().toISOString(),
        });
        setIsLoading(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center p-6">
                <div className="w-full max-w-md text-center">
                    <div className="size-16 bg-emerald-50 border-2 border-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <span className="material-symbols-outlined text-emerald-500 text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Application submitted</h2>
                    <p className="text-sm text-slate-500 mb-6">
                        Your account for <strong>{form.company}</strong> is under review. We'll notify you at <strong>{form.email}</strong> once approved — usually within 24 hours.
                    </p>
                    <Link
                        to="/client/login"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition-all"
                    >
                        Back to sign in
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
            <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">{label}</label>
            <div className="relative">
                <input
                    name={name}
                    type={name === 'password' || name === 'confirmPassword' ? (showPw ? 'text' : 'password') : type}
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
                        <span className="material-symbols-outlined text-white text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                    </div>
                    <p className="text-[14px] font-bold text-slate-900">EcoRoute</p>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-1">Apply for access</h1>
                <p className="text-sm text-slate-500 mb-8">Create a business account — our team will review and approve within 24 hours.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Company section */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Company Details</p>
                        {field('company', 'Company name', 'text', 'Acme Logistics Ltd.')}
                        {field('address', 'Business address', 'text', '123 Main Street, Lagos')}
                    </div>

                    {/* Contact section */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Contact Person</p>
                        {field('contactName', 'Full name', 'text', 'John Doe')}
                        {field('email', 'Email address', 'email', 'john@company.com')}
                        {field('phone', 'Phone number', 'tel', '+234 800 000 0000')}
                    </div>

                    {/* Password section */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Security</p>
                            <button type="button" onClick={() => setShowPw(!showPw)} className="text-[11px] text-slate-400 hover:text-primary flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">{showPw ? 'visibility_off' : 'visibility'}</span>
                                {showPw ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {field('password', 'Password', 'password', 'Min 6 characters')}
                        {field('confirmPassword', 'Confirm password', 'password', 'Repeat password')}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-11 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin size-4 text-white" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Submitting...
                            </>
                        ) : 'Submit application'}
                    </button>

                    <p className="text-center text-[12px] text-slate-500">
                        Already have an account?{' '}
                        <Link to="/client/login" className="text-primary font-semibold hover:underline">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ClientSignup;
