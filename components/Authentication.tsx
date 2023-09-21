import { createServerSupabaseClient } from '@/app/supabase-server';
import Link from 'next/link';
import * as React from 'react';
import SignOut from './SignOut';

export default async function Authentication() {
  const supabase = createServerSupabaseClient();
  const { data: user } = await supabase.auth.getUser();

  return (
    <>
      {user.user ? (
        <SignOut />
      ) : (
        <Link className="link link-hover" href="/sign-in">
          Sign in
        </Link>
      )}
    </>
  );
}
