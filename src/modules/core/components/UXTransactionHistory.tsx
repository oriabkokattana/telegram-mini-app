import { useRef, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import ChevronForwardIcon from '@/assets/chevron-forward.svg?react';
import ChevronUpIcon from '@/assets/chevron-up.svg?react';
import FunnelIcon from '@/assets/funnel.svg?react';

import { styles } from './UXTransactionHistory.styles';

import { TransactionItem } from '@/types';

interface UXTransactionHistoryProps {
  data?: TransactionItem[];
  variant: 'filterable' | 'collapsible';
}

const UXTransactionHistory = ({ data, variant }: UXTransactionHistoryProps) => {
  const [open, setOpen] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  const onOpen = () => {
    setOpen(!open);
    window.setTimeout(() => listRef.current?.scrollIntoView({ behavior: 'smooth' }));
  };

  return (
    <div {...stylex.props(styles.base, variant === 'collapsible' ? styles.border : undefined)}>
      <div
        {...stylex.props(styles.headerWrapper)}
        onClick={variant === 'collapsible' ? onOpen : undefined}
      >
        <span {...stylex.props(styles.header)}>Recent transactions</span>
        {variant === 'collapsible' ? (
          <ChevronUpIcon
            {...stylex.props(styles.chevronUpIcon, open ? styles.rotate : undefined)}
          />
        ) : (
          <FunnelIcon />
        )}
      </div>
      {open && (
        <div {...stylex.props(styles.list)} ref={listRef}>
          {data?.map((transaction) => (
            <div {...stylex.props(styles.row)} key={transaction.id}>
              <div {...stylex.props(styles.labelWrapper)}>
                <span {...stylex.props(styles.action)}>{transaction.transaction_type}</span>
                <span {...stylex.props(styles.date)}>{new Date().toISOString()}</span>
              </div>
              <div {...stylex.props(styles.valueWrapper)}>
                <span {...stylex.props(styles.amount)}>{transaction.destination_amount}</span>
                <ChevronForwardIcon />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UXTransactionHistory;
