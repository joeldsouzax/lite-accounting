/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/home/accounts/accounts-list.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Friday, October 6th 2023, 10:55:25 am
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */
'use client';
import { forwardRef } from 'react';
import { Account } from '@/utils/types';
import AccountCard from './account-card';
import { LuAlertTriangle } from 'react-icons/lu';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { BiCloudDownload } from 'react-icons/bi';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { motion } from 'framer-motion';
import { InfiniteScrollReturn } from '@/hooks';
import { getDelay } from '@/utils/helpers';

const AccountsList = forwardRef<
  HTMLDivElement,
  Omit<InfiniteScrollReturn<Account>, 'ref'>
>(
  (
    { data, isLoading, error, size, isLoadingMore, isReachingEnd, setSize },
    ref
  ) => {
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
      <div id="accounts-list" className="w-full flex flex-col gap-4" ref={ref}>
        {data.map((accounts, index) => {
          if (accounts.length < 1)
            return (
              <div className="alert" key="no-more-account">
                <IoCheckmarkDoneCircleOutline />
                <span>no more accounts available</span>
              </div>
            );
          return (
            <div
              key={index + accounts[0].id}
              className="flex flex-col w-full gap-4"
            >
              {accounts.map(({ user_id, ...account }, i) => {
                return (
                  <AccountCard
                    {...account}
                    isStandard={user_id === null}
                    key={account.id}
                    delay={getDelay(i, size, DEFAULT_PAGE_SIZE)}
                  />
                );
              })}
            </div>
          );
        })}
        {size < 2 && !isReachingEnd && (
          <motion.button
            disabled={isLoadingMore || isReachingEnd}
            className="btn btn-md btn-outline"
            onClick={() => setSize(size + 1)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.25, 0, 1],
              delay: getDelay(DEFAULT_PAGE_SIZE + 1, size, DEFAULT_PAGE_SIZE),
            }}
          >
            <BiCloudDownload size={26} />
            Load More
          </motion.button>
        )}
        {isLoadingMore && (
          <div className="w-full flex flex-col justify-center items-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        )}
      </div>
    );
  }
);

AccountsList.displayName = 'AccountsList';

export default AccountsList;
