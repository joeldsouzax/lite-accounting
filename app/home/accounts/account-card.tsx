import { Tables } from '@/utils/types';
import { FC } from 'react';

interface AccountCardProps
  extends Pick<Tables<'accounts'>, 'account_code' | 'name' | 'id'> {
  isStandard?: boolean;
  description?: string;
}

const AccountCard: FC<AccountCardProps> = ({
  account_code,
  name,
  id,
  description,
  isStandard = false,
}) => {
  return (
    <div className="card card-compact shadow-md">
      <div className="card-body">
        <h2 className="card-title">
          {account_code}
          {isStandard && <div className="badge badge-secondary">Standard</div>}
        </h2>
        <p>{name}</p>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default AccountCard;
