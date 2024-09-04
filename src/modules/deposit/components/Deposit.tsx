import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Heading } from '@radix-ui/themes';
import { MainButtonParams } from '@telegram-apps/sdk-react';
import { useShowMainButton } from '@/hooks/use-show-main-button';
import Transactions from './Transactions';

const Deposit = () => {
  const navigate = useNavigate();

  const mainButtonParams = useMemo<Partial<MainButtonParams>>(
    () => ({
      bgColor: '#1c93e3',
      text: 'Deposit',
      isVisible: true,
      isEnabled: true,
    }),
    []
  );
  const mainButtonCallback = useCallback(() => navigate('/deposit-token-select'), [navigate]);

  useShowMainButton(mainButtonCallback, mainButtonParams);

  return (
    <Flex width='100%' minHeight='100dvh' px='4' py='4' direction='column'>
      <Flex gap='2' align='center' mb='2'>
        <Heading>Deposit</Heading>
      </Flex>
      <Transactions />
    </Flex>
  );
};

export default Deposit;
