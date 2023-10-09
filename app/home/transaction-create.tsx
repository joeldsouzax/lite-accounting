/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/home/transaction-create.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Monday, October 9th 2023, 9:48:50 am
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */

import { FC } from 'react';

const TransactionCreate: FC = () => {
  return (
    <div
      id="create-transaction"
      className="stats text-primary-content border w-full"
    >
      <div className="stat">
        <div className="stat-title">Current balance</div>
        <div className="stat-value">kr0</div>
        <div className="stat-actions">
          <label
            htmlFor="transaction-withdrawal-modal"
            className="btn btn-sm mr-2"
          >
            Withdrawal
          </label>
          <label htmlFor="deposit-withdrawal-modal" className="btn btn-sm mr-2">
            Deposit
          </label>
        </div>
      </div>
    </div>
  );
};

export default TransactionCreate;
