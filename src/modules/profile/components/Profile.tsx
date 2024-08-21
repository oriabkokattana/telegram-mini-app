import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Avatar, Button, Flex, Heading, IconButton } from '@radix-ui/themes';
import Link from '@/modules/core/components/Link';
import { useLogout } from '@/services/auth/logout/api';
import { useBalances } from '@/services/user/balances/api';
import { useProfile } from '@/services/user/profile/api';
import Balances from './Balances';
import Portfolio from './Portfolio';
import UserActions from './UserActions';

const Profile = () => {
  const logoutMutation = useLogout();
  const { data: profileData } = useProfile();
  const { data: balancesData } = useBalances();

  console.log(balancesData);

  return (
    <Flex width='100%' minHeight='var(--tg-viewport-height)' px='4' py='4' direction='column'>
      <Flex align='center' justify='between' mb='2'>
        <Flex gap='2' align='center'>
          <IconButton asChild>
            <Link to='/'>
              <ChevronLeftIcon />
            </Link>
          </IconButton>
          <Avatar src={profileData?.avatar_image} fallback='A' />
          <Heading size='5'>Username: {profileData?.nickname}</Heading>
        </Flex>
        <Button onClick={() => logoutMutation.mutate()}>Logout</Button>
      </Flex>
      <Portfolio data={profileData} />
      <Balances data={balancesData} />
      <UserActions />
    </Flex>
  );
};

export default Profile;
