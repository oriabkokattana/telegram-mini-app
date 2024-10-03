import { Avatar, Card, Flex, IconButton } from '@radix-ui/themes';
import { usePopup } from '@telegram-apps/sdk-react';
import Link from '@/modules/core/components/Link';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { useLogout } from '@/services/auth/logout/api';

interface ProfileProps {
  avatar?: string;
  nickname?: string;
}

const Profile = ({ avatar, nickname }: ProfileProps) => {
  const logout = useLogout();
  const popup = usePopup();

  const onLogout = () => {
    if (popup.supports('open')) {
      popup
        .open({
          title: 'Want to log out?',
          message: 'Confirm to log out',
          buttons: [
            { id: 'logout', type: 'default', text: 'Log out' },
            { id: 'close', type: 'default', text: 'Close' },
          ],
        })
        .then((value) => {
          if (value && value === 'logout') {
            logout.mutate();
          }
        });
    } else {
      logout.mutate();
    }
  };

  return (
    <Flex height='40px' justify='between' align='center'>
      <Card variant='ghost' style={{ cursor: 'pointer' }} onClick={onLogout}>
        <Flex align='center' gap='2'>
          <Avatar src={avatar} fallback='AV' radius='large' />
          <Flex direction='column' justify='center' gap='2'>
            <Text size='2' weight='medium' lineHeight='12px'>
              {nickname || 'Anonymous'}
            </Text>
            <Flex align='center' gap='2px'>
              <Text color='gray' size='2' weight='medium' lineHeight='14px' letterSpacing='-0.14px'>
                Profile
              </Text>
              <Icon name='chevron-forward' variant='secondary' />
            </Flex>
          </Flex>
        </Flex>
      </Card>
      <IconButton asChild variant='ghost' size='4'>
        <Link to='/analytics'>
          <Icon name='analytics' />
        </Link>
      </IconButton>
    </Flex>
  );
};

export default Profile;
