'use client';
import * as React from 'react';
import type { Database } from '@/database.types';
import { SupabaseClient } from '@supabase/supabase-js';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
};

const Context = React.createContext<SupabaseContext | undefined>(undefined);

interface SupabaseProviderProps extends React.PropsWithChildren {}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const [supabase] = React.useState(() => createPagesBrowserClient());
  const router = useRouter();

  return <Context.Provider value={{ supabase }}>{children}</Context.Provider>;
};
