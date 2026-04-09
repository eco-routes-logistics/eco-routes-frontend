import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClientLogin } from '../hooks/useClientAuth';

const ClientLogin: React.FC = () => {
    const { mutate: loginMutate, isPending } = useClientLogin();
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutate(form);
    };

    const fillDemo = () => {
        setForm({ email: 'orders@farmchops.com', password: 'farmchops123' });
    };

    return (
        <div className="min-h-screen bg-[#f7f8fa] flex">
            {/* Left panel */}
            <div className="hidden lg:flex w-[420px] flex-shrink-0 bg-[#0f1117] flex-col justify-between p-10">
                <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
                        <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                    </div>
                    <div>
                        <p className="text-[14px] font-bold text-white leading-none">EcoRoute</p>
                        <p className="text-[10px] text-white/30 font-medium">Business Portal</p>
                    </div>
                </div>

                <div>
                    <div className="space-y-6 mb-10">
                        {[
                            { icon: 'bolt', title: 'Real-time tracking', desc: 'Monitor every delivery from pickup to drop-off.' },
                            { icon: 'receipt_long', title: 'Instant invoicing', desc: 'Auto-generated invoices for every completed order.' },
                            { icon: 'group', title: 'Team management', desc: 'Manage multiple contacts under one account.' },
                        ].map((f) => (
                            <div key={f.title} className="flex items-start gap-3">
                                <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>{f.icon}</span>
                                </div>
                                <div>
                                    <p className="text-[13px] font-semibold text-white">{f.title}</p>
                                    <p className="text-[12px] text-white/40 mt-0.5">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-[11px] text-white/20">© 2025 EcoRoute Logistics. All rights reserved.</p>
                </div>
            </div>

            {/* Right panel */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-[400px]">
                    {/* Mobile logo */}
                    <div className="flex items-center gap-2 mb-8 lg:hidden">
                        <div className="size-8 rounded-xl bg-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                        </div>
                        <p className="text-[14px] font-bold text-slate-900">EcoRoute</p>
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Sign in</h1>
                    <p className="text-sm text-slate-500 mb-8">Access your business delivery portal</p>

                    {/* Demo hint */}
                    <button
                        type="button"
                        onClick={fillDemo}
                        className="w-full mb-6 py-2.5 px-4 rounded-xl border border-dashed border-slate-300 text-[12px] text-slate-500 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
                        Use demo credentials
                    </button>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Email address</label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@company.com"
                                required
                                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-[12px] font-semibold text-slate-700">Password</label>
                            </div>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full h-11 px-4 pr-11 rounded-xl border border-gray-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <span className="material-symbols-outlined text-[18px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
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
                                    Signing in...
                                </>
                            ) : 'Sign in'}
                        </button>
                    </form>

                    <p className="text-center text-[12px] text-slate-500 mt-6">
                        Don't have an account?{' '}
                        <Link to="/client/signup" className="text-primary font-semibold hover:underline">Apply for access</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ClientLogin;
