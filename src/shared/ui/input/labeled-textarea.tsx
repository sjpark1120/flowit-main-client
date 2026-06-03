import { useId } from 'react';

import { Textarea } from './textarea';
import { CircleAlert, CircleCheck } from 'lucide-react';

import { cn } from '@shared/lib';

import type { TextareaHTMLAttributes } from 'react';

type LabeledTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    containerClassName?: string;
    labelClassName?: string;
    errorMessage?: string;
    isError?: boolean;
    value?: string;
};

export function LabeledTextarea({
    label,
    containerClassName,
    labelClassName,
    errorMessage,
    isError,
    value,
    rows,
    ...textareaProps
}: LabeledTextareaProps) {
    const textareaId = useId();

    const empty = value === '';
    const success = value && !isError;
    const error = value && isError;

    return (
        <div className={cn('flex w-full flex-col gap-2', containerClassName)}>
            <label htmlFor={textareaId} className={cn('text-sm font-bold text-slate-700', labelClassName)}>
                {label}
            </label>
            <Textarea
                className={cn(success && 'border-emerald-600', error && 'border-red-500')}
                id={textareaId}
                rows={rows}
                value={value}
                {...textareaProps}
            />
            {errorMessage && (
                <p
                    className={cn(
                        'flex items-center gap-1.5 text-xs font-bold',
                        empty && 'text-slate-500 transition-colors',
                        success && 'text-emerald-600 transition-colors',
                        error && 'text-rose-500 transition-colors',
                    )}
                >
                    {error && <CircleAlert className={cn('size-3', error && 'text-rose-500')} />}
                    {!error && <CircleCheck className={cn('size-3', success && 'text-emerald-600')} />}
                    {errorMessage}
                </p>
            )}
        </div>
    );
}
