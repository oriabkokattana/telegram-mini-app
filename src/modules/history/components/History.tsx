import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Flex, Heading, IconButton, Separator } from '@radix-ui/themes';
import { MainButtonParams } from '@telegram-apps/sdk-react';
import { useShowMainButton } from '@/hooks/use-show-main-button';
import Link from '@/modules/core/components/Link';
import PreviousDeposits from './PreviousDeposits';
import PreviousWithdrawals from './PreviousWithdrawals';

const History = () => {
  const navigate = useNavigate();

  const mainButtonParams = useMemo<Partial<MainButtonParams>>(
    () => ({
      bgColor: '#aa1388',
      text: 'Start Trading',
      isVisible: true,
      isEnabled: true,
    }),
    []
  );
  const mainButtonCallback = useCallback(() => navigate('/trading'), [navigate]);

  useShowMainButton(mainButtonCallback, mainButtonParams);

  return (
    <Flex width='100%' minHeight='var(--tg-viewport-height)' px='4' py='4' direction='column'>
      <Flex gap='2' align='center' mb='2'>
        <IconButton asChild>
          <Link to='/profile'>
            <ChevronLeftIcon />
          </Link>
        </IconButton>
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
