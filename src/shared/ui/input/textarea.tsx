import { forwardRef } from 'react';

import { fieldBaseClassName } from './field-styles';

import { cn } from '@shared/lib';

import type { TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
    { className, rows = 4, ...props },
    ref,
) {
    return <textarea ref={ref} rows={rows} className={cn(fieldBaseClassName, 'resize-none', className)} {...props} />;
});
