/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/home/accounts/page.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Friday, October 6th 2023, 10:17:07 am
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */

import { NextPage } from 'next';
import AccountSearch from './accounts-search';

const Accounts: NextPage = () => {
  return (
    <section
      className="px-4 md:px-2 container md:max-w-md"
      id="important-account-settings"
    >
      <AccountSearch />
    </section>
  );
};

export default Accounts;
