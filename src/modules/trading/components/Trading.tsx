import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Button, Flex, Heading, IconButton, Section } from '@radix-ui/themes';
import Link from '@/modules/core/components/Link';
import SwapInput from './SwapInput';
import Trades from './Trades';

const Trading = () => {
  return (
    <Flex width='100%' minHeight='100vh' px='4' py='4' direction='column'>
      <Flex gap='2' align='center' mb='2'>
        <IconButton asChild>
          <Link to='profile'>
            <ChevronLeftIcon />
          </Link>
        </IconButton>
        <Heading>Swap</Heading>
      </Flex>
      <Section py='6'>
        <Flex direction='column' gap='3'>
          <SwapInput
            coin='ETH'
            price={4000}
            priceChange={15.123}
            priceChangePercent={0.005}
            balance={300}
            action='Send'
          />
          <SwapInput
            coin='USDT'
            price={0.991}
            priceChange={0.012}
            priceChangePercent={0.005}
            balance={3000}
            action='Receive'
          />
        </Flex>
      </Section>
      <Trades />
      <Button asChild size='3' mt='auto'>
        <Link to='/'>Swap</Link>
      </Button>
    </Flex>
  );
};

export default Trading;
