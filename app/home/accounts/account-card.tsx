import { Account } from '@/utils/types';
import { FC } from 'react';

interface AccountCardProps
  extends Pick<Account, 'account_code' | 'name' | 'id' | 'description'> {
  isStandard?: boolean;
}

const AccountCard: FC<AccountCardProps> = ({
  account_code,
  name,
  id,
  description,
  isStandard = false,
}) => {
  return (
    <div className="card card-compact">
      <div className="card-body">
        <h2 className="card-title">
          {`${account_code} ${name}`}
          {isStandard && <div className="badge badge-secondary">Standard</div>}
        </h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default AccountCard;
