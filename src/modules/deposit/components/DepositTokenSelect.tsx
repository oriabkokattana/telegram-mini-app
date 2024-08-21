import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Flex, Heading, IconButton, Section } from '@radix-ui/themes';
import { MainButtonParams } from '@telegram-apps/sdk-react';
import { useShowMainButton } from '@/hooks/use-show-main-button';
import Link from '@/modules/core/components/Link';
import TokenSelect from '@/modules/core/components/TokenSelect';

const DepositTokenSelect = () => {
  const navigate = useNavigate();

  const mainButtonParams = useMemo<Partial<MainButtonParams>>(
    () => ({
      bgColor: '#aa1388',
      text: 'Proceed',
      isVisible: true,
      isEnabled: true,
    }),
    []
  );
  const mainButtonCallback = useCallback(() => navigate('/deposit-chain-select'), [navigate]);

  useShowMainButton(mainButtonCallback, mainButtonParams);

  return (
    <Flex width='100%' minHeight='var(--tg-viewport-height)' px='4' py='4' direction='column'>
      <Flex gap='2' align='center' mb='2'>
        <IconButton asChild>
          <Link to='/deposit'>
            <ChevronLeftIcon />
          </Link>
        </IconButton>
        <Heading size='5' weight='bold' style={{ textTransform: 'uppercase' }}>
          Select Cryptocurrency
        </Heading>
      </Flex>
      <Section>
        <TokenSelect />
      </Section>
    </Flex>
  );
};

export default DepositTokenSelect;
