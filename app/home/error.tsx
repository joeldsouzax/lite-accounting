/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/home/error.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Wednesday, October 4th 2023, 1:59:16 pm
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */

'use client';
import { FC } from 'react';
import { LuAlertTriangle } from 'react-icons/lu';

interface HomeErrorProps {
  reset: () => void;
  error: Error & { digest?: string };
}

const HomeError: FC<HomeErrorProps> = ({ reset, error }) => {
  return (
    <section className="px-4 md:px-2 container md:max-w-md mb-4 md:mb-6 transition-all ease-linear duration-100">
      <div className="card text-neutral-content bg-neutral">
        <div className="card-body items-center text-center">
          <h2 className="card-title">
            <LuAlertTriangle size={36} />
          </h2>
          <p>Something went wrong!</p>
          <div className="card-actions justify-end">
            <button className="btn btn-error btn-sm" onClick={reset}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeError;
