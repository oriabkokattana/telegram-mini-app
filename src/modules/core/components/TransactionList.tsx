import { forwardRef } from 'react';
import { Box, Flex } from '@radix-ui/themes';
import { formatDateWithTime } from '@/utils/date';
import { formatNumber } from '@/utils/numbers';
import { Text } from '../design-system/text';
import NoDataPlaceholder from './NoDataPlaceholder';

import { TransactionItem } from '@/types';

const getTransactionTitle = (transaction: TransactionItem) => {
  switch (transaction.transaction_type) {
    case 'deposit':
      return `Deposit ${transaction.source_token} funds`;
    case 'withdraw':
      return `Withdraw ${transaction.source_token} funds`;
    case 'swap':
      return `Swap ${transaction.source_token} to ${transaction.destination_token}`;
    default:
      return '—';
  }
};

const getTransactionAmount = (transaction: TransactionItem) => {
  switch (transaction.transaction_type) {
    case 'deposit':
      return `+ ${formatNumber(Number(transaction.source_amount || 0))} ${transaction.source_token}`;
    case 'withdraw':
      return `- ${formatNumber(Number(transaction.source_amount || 0))} ${transaction.source_token}`;
    case 'swap':
      return `- ${formatNumber(Number(transaction.source_amount || 0), 4)} ${transaction.source_token}  + ${formatNumber(Number(transaction.destination_amount || 0), 4)} ${transaction.destination_token || ''}`;
    default:
      return '—';
  }
};

const getTransactionStatus = (transaction: TransactionItem) => {
  switch (transaction.status) {
    case 'new':
      return 'New';
    case 'completed':
      return 'Success';
    case 'pending':
      return 'In Progress';
    default:
      return '—';
  }
};

const getTransactionStatusColor = (transaction: TransactionItem) => {
  switch (transaction.status) {
    case 'new':
      return 'rgba(255, 101, 179, 1)';
    case 'completed':
      return 'rgba(53, 219, 140, 1)';
    case 'pending':
      return 'rgba(88, 59, 232, 1)';
    default:
      return 'rgba(0, 0, 0, 0)';
  }
};

interface TransactionListProps {
  data?: TransactionItem[];
}

const TransactionList = forwardRef<HTMLDivElement, TransactionListProps>(
  ({ data }, forwardedRef) => {
    if (!data?.length) {
      return (
        <NoDataPlaceholder
          variant='list'
          title="You don't have history yet"
          description='Complete a transaction to see the history'
        />
      );
    }

    return (
      <Flex direction='column' gap='5' ref={forwardedRef}>
        {data?.map((item) => (
          <Flex key={item.id} justify='between' align='center'>
            <Flex direction='column' gap='2'>
              <Text size='3' weight='bold'>
                {getTransactionTitle(item)}
              </Text>
              <Text color='gray' size='2' weight='medium' lineHeight='12px'>
                {formatDateWithTime(item.timestamp)}
              </Text>
            </Flex>
            <Flex direction='column' gap='2' align='end'>
              <Text size='3' weight='bold'>
                {getTransactionAmount(item)}
              </Text>
              <Flex align='center' gap='2'>
                <Box
                  width='8px'
                  height='8px'
                  style={{
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: getTransactionStatusColor(item),
                  }}
                />
                <Text color='gray' size='2' weight='medium' lineHeight='12px'>
                  {getTransactionStatus(item)}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
    );
  }
);

export default TransactionList;
