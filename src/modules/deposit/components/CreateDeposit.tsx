import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { CopyIcon } from '@radix-ui/react-icons';
import * as Label from '@radix-ui/react-label';
import {
  Flex,
  Heading,
  IconButton,
  Section,
  Separator,
  Spinner,
  Strong,
  Text,
  TextField,
} from '@radix-ui/themes';
import { MainButtonParams } from '@telegram-apps/sdk-react';
import { useShowMainButton } from '@/hooks/use-show-main-button';
import { useCustodialWallet } from '@/services/user/custodial-wallet/api';
import { useDepositStore } from '@/store/deposit-store';

const CreateDeposit = () => {
  const navigate = useNavigate();
  const { isLoading } = useCustodialWallet();
  const { isConnected } = useAccount();
  const chain = useDepositStore((state) => state.chain);
  const token = useDepositStore((state) => state.token);

  const mainButtonParams = useMemo<Partial<MainButtonParams>>(
    () => ({
      bgColor: '#1c93e3',
      text: 'Deposit from connected wallet',
      isVisible: true,
      isEnabled: isConnected,
    }),
    [isConnected]
  );
  const mainButtonCallback = useCallback(() => navigate('/profile'), [navigate]);

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
        <Heading>Create Deposit</Heading>
      </Flex>
      <Section py='4'>
        <Flex direction='column' gap='3'>
          <Text>Token: {token}</Text>
          <Text>Chain: {chain}</Text>
        </Flex>
      </Section>
      <Section>
        <Flex justify={isLoading ? 'center' : 'between'} align='center'>
          {isLoading ? (
            <Spinner size='3' />
          ) : (
            <>
              <Text>
                <Strong>Address:</Strong> 0x00...0000
              </Text>
              <IconButton
                onClick={() =>
                  navigator.clipboard.writeText('0x0000000000000000000000000000000000000000')
                }
              >
                <CopyIcon />
              </IconButton>
            </>
          )}
        </Flex>
      </Section>
      <Separator size='4' />
      <Section>
        <Flex direction='column' gap='5'>
          <Text>Deposit from current wallet:</Text>
          <Flex maxWidth='300px' align='center' gap='2'>
            <Label.Root htmlFor='amount'>Amount:</Label.Root>
            <TextField.Root size='3' placeholder='0' id='amount' disabled={!isConnected} />
          </Flex>
        </Flex>
      </Section>
    </Flex>
  );
};

export default CreateDeposit;
