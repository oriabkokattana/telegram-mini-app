import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Heading, Separator } from '@radix-ui/themes';
import { useShowMainButton } from '@/hooks/use-show-main-button';
import PreviousDeposits from './PreviousDeposits';
import PreviousWithdrawals from './PreviousWithdrawals';

const History = () => {
  const navigate = useNavigate();

  const mainButtonCallback = useCallback(() => navigate('/trading'), [navigate]);

  useShowMainButton({
    variant: 'light',
    text: 'Start Trading',
    callback: mainButtonCallback,
  });

  return (
    <Flex width='100%' minHeight='var(--tg-viewport-height)' px='4' py='4' direction='column'>
      <Flex gap='2' align='center' mb='2'>
        <Heading>History</Heading>
      </Flex>
      <Flex my='auto' direction='column' gap='8'>
        <PreviousDeposits />
        <Separator size='4' />
        <PreviousWithdrawals />
      </Flex>
    </Flex>
  );
};

export default History;
