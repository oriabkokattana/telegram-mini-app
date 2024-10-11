import { forwardRef, useState } from 'react';
import { toast } from 'sonner';
import { Button, Card, Flex } from '@radix-ui/themes';
import { formatDateWithTime } from '@/utils/date';
import { formatNumber } from '@/utils/numbers';
import { Dialog, DialogTitle } from '../design-system/dialog';
import { Text, TextProps } from '../design-system/text';
import TransactionsSkeleton from '../skeletons/TransactionsSkeleton';
import NoDataPlaceholder from './NoDataPlaceholder';

import { TransactionItem } from '@/types';

const onCopyTxHash = async (txHash?: string) => {
  if (txHash) {
    await navigator.clipboard.writeText(txHash);
    toast.success('Transaction hash copied to clipboard!');
  }
};

const getTransactionTitle = (transaction: TransactionItem) => {
  switch (transaction.transaction_type) {
    case 'deposit':
    case 'withdraw':
      return transaction.source_token;
    case 'swap':
      return `${transaction.source_token} to ${transaction.destination_token}`;
    default:
      return '—';
  }
};

const getTransactionAmount = (transaction: TransactionItem) => {
  switch (transaction.transaction_type) {
    case 'deposit':
      return `+ ${formatNumber(transaction.source_amount)}`;
    case 'withdraw':
      return `- ${formatNumber(transaction.source_amount)}`;
    case 'swap':
      return `+ ${formatNumber(transaction.destination_amount)}`;
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

const getTransactionAmountColor = (transaction: TransactionItem): TextProps['color'] => {
  switch (transaction.transaction_type) {
    case 'deposit':
      return 'mint';
    case 'withdraw':
      return 'crimson';
    default:
      return undefined;
  }
};

interface TransactionListProps {
  data?: TransactionItem[];
  loading: boolean;
}

const TransactionList = forwardRef<HTMLDivElement, TransactionListProps>(
  ({ data, loading }, forwardedRef) => {
    const [tx, setTx] = useState<TransactionItem>();

    if (loading) {
      return <TransactionsSkeleton />;
    }

    if (!data?.length) {
      return (
        <NoDataPlaceholder
          variant='list'
          title="You don't have history yet"
          description='Complete a transaction to see the history'
        />
      );
    }

    const onOpnenTx = (value: boolean) => {
      if (!value) {
        setTx(undefined);
      } else {
        setTx(tx);
      }
    };

    return (
      <Flex direction='column' gap='2' ref={forwardedRef}>
        {data?.map((item) => <TransactionRow key={item.id} item={item} setTx={setTx} />)}
        <Dialog asChild open={!!tx} trigger={null} setOpen={onOpnenTx}>
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
                    {tx?.tx_hash}
                  </Text>
                </Flex>
              </Card>
              <Button size='4' onClick={() => onCopyTxHash(tx?.tx_hash)}>
                <Text color='sky' size='3' weight='bold'>
                  Copy
                </Text>
              </Button>
            </Flex>
          </Flex>
        </Dialog>
      </Flex>
    );
  }
);

type TransactionRow = {
  item: TransactionItem;
  setTx(tx: TransactionItem): void;
};

const TransactionRow = ({ item, setTx }: TransactionRow) => {
  return (
    <Flex
      height='56px'
      justify='between'
      align='center'
      style={{
        borderBottom: '1px solid rgba(154, 148, 170, 0.10)',
        cursor: 'pointer',
        pointerEvents: item.tx_hash ? 'auto' : 'none',
      }}
      onClick={() => setTx(item)}
    >
      <Flex direction='column' gap='2'>
        <Text size='3' weight='medium'>
          {getTransactionTitle(item)}
        </Text>
        <Text color='gray' size='2' weight='medium' lineHeight='12px'>
          {formatDateWithTime(item.timestamp)}
        </Text>
      </Flex>
      <Flex direction='column' gap='2' align='end'>
        <Text
          color={getTransactionAmountColor(item)}
          size='3'
          weight='bold'
          truncate
          style={{ maxWidth: '200px' }}
        >
          {getTransactionAmount(item)}
        </Text>
        <Text color='gray' size='2' weight='medium' lineHeight='12px' textTransform='capitalize'>
          {getTransactionStatus(item)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TransactionList;
