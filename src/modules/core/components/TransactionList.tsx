import { forwardRef, useState } from 'react';
import { toast } from 'sonner';
import { Box, Button, Card, Flex } from '@radix-ui/themes';
import { formatDateWithTime } from '@/utils/date';
import { formatNumber } from '@/utils/numbers';
import { Dialog, DialogTitle } from '../design-system/dialog';
import { Icon, IconName } from '../design-system/icon';
import { Text } from '../design-system/text';
import NoDataPlaceholder from './NoDataPlaceholder';

import { TransactionItem } from '@/types';

const onCopyTxHash = async (txHash?: string) => {
  if (txHash) {
    await navigator.clipboard.writeText(txHash);
    toast.success('Transaction hash copied to clipboard!');
  }
};

const getTransactionIconName = (transaction: TransactionItem): IconName => {
  switch (transaction.transaction_type) {
    case 'deposit':
      return 'arrow-down-half-circle';
    case 'withdraw':
      return 'arrow-up-half-circle';
    case 'swap':
      return 'swap';
    default:
      return 'search';
  }
};

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
    case 'open':
      return 'New';
    case 'completed':
    case 'filled':
      return 'Success';
    case 'pending':
    case 'in_process':
      return 'in Progress';
    case 'partial_canceled':
      return 'partially canceled';
    case 'partial_filled':
      return 'partially filled';
    default:
      return transaction.status;
  }
};

const getTransactionStatusColor = (transaction: TransactionItem) => {
  switch (transaction.status) {
    case 'canceled':
    case 'expired':
    case 'failed':
      return 'rgba(255, 101, 179, 1)';
    case 'completed':
    case 'filled':
    case 'partial_filled':
    case 'partial_canceled':
      return 'rgba(53, 219, 140, 1)';
    case 'pending':
    case 'in_process':
    case 'new':
    case 'open':
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
        {data?.map((item) => <TransactionRow key={item.id} item={item} />)}
      </Flex>
    );
  }
);

type TransactionRow = {
  item: TransactionItem;
};

const TransactionRow = ({ item }: TransactionRow) => {
  const [txOpen, setTxOpen] = useState(false);

  return (
    <Dialog
      asChild
      open={txOpen}
      trigger={
        <Flex justify='between' align='center'>
          <Flex direction='column' gap='2'>
            <Flex height='20px' align='center' gap='1'>
              <Icon name={getTransactionIconName(item)} variant='secondary' size={20} />
              <Text size='3' weight='bold'>
                {getTransactionTitle(item)}
              </Text>
            </Flex>
            <Text color='gray' size='2' weight='medium' lineHeight='12px'>
              {formatDateWithTime(item.timestamp)}
            </Text>
          </Flex>
          <Flex direction='column' gap='2' align='end'>
            <Text size='3' weight='bold' truncate style={{ maxWidth: '170px' }}>
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
              <Text
                color='gray'
                size='2'
                weight='medium'
                lineHeight='12px'
                textTransform='capitalize'
              >
                {getTransactionStatus(item)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      }
      setOpen={setTxOpen}
      style={{ cursor: 'pointer', pointerEvents: item.tx_hash ? 'auto' : 'none' }}
    >
      <Flex direction='column' gap='4' px='4'>
        <DialogTitle asChild>
          <Text size='4' align='center' weight='bold' lineHeight='16px'>
            Transaction Hash
          </Text>
        </DialogTitle>
        <Flex direction='column' gap='2'>
          <Card size='2' variant='classic'>
            <Flex width='300px' justify='center' mx='auto'>
              <Text size='3' weight='medium' align='center' wordBreak='break-word'>
                {item.tx_hash}
              </Text>
            </Flex>
          </Card>
          <Button size='4' onClick={() => onCopyTxHash(item.tx_hash)}>
            <Text color='sky' size='3' weight='bold'>
              Copy
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Dialog>
  );
};

export default TransactionList;
