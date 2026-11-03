import React from 'react';
import { Logo } from './AppShell';

interface AuthFrameProps {
    /** Label under the logo, e.g. "Rider" or "Operations" */
    product?: string;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

/** Centered, phone-first frame for sign-in and sign-up screens. */
export const AuthFrame: React.FC<AuthFrameProps> = ({ product = 'Rider', title, subtitle, children, footer }) => (
    <div className="min-h-[100dvh] bg-surface flex flex-col">
        <div className="w-full max-w-md mx-auto flex-1 flex flex-col px-5 py-8 sm:py-12">
            <Logo product={product} className="mb-10" />
            <h1 className="text-[28px] leading-tight font-bold text-ink">{title}</h1>
            {subtitle && <p className="text-[15px] text-ink-secondary mt-2">{subtitle}</p>}
            <div className="mt-8 flex-1">{children}</div>
            {footer && <div className="mt-8 text-center text-sm text-ink-secondary space-y-2">{footer}</div>}
        </div>
    </div>
);
