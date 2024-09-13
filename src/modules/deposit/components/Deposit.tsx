import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Heading } from '@radix-ui/themes';
import { useShowMainButton } from '@/hooks/use-show-main-button';
import Transactions from './Transactions';

const Deposit = () => {
  const navigate = useNavigate();

  const mainButtonCallback = useCallback(() => navigate('/deposit-token-select'), [navigate]);

  useShowMainButton({
    variant: 'light',
    text: 'Deposit',
    callback: mainButtonCallback,
  });

  return (
    <Flex width='100%' minHeight='var(--tg-viewport-height)' px='4' py='4' direction='column'>
      <Flex gap='2' align='center' mb='2'>
        <Heading>Deposit</Heading>
      </Flex>
      <Transactions />
    </Flex>
  );
};

export default Deposit;
