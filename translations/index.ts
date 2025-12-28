import { en } from './en';
import { hi } from './hi';

export const translations = {
  en,
  hi,
} as const;

export type Language = keyof typeof translations;
export type { TranslationKeys } from './en';
