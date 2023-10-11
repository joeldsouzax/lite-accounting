/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/[lang]/locale-selector.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Wednesday, October 11th 2023, 1:39:28 pm
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */

'use client';

import { Locale, i18n } from '@/i18n-config';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { getFlagEmoji, localeToFlag } from '@/utils/helpers';
import Link from 'next/link';

const LocaleSelector: FC = () => {
  const patname = usePathname();
  const currentLocale = patname.split('/').slice(1).at(0) as Locale;

  const redirectPathName = (locale: string) => {
    if (!patname) return '/';
    const segments = patname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div className="dropdown">
      <label tabIndex={0} className="label">{`${getFlagEmoji(
        localeToFlag[currentLocale].flag
      )}`}</label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {i18n.locales
          .filter((locale) => locale !== currentLocale)
          .map((locale) => (
            <li key={locale} defaultValue={currentLocale} value={locale}>
              <Link href={redirectPathName(locale)}>{`${getFlagEmoji(
                localeToFlag[locale].flag
              )}- ${localeToFlag[locale].name}`}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LocaleSelector;
