/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/middleware.ts
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Monday, September 18th 2023, 8:22:38 pm
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Database } from './database.types';
import { match } from '@formatjs/intl-localematcher';
import { i18n } from './i18n-config';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  // negotiator expects plain object, so we need to transform request
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  console.log(languages);
  console.log(locales);
  console.log(i18n.defaultLocale);

  const locale = match(languages, locales, i18n.defaultLocale);

  return locale;
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // check if there are any unsupported locales in pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(req);

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        req.url
      )
    );
  }
  const res = NextResponse.next();

  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && pathname.includes('home')) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
