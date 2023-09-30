/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/home/settings/delete-user.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Thursday, September 28th 2023, 10:21:11 am
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */

'use client';

import { deleteUser } from './action';

import {
  //@ts-ignore
  experimental_useFormState as useFormState,
  experimental_useFormStatus as useFormStatus,
} from 'react-dom';

const initialState = {
  message: null,
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="btn btn-error btn-outline btn-sm w-full"
    >
      Delete your Account
    </button>
  );
}

export default function DeleteAccount() {
  const [state, formAction] = useFormState(deleteUser, initialState);

  return (
    <div id="account-delete-card" className="card shadow-md">
      <div className="card-body">
        <h2 className="card-title text-error">Delete account</h2>
        <p>
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <form className="w-full" action={formAction}>
          <DeleteButton />
        </form>
      </div>
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </div>
  );
}
