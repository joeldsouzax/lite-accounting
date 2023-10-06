/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/home/accounts/accounts-list.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Friday, October 6th 2023, 10:55:25 am
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */
'use client';
import { FC, useEffect, useRef } from 'react';
import useSWR, { Fetcher } from 'swr';
import useSWRInfinite from 'swr/infinite';
import { Accounts } from '@/utils/types';
import AccountCard from './account-card';
import { LuAlertTriangle } from 'react-icons/lu';
import { useInfiniteScroll } from 'ahooks';
import { PAGE_SIZE } from '@/constants';

const fetcher: Fetcher<Accounts> = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(response.statusText);
    throw error;
  }

  return response.json();
};

const AccountsList: FC = () => {
  const { data, size, setSize, isValidating, isLoading, error } =
    useSWRInfinite((index) => `/api/v1/accounts?page=${index}`, fetcher);

  const isRefreshing = isValidating && data && data.length === size;
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  if (isLoading)
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  // if (error as Error) {
  //   return (
  //     <div className="alert alert-error">
  //       <LuAlertTriangle size={24} />
  //       <span>Could not fetch accounts list</span>
  //     </div>
  //   );
  // }

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
    <div id="accounts-list" className="w-full">
      {data.map((accounts, index) => (
        <div key={index + accounts[0].id}>
          {accounts.map(({ user_id, ...account }) => (
            <AccountCard
              {...account}
              isStandard={user_id === null}
              key={account.id}
            />
          ))}
        </div>
      ))}
      <button
        className="btn w-full"
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
      >
        {isLoadingMore ? (
          <span className="loading loading-dots loading-sm"></span>
        ) : (
          'Load More'
        )}
      </button>
    </div>
  );
};

export default AccountsList;
