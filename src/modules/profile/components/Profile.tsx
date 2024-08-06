import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Flex, Heading, IconButton } from '@radix-ui/themes';
import { useInitData } from '@telegram-apps/sdk-react';
import Link from '@/modules/core/components/Link';
import Portfolio from './Portfolio';
import UserActions from './UserActions';

const Profile = () => {
  const initData = useInitData();

  return (
    <Flex width='100%' minHeight='var(--tg-viewport-height)' px='4' py='4' direction='column'>
      <Flex gap='2' align='center' mb='2'>
        <IconButton asChild>
          <Link to='/'>
            <ChevronLeftIcon />
          </Link>
        </IconButton>
        <Heading>Username: {initData?.user?.username}</Heading>
      </Flex>
      <Portfolio />
      <UserActions />
    </Flex>
  );
};

export default Profile;
