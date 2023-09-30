/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/home/settings/delete-user.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Thursday, September 28th 2023, 10:21:11 am
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */

'use client';

import { FC } from 'react';
import { deleteUser } from './action';

/**
 * its a web app only feature, user have to login to their web app to delete themselves
 * @returns
 */
const DeleteUser: FC = () => {
  return (
    <div id="account-delete-card" className="card shadow-md">
      <div className="card-body">
        <h2 className="card-title text-error">Delete account</h2>
        <p>
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <form className="w-full" action={deleteUser}>
          <button
            className="btn btn-error btn-outline btn-sm w-full"
            type="submit"
          >
            Delete your Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteUser;
