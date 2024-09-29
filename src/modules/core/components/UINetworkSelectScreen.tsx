import { useMemo } from 'react';
import { Card, Flex } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { useBalancesStore } from '@/store/balances-store';
import { convertSeconds } from '@/utils/duration';
import { getAvailableBalance } from '@/utils/token-with-balance';
import { Text } from '../design-system/text';
import { TokenIcon } from '../design-system/token-icon';
import NoDataPlaceholder from './NoDataPlaceholder';

import { styles } from './UINetworkSelectScreen.styles';

import { AvailableBalance, Direction, NetworkItem, WithdrawDepositToken } from '@/types';

type Network = NetworkItem & AvailableBalance;

interface UINetworkSelectScreenProps {
  data?: NetworkItem[];
  token: WithdrawDepositToken | null;
  direction: Direction;
  onSelect(network: NetworkItem): void;
}

const UINetworkSelectScreen = ({
  data,
  token,
  direction,
  onSelect,
}: UINetworkSelectScreenProps) => {
  const balances = useBalancesStore((state) => state.balances);

  const networkList = useMemo<Network[]>(() => {
    if (!token || !data?.length) {
      return [];
    }
    const items = [...data].map((item) => ({
      ...item,
      ...getAvailableBalance(balances[token.symbol]?.network_balances[item.name]),
    }));
    items.sort((a, b) => b.balanceUSD - a.balanceUSD);
    if (direction === 'withdraw') {
      return items.filter((item) => !!item.balance);
    }
    return items;
  }, [data, token, balances, direction]);

  return (
    <Flex direction='column' gap='5' p='4'>
      <Text size='2' align='center' weight='bold' lineHeight='16px'>
        {direction === 'deposit' ? 'Deposit' : 'Withdraw'} {token?.name}
      </Text>
      <Flex direction='column' align='center' gap='2' px='6'>
        <TokenIcon name={token?.symbol || ''} size='md' />
        <Text size='4' align='center' weight='bold' lineHeight='16px'>
          Select Network
        </Text>
        <Flex direction='column' align='center'>
          <Text color='gray' size='1' align='center' lineHeight='15px'>
            Select the network you will use to deposit your {token?.symbol}.
          </Text>
          <Text color='gray' size='1' align='center' lineHeight='15px'>
            Using the wrong network will result in a loss of funds.
          </Text>
        </Flex>
      </Flex>
      {networkList.length ? (
        <Flex direction='column' gap='4'>
          {networkList.map((item) => (
            <Card
              key={item.name}
              size='2'
              style={{ cursor: 'pointer' }}
              onClick={() => onSelect(item)}
            >
              <Flex direction='column' gap='4'>
                <Text size='2' weight='medium' lineHeight='12px'>
                  {item.description} {item.token_standard}
                </Text>
                <Flex align='center' gap='2'>
                  <Flex asChild px='3' py='2' {...stylex.props(styles.badge)}>
                    <Text color='gray' size='2' weight='medium' lineHeight='12px'>
                      {convertSeconds(item.processing_time_seconds)}
                    </Text>
                  </Flex>
                  <Flex asChild px='3' py='2' {...stylex.props(styles.badge)}>
                    <Text color='gray' size='2' weight='medium' lineHeight='12px'>
                      &gt;
                      {direction === 'deposit' ? item.token_min_deposit : item.token_min_withdraw}
                      {token?.symbol} minimum
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
          ))}
        </Flex>
      ) : (
        <NoDataPlaceholder text='Oops, it seems there is no chain in here' />
      )}
    </Flex>
  );
};

export default UINetworkSelectScreen;
