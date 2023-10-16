/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/home/accounts/accounts-search.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Saturday, October 7th 2023, 3:50:32 pm
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */
'use client';

import { FC } from 'react';
import { useInfiniteApi } from '@/hooks';
import { Account } from '@/utils/types';
import AccountsList from './accounts-list';

const SEARCH_ACCOUNT_PLACEHOLDER = 'Search Accounts';
const ACCOUNTS_API = '/api/v1/accounts';

const AccountSearch: FC = () => {
  const { ref, handleSearch, ...infiniteScrollProps } =
    useInfiniteApi<Account>(ACCOUNTS_API);

  return (
    <div id="account-search" className="w-full flex flex-col gap-4">
      <input
        className="input input-bordered w-full"
        onChange={handleSearch}
        placeholder={SEARCH_ACCOUNT_PLACEHOLDER}
      />
      <AccountsList {...infiniteScrollProps} ref={ref} />
    </div>
  );
};

export default AccountSearch;
