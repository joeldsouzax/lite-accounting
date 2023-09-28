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

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && req.nextUrl.pathname.includes('home')) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return res;
}
