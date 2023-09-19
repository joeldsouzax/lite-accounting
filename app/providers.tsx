'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/database.types';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
  isLoading: boolean;
};

const Context = React.createContext<SupabaseContext | undefined>(undefined);

interface ProviderProps extends React.PropsWithChildren {}
const Providers: React.FC<ProviderProps> = ({ children }) => {
  const [supabase] = React.useState(() => createPagesBrowserClient());
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      setIsLoading(false);
      if (event === 'SIGNED_IN') router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase, isLoading }}>
      <ThemeProvider themes={['dark', 'emerald']}>{children}</ThemeProvider>
    </Context.Provider>
  );
};

export default Providers;

export const useSupabase = () => {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error('useSupabase must be inside Provider');
  }

  return context;
};
