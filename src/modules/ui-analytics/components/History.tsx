import { useState } from 'react';
import { Checkbox, Flex, IconButton } from '@radix-ui/themes';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import TransactionList from '@/modules/core/components/TransactionList';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@/modules/core/design-system/dropdown';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { useTransactions } from '@/services/user/transactions/api';

import { TransactionType } from '@/types';

const allTransactionTypes: TransactionType[] = ['deposit', 'swap', 'withdraw'];

const History = () => {
  const [types, setTypes] = useState<TransactionType[]>(allTransactionTypes);
  const { data: transactionsData, isLoading } = useTransactions();
  const isBottomGap = useCheckBottomGap();

  const transactions = transactionsData?.filter((item) => types.includes(item.transaction_type));

  const onSelectTransactionType = (item: TransactionType) => {
    if (types.length === allTransactionTypes.length) {
      setTypes([item]);
    } else {
      if (types.includes(item)) {
        if (types.length === 1) {
          setTypes(allTransactionTypes);
        } else {
          setTypes(types.filter((transactionType) => transactionType !== item));
        }
      } else {
        setTypes([...types, item]);
      }
    }
  };

  return (
    <Flex direction='column' gap='4' pt='4' pb={isBottomGap ? '6' : '4'}>
      <Flex height='40px' align='center'>
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
                  {types.length === allTransactionTypes.length ? 'all' : types.join(', ')}
                </Text>
                <Icon name='chevron-down' variant='tertiary' size={16} />
              </Flex>
            </IconButton>
          </DropdownTrigger>
          <DropdownContent width='151px' align='start' sideOffset={8}>
            <DropdownItem onClick={() => setTypes(allTransactionTypes)}>
              <Flex align='center' gap='2'>
                <Checkbox size='1' checked={types.length === allTransactionTypes.length} />
                <Text color='bronze' size='2' weight='medium' lineHeight='20px'>
                  All
                </Text>
              </Flex>
            </DropdownItem>
            <DropdownItem onClick={() => onSelectTransactionType('deposit')}>
              <Flex align='center' gap='2'>
                <Checkbox size='1' checked={types.includes('deposit')} />
                <Text color='bronze' size='2' weight='medium' lineHeight='20px'>
                  Deposit
                </Text>
              </Flex>
            </DropdownItem>
            <DropdownItem onClick={() => onSelectTransactionType('withdraw')}>
              <Flex align='center' gap='2'>
                <Checkbox size='1' checked={types.includes('withdraw')} />
                <Text color='bronze' size='2' weight='medium' lineHeight='20px'>
                  Withdraw
                </Text>
              </Flex>
            </DropdownItem>
            <DropdownItem onClick={() => onSelectTransactionType('swap')}>
              <Flex align='center' gap='2'>
                <Checkbox size='1' checked={types.includes('swap')} />
                <Text color='bronze' size='2' weight='medium' lineHeight='20px'>
                  Swap
                </Text>
              </Flex>
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </Flex>
      <TransactionList data={transactions} loading={isLoading} />
    </Flex>
  );
};

export default History;
