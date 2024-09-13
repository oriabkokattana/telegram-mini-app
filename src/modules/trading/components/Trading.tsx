import { useCallback, useState } from 'react';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Flex, Heading, IconButton, Section } from '@radix-ui/themes';
import { useShowMainButton } from '@/hooks/use-show-main-button';
import Link from '@/modules/core/components/Link';
import { useSwap } from '@/services/user/swap/api';
import SwapInput from './SwapInput';
import Trades from './Trades';

const Trading = () => {
  const [amount, setAmount] = useState('');

  const { mutate } = useSwap();

  const mainButtonCallback = useCallback(
    () => mutate({ amountA: Number(amount || 0), tokenA: 'USDT', tokenB: 'WBNB' }),
    [mutate, amount]
  );

  useShowMainButton({
    variant: 'light',
    text: 'Swap',
    enabled: !!amount,
    callback: mainButtonCallback,
  });

  return (
    <Flex width='100%' minHeight='var(--tg-viewport-height)' px='4' py='4' direction='column'>
      <Flex gap='2' align='center' mb='2'>
        <IconButton asChild>
          <Link to='/profile'>
            <ChevronLeftIcon />
          </Link>
        </IconButton>
        <Heading>Swap</Heading>
      </Flex>
      <Section py='6'>
        <Flex direction='column' gap='3'>
          <SwapInput
            coin='USDT'
            price={4000}
            priceChange={15.123}
            priceChangePercent={0.005}
            balance={300}
            action='Send'
            onChange={setAmount}
          />
          <SwapInput
            coin='WBNB'
            price={0.991}
            priceChange={0.012}
            priceChangePercent={0.005}
            balance={3000}
            action='Receive'
            onChange={setAmount}
          />
        </Flex>
      </Section>
      <Trades />
    </Flex>
  );
};

export default Trading;
