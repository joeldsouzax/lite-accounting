export const i18n = {
  defaultLocale: 'nn-NO',
  locales: ['en', 'nb-NO', 'nn-NO'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
