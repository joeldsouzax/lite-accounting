import { Database } from '@/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cache } from 'react';
import { cookies } from 'next/headers';

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies })
);

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

export async function getUserDetails() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: userDetail } = await supabase
      .from('user')
      .select('*')
      .single();
    return userDetail;
  } catch (err) {
    console.log('error : ', err);
    return null;
  }
}
