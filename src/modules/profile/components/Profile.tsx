import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Button, Flex, Heading, IconButton } from '@radix-ui/themes';
import { useInitData } from '@telegram-apps/sdk-react';
import Link from '@/modules/core/components/Link';
import { useLogout } from '@/services/auth/logout/api';
import Portfolio from './Portfolio';
import UserActions from './UserActions';

const Profile = () => {
  const initData = useInitData();

  const logoutMutation = useLogout();

  return (
    <Flex width='100%' minHeight='var(--tg-viewport-height)' px='4' py='4' direction='column'>
      <Flex align='center' justify='between' mb='2'>
        <Flex gap='2' align='center'>
          <IconButton asChild>
            <Link to='/auth'>
              <ChevronLeftIcon />
            </Link>
          </IconButton>
          <Heading>Username: {initData?.user?.username}</Heading>
        </Flex>
        <Button onClick={() => logoutMutation.mutate()}>Logout</Button>
      </Flex>
      <Portfolio />
      <UserActions />
    </Flex>
  );
};

export default Profile;
