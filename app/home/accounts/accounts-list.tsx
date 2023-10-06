/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/home/accounts/accounts-list.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Friday, October 6th 2023, 10:55:25 am
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */
'use client';
import { FC, useEffect, useRef, useState } from 'react';
import useSWR, { Fetcher } from 'swr';
import useSWRInfinite from 'swr/infinite';
import { Accounts } from '@/utils/types';
import AccountCard from './account-card';
import { LuAlertTriangle } from 'react-icons/lu';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { debounce } from 'lodash';
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
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { data, size, setSize, isLoading, error } = useSWRInfinite(
    (index) => `/api/v1/accounts?page=${index}`,
    fetcher,
    {
      revalidateFirstPage: false,
    }
  );

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const handleScroll = () => {
    if (ref.current && typeof window !== 'undefined') {
      const container = ref.current;
      const { bottom } = container.getBoundingClientRect();
      const { innerHeight } = window;
      setIsInView((prev) => bottom <= innerHeight);
    }
  };

  useEffect(() => {
    const handleDebouncedScroll = debounce(() => handleScroll(), 100);
    window.addEventListener('scroll', handleDebouncedScroll);
    return () => {
      window.removeEventListener('scroll', handleDebouncedScroll);
    };
  }, [isReachingEnd]);

  useEffect(() => {
    if (isInView && !isReachingEnd) {
      setSize(size + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, isReachingEnd]);

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
    <div id="accounts-list" className="w-full" ref={ref}>
      {data.map((accounts, index) => {
        if (accounts.length < 1)
          return (
            <div className="alert" key="no-more-account">
              <IoCheckmarkDoneCircleOutline />
              <span>no more accounts available</span>
            </div>
          );
        return (
          <div key={index + accounts[0].id}>
            {accounts.map(({ user_id, ...account }, i) => {
              const recalculatedDelay =
                i >= PAGE_SIZE * 2 ? (i - PAGE_SIZE * (size - 1)) / 15 : i / 15;

              return (
                <AccountCard
                  {...account}
                  isStandard={user_id === null}
                  key={account.id}
                  delay={recalculatedDelay}
                />
              );
            })}
          </div>
        );
      })}
      {isLoadingMore && (
        <div className="w-full flex flex-col justify-center items-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default AccountsList;
