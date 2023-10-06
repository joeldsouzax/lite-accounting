/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/home/accounts/accounts-list.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Friday, October 6th 2023, 10:55:25 am
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */
'use client';
import { FC } from 'react';
import useSWR, { Fetcher } from 'swr';
import { GetAccounts } from '@/utils/types';
import AccountCard from './account-card';
import { LuAlertTriangle } from 'react-icons/lu';

const fetcher: Fetcher<GetAccounts> = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(response.statusText);
    throw error;
  }

  return response.json();
};

const AccountsList: FC = () => {
  const { data, isLoading, error } = useSWR('/api/v1/accounts', fetcher);

  if (isLoading)
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  if (error as Error) {
    return (
      <div className="alert alert-error">
        <LuAlertTriangle size={24} />
        <span>Could not fetch accounts list</span>
      </div>
    );
  }

  if (data === undefined) {
    return (
      <div id="empty-accounts" className="card card-compact">
        <div className="card-body">
          <h2 className="card-title">no accounts found</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      {data.accounts.map(({ user_id, ...account }) => (
        <AccountCard
          key={account.id}
          {...account}
          isStandard={user_id === null}
        />
      ))}
    </>
  );
};

export default AccountsList;
