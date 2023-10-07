/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/home/accounts/accounts-search.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Saturday, October 7th 2023, 3:50:32 pm
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */
'use client';

import { FC, useState } from 'react';
import type { ChangeEventHandler } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useInfiniteScroll } from '@/hooks';
import { Fetcher } from 'swr';
import { Accounts } from '@/utils/types';
import AccountsList from './accounts-list';

const SEARCH_ACCOUNT_PLACEHOLDER = 'Search Accounts';

const fetcher: Fetcher<Accounts> = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(response.statusText);
    throw error;
  }

  return response.json();
};

const AccountSearch: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { ref, ...infiniteScrollProps } = useInfiniteScroll(
    (index) => `/api/v1/accounts?q=${debouncedSearchTerm}&page=${index}`,
    fetcher
  );

  const handleSearch: ChangeEventHandler<HTMLInputElement> | undefined = (e) =>
    setSearchTerm(e.target.value);

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
