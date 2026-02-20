import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const stats = [
    { value: '1.4B+', label: 'Deliveries guided' },
    { value: '98.4%', label: 'On-time rate' },
    { value: '500+', label: 'Business clients' },
    { value: '2 countries', label: 'Nigeria & UK' },
];

const steps = [
    {
        num: '01',
        icon: 'person_add',
        title: 'Create your account',
        desc: 'Sign up and get approved within 24 hours. Once active, log in from any device — desktop, laptop, tablet or mobile.',
    },
    {
        num: '02',
        icon: 'upload_file',
        title: 'Submit your deliveries',
        desc: 'Enter delivery addresses, recipient details, and package info directly in your portal. Bulk uploads and API integrations available.',
    },
    {
        num: '03',
        icon: 'route',
        title: 'We optimize & dispatch',
        desc: 'EcoRoute instantly calculates the fastest, most eco-friendly routes and assigns verified riders to your deliveries.',
    },
];

const features = [
    { icon: 'dashboard', label: 'Delivery Dashboard', desc: 'A single global view of every delivery in your business — so you never miss a beat or a package.' },
    { icon: 'smartphone', label: 'Mobile-first', desc: 'Clear, intuitive directions make it easy for riders to complete routes on time, every time.' },
    { icon: 'sensors', label: 'Real-time updates', desc: 'Know exactly what\'s happening with your riders and deliveries at all times, even as conditions change.' },
    { icon: 'bar_chart', label: 'Performance metrics', desc: 'Review and analyze your daily delivery performance with clear, meaningful data and reports.' },
    { icon: 'eco', label: 'Eco-friendly routing', desc: 'Our algorithm prioritizes fuel-efficient routes, reducing your carbon footprint with every delivery.' },
    { icon: 'receipt_long', label: 'Instant invoicing', desc: 'Auto-generated invoices for every completed order. Download, share, or export with one click.' },
];

const plans = [
    {
        name: 'Standard',
        price: { ngn: '₦45,000', gbp: '£30' },
        period: 'per month',
        highlight: false,
        badge: null,
        desc: 'Perfect for small and growing businesses that need reliable, trackable deliveries.',
        perks: [
            'Up to 30 deliveries/day',
            'Real-time order tracking',
            'Client portal access',
            'Auto-generated invoices',
            'Email & chat support',
        ],
        cta: 'Get started',
        ctaTo: '/client/signup',
    },
    {
        name: 'Premium (Marketplace)',
        price: { ngn: '₦120,000', gbp: '£80' },
        period: 'per month',
        highlight: true,
        badge: 'Most popular',
        desc: 'For high-volume businesses that need priority dispatch, analytics, and marketplace visibility.',
        perks: [
            'Unlimited deliveries/day',
            'Priority dispatch & routing',
            'Marketplace listing & exposure',
            'Advanced analytics & reports',
            'Dedicated account manager',
            'API & custom integrations',
            'SLA guarantee',
        ],
        cta: 'Get started',
        ctaTo: '/client/signup',
    },
];

const ticker = [
    'Real-time tracking', 'Express delivery', 'Business invoicing',
    'Rider network', 'Nigeria & UK', 'Same-day delivery',
    'Live dashboard', 'Instant notifications', 'Route optimization',
    'Eco-friendly routes', 'API integrations', 'Performance metrics',
];

const Landing: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animId: number;
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener('resize', resize);
        const particles = Array.from({ length: 55 }, () => ({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.5 + 0.5,
        }));
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(99,102,241,0.35)'; ctx.fill();
            });
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - dist / 120)})`; ctx.lineWidth = 0.6; ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, []);

    return (
        <div className="min-h-screen bg-[#050b1a] text-white flex flex-col relative" style={{ overflowX: 'clip' }}>
            {/* Global grid overlay */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:60px_60px] pointer-events-none z-0" />

            {/* Nav */}
            <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5 relative z-20 sticky top-0 bg-[#050b1a]/80 backdrop-blur-xl">
                <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
                        <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                    </div>
                    <div>
                        <p className="text-[14px] font-bold text-white leading-none">EcoRoute</p>
                        <p className="text-[10px] text-white/30 font-medium">Logistics</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-[13px] text-white/40 font-medium">
                    <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/client/login" className="px-4 py-2 text-[13px] font-semibold text-white/50 hover:text-white transition-colors">
                        Sign in
                    </Link>
                    <Link to="/client/signup" className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-[13px] font-bold rounded-xl transition-all shadow-lg shadow-primary/20">
                        Get started
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <div className="relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 overflow-hidden">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
                <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/12 blur-[140px] rounded-full pointer-events-none z-0" />
                <div className="absolute top-1/3 left-[-100px] w-[350px] h-[350px] bg-violet-600/8 blur-[100px] rounded-full pointer-events-none z-0" />
                <div className="absolute top-1/3 right-[-100px] w-[350px] h-[350px] bg-blue-600/8 blur-[100px] rounded-full pointer-events-none z-0" />


                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[12px] font-semibold mb-8 backdrop-blur-sm">
                        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                        Now serving Nigeria &amp; United Kingdom
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.02] mb-6">
                        The fastest, most<br />
                        <span className="bg-gradient-to-r from-primary via-violet-400 to-blue-400 bg-clip-text text-transparent">
                            eco-friendly routes
                        </span>
                    </h1>

                    <p className="text-lg text-white/45 max-w-2xl mx-auto mb-4 leading-relaxed font-medium">
                        EcoRoute finds the fastest, most economical &amp; eco-friendly delivery routes for your business. Focus on what you do best — we'll handle the logistics.
                    </p>
                    <p className="text-[13px] text-white/25 mb-10">No credit card required · 30-day free trial · Cancel anytime</p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                        <Link to="/client/signup" className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-primary text-white rounded-2xl text-[15px] font-bold hover:bg-primary-dark transition-all shadow-2xl shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]">
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                            Try it free for 30 days
                            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                        </Link>
                        <Link to="/client/login" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 text-white rounded-2xl text-[15px] font-semibold transition-all backdrop-blur-sm">
                            Sign in to your portal
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                        {stats.map((s) => (
                            <div key={s.label} className="bg-white/[0.03] backdrop-blur-sm px-6 py-5 text-center hover:bg-white/[0.06] transition-colors">
                                <p className="text-2xl font-black text-white mb-0.5">{s.value}</p>
                                <p className="text-[11px] text-white/35 font-medium">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



            {/* How it works */}
            <div id="how-it-works" className="px-8 py-24 relative z-10 scroll-mt-20">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-[11px] font-bold text-primary/60 uppercase tracking-widest mb-3">Simple as 1, 2, 3</p>
                        <h2 className="text-3xl font-black text-white">How EcoRoute works</h2>
                        <p className="text-white/40 mt-2 text-[14px] max-w-lg mx-auto">Getting started takes minutes. Our platform handles the complexity so you don't have to.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {steps.map((step) => (
                            <div key={step.num} className="relative bg-white/[0.03] border border-white/5 rounded-2xl p-7 hover:border-primary/20 hover:bg-white/[0.05] transition-all group">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="size-12 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>{step.icon}</span>
                                    </div>
                                    <span className="text-[11px] font-black text-white/15 tracking-widest">{step.num}</span>
                                </div>
                                <h3 className="text-[15px] font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-[13px] text-white/40 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features */}
            <div id="features" className="px-8 py-20 relative z-10 scroll-mt-20">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-[11px] font-bold text-primary/60 uppercase tracking-widest mb-3">Everything you need</p>
                        <h2 className="text-3xl font-black text-white">Manage your deliveries with confidence</h2>
                        <p className="text-white/40 mt-2 text-[14px]">Built from the ground up for B2B logistics operations in Nigeria and the UK.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {features.map((f) => (
                            <div key={f.label} className="group relative bg-white/[0.03] border border-white/5 hover:border-primary/30 rounded-2xl p-6 hover:bg-white/[0.06] transition-all duration-300">
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative z-10">
                                    <div className="size-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                                        <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>{f.icon}</span>
                                    </div>
                                    <p className="text-[14px] font-bold text-white mb-2">{f.label}</p>
                                    <p className="text-[12px] text-white/40 leading-relaxed">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing */}
            <div id="pricing" className="px-8 pt-12 pb-24 relative z-10 scroll-mt-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-[11px] font-bold text-primary/60 uppercase tracking-widest mb-3">Plans &amp; Pricing</p>
                        <h2 className="text-3xl font-black text-white">Simple, transparent pricing</h2>
                        <p className="text-white/40 mt-2 text-[14px]">No credit card required. Cancel anytime. Prices shown in NGN and GBP.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {plans.map((plan) => (
                            <div key={plan.name} className={`relative rounded-2xl p-8 flex flex-col border transition-all ${plan.highlight
                                ? 'bg-gradient-to-br from-primary/15 to-violet-600/5 border-primary/40 shadow-2xl shadow-primary/10'
                                : 'bg-white/[0.03] border-white/8 hover:border-white/15'
                                }`}>
                                {plan.badge && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold bg-primary text-white">
                                        {plan.badge}
                                    </div>
                                )}
                                <div className="mb-3">
                                    <p className={`text-[12px] font-bold uppercase tracking-widest mb-3 ${plan.highlight ? 'text-primary' : 'text-white/40'
                                        }`}>{plan.name}</p>
                                    <div className="flex items-baseline gap-2 flex-wrap mb-1">
                                        <p className="text-4xl font-black text-white">{plan.price.ngn}</p>
                                        <span className="text-white/30 text-sm">/ {plan.price.gbp}</span>
                                    </div>
                                    <p className="text-[12px] text-white/30">{plan.period}</p>
                                </div>
                                <p className="text-[13px] text-white/40 mb-6 leading-relaxed border-b border-white/5 pb-6">{plan.desc}</p>
                                <ul className="space-y-3 flex-1 mb-8">
                                    {plan.perks.map((perk) => (
                                        <li key={perk} className="flex items-center gap-2.5 text-[13px] text-white/65">
                                            <span className="material-symbols-outlined text-[16px] text-primary flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                            {perk}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to={plan.ctaTo}
                                    className={`w-full py-3.5 rounded-xl text-[13px] font-bold text-center transition-all ${plan.highlight
                                        ? 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20'
                                        : 'bg-white/8 text-white hover:bg-white/15 border border-white/10'
                                        }`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-[12px] text-white/25 mt-8">
                        Need a custom enterprise plan?{' '}
                        <Link to="/client/signup" className="text-primary hover:underline font-semibold">Contact us →</Link>
                    </p>
                </div>
            </div>

            {/* Portal selector */}
            <div className="px-8 pb-24 relative z-10 pt-20">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-black text-white mb-2">Ready to get started?</h2>
                        <p className="text-[13px] text-white/40">Choose your portal below</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link to="/client/login" className="group relative bg-gradient-to-br from-primary/10 to-violet-600/5 border border-primary/20 hover:border-primary/50 rounded-2xl p-7 transition-all duration-300 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors" />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="size-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>business</span>
                                    </div>
                                    <span className="material-symbols-outlined text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all text-[22px]">arrow_forward</span>
                                </div>
                                <h3 className="text-[16px] font-bold text-white mb-2">Business Client Portal</h3>
                                <p className="text-[12px] text-white/40 leading-relaxed mb-5">Place orders, track deliveries, and manage invoices — all in one place.</p>
                                <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary">
                                    Sign in or apply for access <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                </div>
                            </div>
                        </Link>
                        <Link to="/login" className="group relative bg-white/[0.02] border border-white/8 hover:border-white/15 rounded-2xl p-7 transition-all duration-300 overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="size-12 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white/40 text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
                                    </div>
                                    <span className="material-symbols-outlined text-white/15 group-hover:text-white/40 group-hover:translate-x-1 transition-all text-[22px]">arrow_forward</span>
                                </div>
                                <h3 className="text-[16px] font-bold text-white mb-2">Staff &amp; Admin Portal</h3>
                                <p className="text-[12px] text-white/40 leading-relaxed mb-5">Internal operations dashboard for EcoRoute dispatch and management teams.</p>
                                <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/30">Staff access only</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-8">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        <div className="size-7 rounded-lg bg-primary/80 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                        </div>
                        <div>
                            <p className="text-[13px] font-bold text-white/60">EcoRoute Logistics</p>
                            <p className="text-[10px] text-white/20">Nigeria &amp; United Kingdom</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-[11px] text-white/20">
                        <a href="#how-it-works" className="hover:text-white/50 transition-colors">How it works</a>
                        <a href="#features" className="hover:text-white/50 transition-colors">Features</a>
                        <a href="#pricing" className="hover:text-white/50 transition-colors">Pricing</a>
                        <Link to="/client/signup" className="hover:text-white/50 transition-colors">Sign up</Link>
                    </div>
                    <p className="text-[11px] text-white/15">© 2025 EcoRoute Logistics Ltd. All rights reserved.</p>
                </div>
            </div>

            <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
        </div>
    );
};

export default Landing;
