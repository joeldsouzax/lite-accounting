/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/auth/callback/route.ts
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Monday, September 18th 2023, 9:03:14 pm
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */

import { Database } from '@/database.types';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');

  console.log(requestUrl);

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after signin process is complete
  return NextResponse.redirect(requestUrl.origin);
}
