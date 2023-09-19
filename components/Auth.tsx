/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/components/Auth.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Monday, September 18th 2023, 10:47:01 pm
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */
'use client';
import { useSupabase } from '@/app/providers';
import { Auth as AuthUI } from '@supabase/auth-ui-react';
import { getURL } from 'next/dist/shared/lib/utils';
import * as React from 'react';

const Auth: React.FC = () => {
  const { supabase } = useSupabase();
  return (
    <AuthUI
      supabaseClient={supabase}
      providers={['google']}
      redirectTo={`${getURL()}/auth/callback`}
      magicLink={true}
      localization={{
        variables: {
          sign_in: {
            email_input_placeholder: 'you@example.com',
            password_input_placeholder: '********',
          },
        },
      }}
      appearance={{
        extend: false,
        className: {
          button: 'btn btn-neutral w-full',
          divider: 'divider',
          label: 'label',
          container: 'flex flex-col items-center w-full gap-2',
          anchor: 'link text-sm',
          input: 'input input-bordered',
          message: 'alert alert-error',
          loader: 'loading loading-ring loading-lg',
        },
      }}
    />
  );
};

export default Auth;
