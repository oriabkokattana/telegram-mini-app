import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Heading, Section } from '@radix-ui/themes';
import { useShowMainButton } from '@/hooks/use-show-main-button';
import ChainSelect from '@/modules/core/components/ChainSelect';
import { useWithdrawStore } from '@/store/withdraw-store';

const WithdrawChainSelect = () => {
  const navigate = useNavigate();
  const setChain = useWithdrawStore((state) => state.setChain);
  const token = useWithdrawStore((state) => state.token);
  const chain = useWithdrawStore((state) => state.chain);

  const mainButtonCallback = useCallback(() => navigate('/withdraw'), [navigate]);

  useShowMainButton({
    variant: 'light',
    text: 'Proceed',
    enabled: !!chain,
    callback: mainButtonCallback,
  });

  return (
    <Flex width='100%' minHeight='100% !important' px='4' py='4' direction='column'>
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

export default WithdrawChainSelect;
