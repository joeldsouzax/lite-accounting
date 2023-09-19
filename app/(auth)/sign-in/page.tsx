/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/(auth)/sign-in/page.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Monday, September 18th 2023, 9:12:12 pm
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */
import { getSession } from '../../supabase-server';
import { redirect } from 'next/navigation';
import Auth from '@/components/Auth';

export const dynamic = 'force-dynamic';

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect('/account');
  }
  return (
    <main className="container md:max-w-xs px-4 md:px-0">
      <Auth />
    </main>
  );
}
