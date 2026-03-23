import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRiderAuthStore } from '@/stores/riderAuthStore';

const RiderLogin: React.FC = () => {
    const { login, authError, clearError } = useRiderAuthStore();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 600));
        const success = login(email.trim(), password);
        setIsLoading(false);
        if (success) navigate('/rider/dashboard');
    };

    const fillDemo = (demoEmail: string, demoPass: string) => {
        clearError();
        setEmail(demoEmail);
        setPassword(demoPass);
    };

    const inputClass =
        'w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm font-medium outline-none transition-all text-slate-800 dark:text-white placeholder:text-slate-400';

    return (
        <div className="min-h-screen flex">
            {/* Left panel */}
            <div className="hidden lg:flex lg:w-[45%] bg-[#0f1117] flex-col justify-between p-12">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>delivery_dining</span>
                    <p className="text-[18px] font-black text-white tracking-widest uppercase">EcoRoute</p>
                </div>

                <div>
                    <h1 className="text-4xl font-black text-white leading-tight mb-4">
                        Rider Portal
                    </h1>
                    <p className="text-zinc-400 text-[15px] leading-relaxed mb-10">
                        Sign in to view jobs, manage deliveries, and track your earnings.
                    </p>

                    <div className="space-y-4">
                        {[
                            { icon: 'local_shipping', text: 'View and accept available jobs' },
                            { icon: 'payments', text: 'Track earnings per delivery' },
                            { icon: 'task_alt', text: 'Update delivery status on the go' },
                            { icon: 'person', text: 'Manage your rider profile' },
                        ].map((item) => (
                            <div key={item.icon} className="flex items-center gap-3">
                                <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                                </div>
                                <p className="text-zinc-300 text-[14px] font-medium">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-zinc-600 text-[12px]">© 2024 EcoRoutes. All rights reserved.</p>
            </div>

            {/* Right panel */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-[#0d0f14]">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Rider Login</h2>
                        <p className="text-slate-500 text-sm mt-1">Sign in to your rider account</p>
                    </div>

                    {authError && (
                        <div className="mb-5 flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                            <span className="material-symbols-outlined text-red-500 text-[18px] flex-shrink-0 mt-0.5">error_outline</span>
                            <p className="text-red-600 dark:text-red-400 text-sm font-medium">{authError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="rider@ecoroutes.com"
                                className={inputClass}
                                required
                                autoFocus
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className={inputClass}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-primary text-white rounded-xl font-bold text-[15px] hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Signing in...
                                </>
                            ) : 'Sign in'}
                        </button>
                    </form>

                    {/* Demo credentials */}
                    <div className="mt-6 p-4 border-2 border-dashed border-slate-200 dark:border-gray-700 rounded-xl">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Demo Accounts</p>
                        <div className="space-y-2">
                            {[
                                { name: 'Mike Ross', email: 'mike.ross@ecoroutes.com', pass: 'mike123', vehicle: 'Motorcycle' },
                                { name: 'Sarah Connor', email: 'sarah.connor@ecoroutes.com', pass: 'sarah123', vehicle: 'Van' },
                                { name: 'Bruce Banner', email: 'bruce.banner@ecoroutes.com', pass: 'bruce123', vehicle: 'Motorcycle' },
                            ].map((d) => (
                                <button
                                    key={d.email}
                                    type="button"
                                    onClick={() => fillDemo(d.email, d.pass)}
                                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 transition-all text-left"
                                >
                                    <div>
                                        <p className="text-[13px] font-bold text-slate-800 dark:text-white">{d.name}</p>
                                        <p className="text-[11px] text-slate-400">{d.vehicle} · {d.pass}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 text-[16px]">arrow_forward</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 text-center space-y-2">
                        <p className="text-sm text-slate-500">
                            New rider?{' '}
                            <Link to="/rider/signup" className="text-primary font-semibold hover:underline">
                                Apply to join
                            </Link>
                        </p>
                        <p className="text-sm text-slate-500">
                            Admin?{' '}
                            <Link to="/login" className="text-primary font-semibold hover:underline">
                                Admin login
                            </Link>
                            {' · '}
                            <Link to="/client/login" className="text-primary font-semibold hover:underline">
                                Client login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiderLogin;
