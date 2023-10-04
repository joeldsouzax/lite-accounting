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
import { Tables } from '@/utils/types';
import { LuAlertTriangle } from 'react-icons/lu';

type Ledger = Tables<'ledgers'>;
type Ledgers = Array<Ledger>;
interface GetLedgers {
  data: Ledgers;
  count: number;
}

const fetcher: Fetcher<GetLedgers> = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(response.statusText);
    throw error;
  }

  return response.json();
};

const ListLedgers: FC = () => {
  const { data, isLoading, error } = useSWR('/api/v1/ledger', fetcher);

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
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="prose">
      {data?.data.map((leger) => <h1 key={leger.id}>{leger.year}</h1>)}
    </div>
  );
};

export default ListLedgers;
