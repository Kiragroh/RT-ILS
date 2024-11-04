import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(date: string): string {
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${(d.getFullYear() % 100)
    .toString()
    .padStart(2, '0')}_${d.getHours().toString().padStart(2, '0')}:${d.getMinutes()
    .toString()
    .padStart(2, '0')}`;
}

export function escapeCsvField(field: string | undefined | null): string {
  if (!field) return '';
  return field.replace(/,/g, '^');
}