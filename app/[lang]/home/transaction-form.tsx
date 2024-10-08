/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/[lang]/home/transaction-form.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Wednesday, October 11th 2023, 4:01:23 pm
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */

import { FC } from 'react';
import AccountSelect from './accounts/account-select';

const TransactionForm: FC = () => {
  return (
    <form className="flex flex-col w-full gap-4 mt-4">
      <input
        className="input input-bordered border-gray-300 hover:border-gray-400"
        placeholder="amount"
      />
      <AccountSelect
        placeholder="select debit account..."
        focus="primary"
        name="credit"
      />
      <AccountSelect
        placeholder="select credit account..."
        focus="secondary"
        name="debit"
      />
    </form>
  );
};

export default TransactionForm;
