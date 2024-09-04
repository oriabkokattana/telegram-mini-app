import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Heading, Section } from '@radix-ui/themes';
import { MainButtonParams } from '@telegram-apps/sdk-react';
import { useShowMainButton } from '@/hooks/use-show-main-button';
import TokenSelect from '@/modules/core/components/TokenSelect';
import { useWithdrawStore } from '@/store/withdraw-store';

const WithdrawTokenSelect = () => {
  const navigate = useNavigate();
  const setToken = useWithdrawStore((state) => state.setToken);
  const token = useWithdrawStore((state) => state.token);

  const mainButtonParams = useMemo<Partial<MainButtonParams>>(
    () => ({
      bgColor: '#1c93e3',
      text: 'Proceed',
      isVisible: true,
      isEnabled: !!token,
    }),
    [token]
  );
  const mainButtonCallback = useCallback(() => navigate('/withdraw-chain-select'), [navigate]);

  useShowMainButton(mainButtonCallback, mainButtonParams);

  return (
    <Flex width='100%' minHeight='100dvh' px='4' py='4' direction='column'>
      <Flex gap='2' align='center' mb='2'>
        <Heading size='5' weight='bold' style={{ textTransform: 'uppercase' }}>
          Select Cryptocurrency
        </Heading>
      </Flex>
      <Section>
        <TokenSelect defaultValue={token} onSelect={setToken} showBalance />
      </Section>
    </Flex>
  );
};

export default WithdrawTokenSelect;
