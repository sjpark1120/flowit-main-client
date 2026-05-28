import { useId } from 'react';

import { Input } from './input';
import { clsx } from 'clsx';

import type { InputHTMLAttributes } from 'react';

type LabeledInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    containerClassName?: string;
    labelClassName?: string;
};

export function LabeledInput({ label, containerClassName, labelClassName, ...inputProps }: LabeledInputProps) {
    const inputId = useId();

    return (
        <div className={clsx('flex w-full flex-col gap-2', containerClassName)}>
            <label htmlFor={inputId} className={clsx('text-sm font-bold text-slate-700', labelClassName)}>
                {label}
            </label>
            <Input id={inputId} {...inputProps} />
        </div>
    );
}
