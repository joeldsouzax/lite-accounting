/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/components/Auth.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Monday, September 18th 2023, 10:47:01 pm
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */

import { useSupabase } from '@/app/providers';
import { Auth as AuthUI } from '@supabase/auth-ui-react';
import { getURL } from 'next/dist/shared/lib/utils';
import * as React from 'react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const Auth: React.FC = () => {
  const { supabase } = useSupabase();
  return (
    <div className="flex flex-col space-y-4">
      <AuthUI
        supabaseClient={supabase}
        providers={['google', 'apple', 'linkedin', 'azure', 'facebook']}
        redirectTo={`${getURL()}/auth/callback`}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#52525b',
              },
            },
          },
        }}
        theme="dark"
      />
    </div>
  );
};

export default Auth;
