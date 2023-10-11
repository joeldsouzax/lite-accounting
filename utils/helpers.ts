import { Locale } from '@/i18n-config';

export const getURL = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000';

  url = url.includes('http') ? url : `http://${url}`;
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export const getDelay = (i: number, size: number, pageSize: number) =>
  i >= pageSize * 2 ? (i - pageSize * (size - 1)) / 15 : i / 15;

export function getFlagEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char: any) =>
      String.fromCodePoint(127397 + char.charCodeAt())
    );
}

export const localeToFlag: Record<Locale, { flag: string; name: string }> = {
  en: { flag: 'gb', name: 'English' },
  'nb-NO': { flag: 'no', name: 'Bokmål' },
  'nn-NO': { flag: 'no', name: 'Nynorsk' },
};
