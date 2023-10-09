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
import TransactionList from './transactions-list';

const SEARCH_ACCOUNT_PLACEHOLDER = 'Search Accounts';
const TRANSACTIONS_API = '/api/v1/transactions';

const TransactionSearch: FC = () => {
  const { ref, handleSearch, setSearchTerm, ...infiniteScrollProps } =
    useInfiniteApi<Account>(TRANSACTIONS_API);

  return (
    <div id="account-search" className="w-full flex flex-col gap-4">
      <input
        className="input input-bordered w-full"
        onChange={handleSearch}
        placeholder={SEARCH_ACCOUNT_PLACEHOLDER}
      />
      <TransactionList {...infiniteScrollProps} ref={ref} />
    </div>
  );
};

export default TransactionSearch;
