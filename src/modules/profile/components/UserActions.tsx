import { Button, Flex, Section } from '@radix-ui/themes';
import Link from '@/modules/core/components/Link';

const UserActions = () => {
  return (
    <Section pb='0' mt='auto'>
      <Flex direction='column' gap='2'>
        <Button asChild variant='surface'>
          <Link to='/deposit'>Deposit</Link>
        </Button>
        <Button asChild variant='surface'>
          <Link to='/withdraw'>Withdraw</Link>
        </Button>
        <Button asChild variant='surface'>
          <Link to='/history'>History</Link>
        </Button>
        <Button asChild variant='surface'>
          <Link to='/trading'>Trading</Link>
        </Button>
      </Flex>
    </Section>
  );
};

export default UserActions;
