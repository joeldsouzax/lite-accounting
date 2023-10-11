/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/[lang]/home/accounts/account-select.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Wednesday, October 11th 2023, 4:06:25 pm
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */

'use client';

import { FC } from 'react';
import { useInfiniteApi } from '@/hooks';
import { Account } from '@/utils/types';
import { ACCOUNTS_API, SEARCH_ACCOUNT_PLACEHOLDER } from '@/constants';

interface AccountSelectProps {}

const AccountSelect: FC<AccountSelectProps> = ({}) => {
  const {
    ref,
    handleSearch,
    setSearchTerm,
    data,
    isLoading,
    error,
    size,
    isLoadingMore,
    isReachingEnd,
    setSize,
  } = useInfiniteApi<Account>(ACCOUNTS_API);

  if (data === undefined) return <h1>NO accounts</h1>;

  return (
    <div className="dropdown dropdown-hover">
      <input
        tabIndex={0}
        className="input input-bordered w-full"
        onChange={handleSearch}
        placeholder={SEARCH_ACCOUNT_PLACEHOLDER}
      />
      <div
        ref={ref}
        tabIndex={0}
        className="dropdown-conten z-[1] menu p-2 shadow bg-base-100 rounded-box w-full h-32"
      >
        {data.map((accounts, index) => {
          if (accounts.length < 1)
            return (
              <div className="alert" key="no-more-account">
                <span>no more accounts available</span>
              </div>
            );
          return (
            <div
              key={index + accounts[0].id}
              className="flex flex-col w-full gap-4"
            >
              {accounts.map(({ user_id, ...account }, i) => {
                return <div key={account.id}>{account.account_code}</div>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountSelect;
