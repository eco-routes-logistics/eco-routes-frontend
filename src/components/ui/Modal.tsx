import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { cn } from '@/utils/cn';
import { Icon } from './Icon';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    /** "right" renders a full-height side drawer */
    position?: 'center' | 'right';
}

const widths = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children, footer, size = 'md', position = 'center' }) => {
    const drawer = position === 'right';
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <DialogBackdrop transition className="fixed inset-0 bg-ink/40 transition-opacity duration-200 data-[closed]:opacity-0" />
            <div className={cn('fixed inset-0', drawer ? 'flex justify-end' : 'flex items-end sm:items-center justify-center sm:p-4')}>
                <DialogPanel
                    transition
                    className={cn(
                        'w-full bg-surface-raised shadow-overlay flex flex-col transition duration-200 ease-out',
                        widths[size],
                        drawer
                            ? 'h-full border-l border-line data-[closed]:translate-x-full'
                            : 'max-h-[90dvh] rounded-t-card sm:rounded-card data-[closed]:opacity-0 data-[closed]:translate-y-4'
                    )}
                >
                    {(title || description) && (
                        <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-line">
                            <div className="min-w-0">
                                {title && <DialogTitle className="text-lg font-bold text-ink">{title}</DialogTitle>}
                                {description && <div className="text-sm text-ink-secondary mt-0.5">{description}</div>}
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close"
                                className="size-9 -mr-2 rounded-lg flex items-center justify-center text-ink-muted hover:bg-surface-sunken hover:text-ink flex-shrink-0"
                            >
                                <Icon name="close" className="text-[22px]" />
                            </button>
                        </div>
                    )}
                    <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
                    {footer && <div className="px-6 py-4 border-t border-line flex gap-3 justify-end">{footer}</div>}
                </DialogPanel>
            </div>
        </Dialog>
    );
};
