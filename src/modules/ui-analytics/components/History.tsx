import { useState } from 'react';
import { Flex, IconButton } from '@radix-ui/themes';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import TransactionList from '@/modules/core/components/TransactionList';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@/modules/core/design-system/ui-dropdown';
import { useTransactions } from '@/services/user/transactions/api';

import { TransactionType } from '@/types';

const History = () => {
  const [type, setType] = useState<TransactionType>();
  const { data: transactionsData } = useTransactions();
  const isBottomGap = useCheckBottomGap();

  const transactions = type
    ? transactionsData?.filter((item) => item.transaction_type === type)
    : transactionsData;

  return (
    <Flex direction='column' gap='4' pt='4' pb={isBottomGap ? '6' : '4'}>
      <Dropdown>
        <DropdownTrigger>
          <IconButton
            color='gray'
            variant='soft'
            size='2'
            style={{ width: 'max-content', padding: '0 var(--space-3)' }}
          >
            <Flex align='center' gap='2'>
              <Text
                color='brown'
                size='2'
                weight='bold'
                lineHeight='12px'
                textTransform='capitalize'
              >
                {type ? type : 'all'}
              </Text>
              <Icon name='chevron-down' variant='tertiary' size={16} />
            </Flex>
          </IconButton>
        </DropdownTrigger>
        <DropdownContent width='124px' align='start' sideOffset={8}>
          <DropdownItem onClick={() => setType(undefined)}>
            <Text
              color='bronze'
              size='2'
              weight={type === undefined ? 'bold' : 'regular'}
              lineHeight='12px'
            >
              All
            </Text>
          </DropdownItem>
          <DropdownItem onClick={() => setType('deposit')}>
            <Text
              color='bronze'
              size='2'
              weight={type === 'deposit' ? 'bold' : 'regular'}
              lineHeight='12px'
            >
              Deposit
            </Text>
          </DropdownItem>
          <DropdownItem onClick={() => setType('withdraw')}>
            <Text
              color='bronze'
              size='2'
              weight={type === 'withdraw' ? 'bold' : 'regular'}
              lineHeight='12px'
            >
              Withdraw
            </Text>
          </DropdownItem>
          <DropdownItem onClick={() => setType('swap')}>
            <Text
              color='bronze'
              size='2'
              weight={type === 'swap' ? 'bold' : 'regular'}
              lineHeight='12px'
            >
              Swap
            </Text>
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
      <TransactionList data={transactions} />
    </Flex>
  );
};

export default History;
