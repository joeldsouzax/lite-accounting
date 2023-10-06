import { NextPage } from 'next';
import AccountCard from './account-card';

const Accounts: NextPage = () => {
  return (
    <section
      className="px-4 md:px-2 container md:max-w-md"
      id="important-account-settings"
    >
      <AccountCard
        id={1}
        name="some account"
        description="some example description that I wanted to explain about"
        account_code={1000}
        isStandard
      />
    </section>
  );
};

export default Accounts;
