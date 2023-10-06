import { Account } from '@/utils/types';
import { FC } from 'react';
import { motion } from 'framer-motion';

interface AccountCardProps
  extends Pick<Account, 'account_code' | 'name' | 'id' | 'description'> {
  isStandard?: boolean;
  delay?: number;
}

const AccountCard: FC<AccountCardProps> = ({
  account_code,
  name,
  id,
  description,
  isStandard = false,
  delay = 0.5,
}) => {
  return (
    <motion.div
      className="card card-compact"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1],
        delay,
      }}
    >
      <div className="card-body">
        <h2 className="card-title">{`${account_code} ${name}`}</h2>
        {description && <p>{description}</p>}
      </div>
    </motion.div>
  );
};

export default AccountCard;
