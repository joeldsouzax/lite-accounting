/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/home/list-ledgers.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Wednesday, October 4th 2023, 11:19:49 am
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */

'use client';
import useSWR, { Fetcher } from 'swr';
import { FC } from 'react';
import { Database } from '@/database.types';
import { Tables } from '@/utils/types';

type Ledger = Tables<'ledgers'>;
type Ledgers = Array<Ledger>;
interface GetLedgers {
  data: Ledgers;
  count: number;
}

const fetcher: Fetcher<GetLedgers> = async (url: string) =>
  fetch(url).then((res) => res.json());

const ListLedgers: FC = () => {
  const { data, isLoading, error } = useSWR('/api/v1/ledger', fetcher);

  if (isLoading)
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div>{data?.data.map((leger) => <h1 key={leger.id}>{leger.id}</h1>)}</div>
  );
};

export default ListLedgers;
