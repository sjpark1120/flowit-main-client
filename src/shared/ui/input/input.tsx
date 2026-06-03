import { forwardRef } from 'react';

import { fieldBaseClassName } from './field-styles';

import { cn } from '@shared/lib';

import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(fieldBaseClassName, className)} {...props} />;
});
