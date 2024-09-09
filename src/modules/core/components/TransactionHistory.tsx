import { useRef, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import ChevronForwardIcon from '@/assets/chevron-forward.svg?react';
import ChevronUpIcon from '@/assets/chevron-up.svg?react';
import FunnelIcon from '@/assets/funnel.svg?react';
import { formatNumberWithCommas } from '@/utils/numbers';

import { styles } from './TransactionHistory.styles';

interface TransactionHistoryProps {
  variant: 'filterable' | 'collapsible';
  asset?: string;
}

const TransactionHistory = ({ variant, asset }: TransactionHistoryProps) => {
  const [open, setOpen] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  const onOpen = () => {
    setOpen(!open);
    window.setTimeout(() => listRef.current?.scrollIntoView());
  };

  const TRANSACTIONS = [
    { id: 1, action: `Deposit ${asset || 'BTC'} funds`, date: '12.08.2024, 12:10', amount: 0.0004 },
    { id: 2, action: `Deposit ${asset || 'ETH'} funds`, date: '12.08.2024, 12:10', amount: 0.0004 },
  ];

  return (
    <div {...stylex.props(styles.base, variant === 'collapsible' ? styles.border : undefined)}>
      <div
        {...stylex.props(styles.headerWrapper)}
        onClick={variant === 'collapsible' ? onOpen : undefined}
      >
        <span {...stylex.props(styles.header)}>Recent transactions</span>
        {variant === 'collapsible' ? <ChevronUpIcon /> : <FunnelIcon />}
      </div>
      {open && (
        <div {...stylex.props(styles.list)} ref={listRef}>
          {TRANSACTIONS.map((transaction) => (
            <div {...stylex.props(styles.row)} key={transaction.id}>
              <div {...stylex.props(styles.labelWrapper)}>
                <span {...stylex.props(styles.action)}>{transaction.action}</span>
                <span {...stylex.props(styles.date)}>{transaction.date}</span>
              </div>
              <div {...stylex.props(styles.valueWrapper)}>
                <span {...stylex.props(styles.amount)}>
                  {transaction.amount >= 0 ? '+ ' : '- '}
                  {formatNumberWithCommas(transaction.amount)}
                </span>
                <ChevronForwardIcon />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
