import { Account } from '@/utils/types';
import { FC } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineStar } from 'react-icons/ai';
import { PiUserCirclePlusBold } from 'react-icons/pi';
import Link from 'next/link';

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
      className="stats border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1],
        delay,
      }}
    >
      <div className="stat">
        <div className="stat-title line-clamp-1">{name}</div>
        <div className="stat-value">{account_code}</div>
        <div className="stat-desc">{description}</div>
      </div>
    </motion.div>
  );
};

export default AccountCard;
