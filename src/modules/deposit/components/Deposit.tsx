import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, CopyIcon } from '@radix-ui/react-icons';
import * as Label from '@radix-ui/react-label';
import {
  Flex,
  Heading,
  IconButton,
  Section,
  Separator,
  Strong,
  Text,
  TextField,
} from '@radix-ui/themes';
import { useMainButton } from '@telegram-apps/sdk-react';
import Link from '@/modules/core/components/Link';
import Transactions from './Transactions';

const Deposit = () => {
  const mb = useMainButton();
  const navigate = useNavigate();

  mb.setParams({
    bgColor: '#aa1388',
    text: 'Deposit',
    isVisible: true,
    isEnabled: true,
  });

  mb.on('click', () => {
    navigate('#withdraw');
    mb.hide();
  });

  return (
    <Flex width='100%' minHeight='var(--tg-viewport-height)' px='4' py='4' direction='column'>
      <Flex gap='2' align='center' mb='2'>
        <IconButton asChild>
          <Link to='profile'>
            <ChevronLeftIcon />
          </Link>
        </IconButton>
        <Heading>Deposit</Heading>
      </Flex>
      <Transactions />
      <Section>
        <Flex justify='between' align='center'>
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
        </Flex>
      </Section>
      <Separator size='4' />
      <Section>
        <Flex direction='column' gap='5'>
          <Text>Create Transaction:</Text>
          <Flex maxWidth='300px' align='center' gap='2'>
            <Label.Root htmlFor='amount'>Amount:</Label.Root>
            <TextField.Root size='3' placeholder='0' id='amount' />
          </Flex>
        </Flex>
      </Section>
    </Flex>
  );
};

export default Deposit;
