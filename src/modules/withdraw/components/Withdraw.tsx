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

const Withdraw = () => {
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
              <TextField.Root size='3' placeholder='0x00...0000' id='amount' />
            </Flex>
          </Flex>
          <Flex maxWidth='300px' align='center' gap='3'>
            <Label.Root htmlFor='amount'>Amount:</Label.Root>
            <TextField.Root size='3' placeholder='0' id='amount' />
          </Flex>
          <Button asChild>
            <Link to='/history'>Send</Link>
          </Button>
        </Flex>
      </Section>
      <Separator size='4' />
      <Section>
        <Flex direction='column' gap='5'>
          <Text>Withdraw to current:</Text>
          <Flex maxWidth='300px' align='center' gap='2'>
            <Label.Root htmlFor='amount'>Amount:</Label.Root>
            <TextField.Root size='3' placeholder='0' id='amount' />
          </Flex>
          <Button asChild>
            <Link to='/history'>Withdraw</Link>
          </Button>
        </Flex>
      </Section>
    </Flex>
  );
};

export default Withdraw;
