import { Button, Flex, Section } from '@radix-ui/themes';
import Link from '@/modules/core/components/Link';

const UserActions = () => {
  return (
    <Section pb='0' mt='auto'>
      <Flex direction='column' gap='2'>
        <Button asChild variant='surface'>
          <Link to='trading'>Deposit</Link>
        </Button>
        <Button asChild variant='surface'>
          <Link to='trading'>Withdraw</Link>
        </Button>
        <Button asChild variant='surface'>
          <Link to='trading'>History</Link>
        </Button>
        <Button asChild variant='surface'>
          <Link to='trading'>Trading</Link>
        </Button>
      </Flex>
    </Section>
  );
};

export default UserActions;
