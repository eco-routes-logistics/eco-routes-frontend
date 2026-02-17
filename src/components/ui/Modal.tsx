import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { cn } from '@/utils/cn';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    position?: 'center' | 'right';
    showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = 'md',
    position = 'center',
    showCloseButton = true,
}) => {
    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-7xl',
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                </Transition.Child>

                <div
                    className={cn(
                        'fixed inset-0',
                        position === 'right' ? 'flex justify-end' : 'overflow-y-auto'
                    )}
                >
                    <div
                        className={cn(
                            position === 'center' &&
                            'flex min-h-full items-center justify-center p-4'
                        )}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom={
                                position === 'right'
                                    ? 'translate-x-full'
                                    : 'opacity-0 scale-95'
                            }
                            enterTo={
                                position === 'right' ? 'translate-x-0' : 'opacity-100 scale-100'
                            }
                            leave="ease-in duration-200"
                            leaveFrom={
                                position === 'right' ? 'translate-x-0' : 'opacity-100 scale-100'
                            }
                            leaveTo={
                                position === 'right'
                                    ? 'translate-x-full'
                                    : 'opacity-0 scale-95'
                            }
                        >
                            <Dialog.Panel
                                className={cn(
                                    'w-full transform overflow-hidden bg-white dark:bg-[#1a202c] shadow-2xl transition-all',
                                    position === 'center'
                                        ? `rounded-2xl ${sizes[size]}`
                                        : 'h-screen border-l border-gray-200 dark:border-gray-700',
                                    position === 'right' && sizes[size]
                                )}
                            >
                                {/* Header */}
                                {(title || description || showCloseButton) && (
                                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-start justify-between">
                                        <div className="flex-1">
                                            {title && (
                                                <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
                                                    {title}
                                                </Dialog.Title>
                                            )}
                                            {description && (
                                                <Dialog.Description className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    {description}
                                                </Dialog.Description>
                                            )}
                                        </div>
                                        {showCloseButton && (
                                            <button
                                                onClick={onClose}
                                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-gray-500">
                                                    close
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Content */}
                                <div
                                    className={cn(
                                        position === 'right' ? 'h-full overflow-y-auto' : ''
                                    )}
                                >
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

interface ModalContentProps {
    children: React.ReactNode;
    className?: string;
}

export const ModalContent: React.FC<ModalContentProps> = ({
    children,
    className,
}) => {
    return <div className={cn('p-6', className)}>{children}</div>;
};

interface ModalFooterProps {
    children: React.ReactNode;
    className?: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
    children,
    className,
}) => {
    return (
        <div
            className={cn(
                'px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/20 flex gap-4',
                className
            )}
        >
            {children}
        </div>
    );
};
