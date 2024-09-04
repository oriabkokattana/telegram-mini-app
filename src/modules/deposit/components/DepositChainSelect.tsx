import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Heading, Section } from '@radix-ui/themes';
import { MainButtonParams } from '@telegram-apps/sdk-react';
import { useShowMainButton } from '@/hooks/use-show-main-button';
import ChainSelect from '@/modules/core/components/ChainSelect';
import { useDepositStore } from '@/store/deposit-store';

const DepositChainSelect = () => {
  const navigate = useNavigate();
  const setChain = useDepositStore((state) => state.setChain);
  const token = useDepositStore((state) => state.token);
  const chain = useDepositStore((state) => state.chain);

  const mainButtonParams = useMemo<Partial<MainButtonParams>>(
    () => ({
      bgColor: '#1c93e3',
      text: 'Proceed',
      isVisible: true,
      isEnabled: !!chain,
    }),
    [chain]
  );
  const mainButtonCallback = useCallback(() => navigate('/deposit-create'), [navigate]);

  useShowMainButton(mainButtonCallback, mainButtonParams);

  return (
    <Flex
      width='100%'
      minHeight='var(--tg-viewport-stable-height)'
      px='4'
      py='4'
      direction='column'
    >
      <Flex gap='2' align='center' mb='2'>
        <Heading size='5' weight='bold' style={{ textTransform: 'uppercase' }}>
          Select Chain
        </Heading>
      </Flex>
      <Section>
        <ChainSelect defaultValue={chain} token={token} onSelect={setChain} />
      </Section>
    </Flex>
  );
};

export default DepositChainSelect;
