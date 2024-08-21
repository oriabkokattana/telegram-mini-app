import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Heading, Section } from '@radix-ui/themes';
import { MainButtonParams } from '@telegram-apps/sdk-react';
import { useShowMainButton } from '@/hooks/use-show-main-button';
import ChainSelect from '@/modules/core/components/ChainSelect';
import { useWithdrawStore } from '@/store/withdraw-store';

const WithdrawChainSelect = () => {
  const navigate = useNavigate();
  const setChain = useWithdrawStore((state) => state.setChain);
  const token = useWithdrawStore((state) => state.token);

  const mainButtonParams = useMemo<Partial<MainButtonParams>>(
    () => ({
      bgColor: '#1c93e3',
      text: 'Proceed',
      isVisible: true,
      isEnabled: true,
    }),
    []
  );
  const mainButtonCallback = useCallback(() => navigate('/withdraw'), [navigate]);

  useShowMainButton(mainButtonCallback, mainButtonParams);

  return (
    <Flex width='100%' minHeight='var(--tg-viewport-height)' px='4' py='4' direction='column'>
      <Flex gap='2' align='center' mb='2'>
        <Heading size='5' weight='bold' style={{ textTransform: 'uppercase' }}>
          Select Chain
        </Heading>
      </Flex>
      <Section>
        <ChainSelect token={token} onSelect={setChain} />
      </Section>
    </Flex>
  );
};

export default WithdrawChainSelect;
