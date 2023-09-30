/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/home/settings/action.ts
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Thursday, September 28th 2023, 10:18:09 am
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */

'use server';

import { createActionSupabaseClient } from '@/app/supabase-server';

export async function deleteUser() {
  const supabase = createActionSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && user.id) {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', user.id);
  }
}
