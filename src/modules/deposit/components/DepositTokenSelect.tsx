import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Heading, Section } from '@radix-ui/themes';
import { MainButtonParams } from '@telegram-apps/sdk-react';
import { useShowMainButton } from '@/hooks/use-show-main-button';
import TokenSelect from '@/modules/core/components/TokenSelect';
import { useDepositStore } from '@/store/deposit-store';

const DepositTokenSelect = () => {
  const navigate = useNavigate();
  const setToken = useDepositStore((state) => state.setToken);
  const token = useDepositStore((state) => state.token);

  const mainButtonParams = useMemo<Partial<MainButtonParams>>(
    () => ({
      bgColor: '#1c93e3',
      text: 'Proceed',
      isVisible: true,
      isEnabled: !!token,
    }),
    [token]
  );
  const mainButtonCallback = useCallback(() => navigate('/deposit-chain-select'), [navigate]);

  useShowMainButton(mainButtonCallback, mainButtonParams);

  return (
    <Flex width='100%' minHeight='var(--tg-viewport-height)' px='4' py='4' direction='column'>
      <Flex gap='2' align='center' mb='2'>
        <Heading size='5' weight='bold' style={{ textTransform: 'uppercase' }}>
          Select Cryptocurrency
        </Heading>
      </Flex>
      <Section>
        <TokenSelect defaultValue={token} onSelect={setToken} />
      </Section>
    </Flex>
  );
};

export default DepositTokenSelect;
