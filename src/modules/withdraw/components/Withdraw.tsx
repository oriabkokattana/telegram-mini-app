import { useState } from 'react';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import * as Label from '@radix-ui/react-label';
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Section,
  Separator,
  Text,
  TextField,
} from '@radix-ui/themes';
import Link from '@/modules/core/components/Link';
import { useWithdraw } from '@/services/user/withdraw/api';

const Withdraw = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const withdraw = useWithdraw();

  const onWithdraw = () => {
    const addr = address || '0x0000000000000000000000000000000000000000';
    const amnt = amount ? Number(amount) : 0;
    const token = 'WBNB';

    withdraw.mutate({ amount: amnt, wallet: addr, token });
  };

  return (
    <Flex width='100%' minHeight='var(--tg-viewport-height)' px='4' py='4' direction='column'>
      <Flex gap='2' align='center' mb='2'>
        <IconButton asChild>
          <Link to='/profile'>
            <ChevronLeftIcon />
          </Link>
        </IconButton>
        <Heading>Withdraw</Heading>
      </Flex>
      <Section mt='auto'>
        <Flex direction='column' gap='4'>
          <Flex direction='column' gap='5'>
            <Flex maxWidth='300px' align='center' gap='2'>
              <Label.Root htmlFor='amount'>Address:</Label.Root>
              <TextField.Root
                size='3'
                placeholder='0x00...0000'
                id='amount'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Flex>
          </Flex>
          <Flex maxWidth='300px' align='center' gap='3'>
            <Label.Root htmlFor='amount'>Amount:</Label.Root>
            <TextField.Root
              size='3'
              type='number'
              placeholder='0'
              id='amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Flex>
          <Button onClick={onWithdraw}>Send</Button>
        </Flex>
      </Section>
      <Separator size='4' />
      <Section>
        <Flex direction='column' gap='5'>
          <Text>Withdraw to current:</Text>
          <Flex maxWidth='300px' align='center' gap='2'>
            <Label.Root htmlFor='amount'>Amount:</Label.Root>
            <TextField.Root
              size='3'
              placeholder='0'
              id='amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Flex>
          <Button onClick={onWithdraw}>Withdraw</Button>
        </Flex>
      </Section>
    </Flex>
  );
};

export default Withdraw;
