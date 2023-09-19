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
  const { supabase, isLoading } = useSupabase();

  return (
    <>
      {isLoading ? (
        <div className="w-full flex flex-col items-center h-96">
          <span className="loading loading-dots loading-lg align-middle"></span>
        </div>
      ) : (
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
              button: 'btn btn-neutral w-full md:btn-sm',
              divider: 'divider mb-1',
              container: 'flex flex-col gap-4 md:gap-2 justify-center',
              label: 'label md:text-sm',
              anchor: 'link text-sm self-center',
              input: 'input input-bordered md:input-sm w-full',
              message: 'alert alert-error',
              loader: 'loading loading-ring loading-lg',
            },
          }}
        />
      )}
    </>
  );
};

export default Auth;
