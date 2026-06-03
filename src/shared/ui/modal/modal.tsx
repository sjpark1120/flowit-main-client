'use client';

import { useEffect, useId } from 'react';

import { createPortal } from 'react-dom';

import { cn } from '@shared/lib';

import type { ReactNode } from 'react';

type ModalProps = {
    open: boolean;
    title: string;
    description?: string;
    children?: ReactNode;
    footer?: ReactNode;
    className?: string;
    onClose?: () => void;
};

export function Modal({ open, title, description, children, footer, className, onClose }: ModalProps) {
    const titleId = useId();
    const descriptionId = useId();

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose?.();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) {
        return null;
    }

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {onClose ? (
                <button
                    type="button"
                    className="absolute inset-0 bg-slate-900/50"
                    aria-label="Close"
                    onClick={onClose}
                />
            ) : (
                <div className="absolute inset-0 bg-slate-900/50" aria-hidden />
            )}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={description ? descriptionId : undefined}
                className={cn('relative z-10 w-full max-w-sm rounded-xl bg-white p-6 shadow-xl', className)}
            >
                {title ? (
                    <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-2 pb-4">
                        <h2 id={titleId} className="text-center text-lg font-bold text-slate-900">
                            {title}
                        </h2>
                    </div>
                ) : null}
                {description ? (
                    <p id={descriptionId} className="mt-2 text-center text-sm text-slate-600">
                        {description}
                    </p>
                ) : null}
                <div className="py-3">{children}</div>
                {footer ? <div className="flex shrink-0 items-center justify-end pt-4">{footer}</div> : null}
            </div>
        </div>,
        document.body,
    );
}
