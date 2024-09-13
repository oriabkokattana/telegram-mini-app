import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Heading, Separator } from '@radix-ui/themes';
import { useSetAppBg } from '@/hooks/use-set-app-bg';
import { useShowMainButton } from '@/hooks/use-show-main-button';
import Link from '@/modules/core/components/Link';
import { useUserStore } from '@/store/user-store';
import { getIsMocked } from '@/utils/get-is-mocked';
import About from './About';
import Advantages from './Advantages';
import WhyUs from './WhyUs';

const Landing = () => {
  const navigate = useNavigate();
  const user = useUserStore();

  useSetAppBg('white');

  const mainButtonCallback = useCallback(
    () => navigate(user ? '/ux/main' : '/auth'),
    [user, navigate]
  );

  useShowMainButton({
    variant: 'light',
    text: 'Go to the moon',
    callback: mainButtonCallback,
  });

  return (
    <Flex width='100%' minHeight='var(--tg-viewport-height)' px='4' py='4' direction='column'>
      <Flex justify='center' mb='2'>
        <Heading size='3'>Welcome to Kattana broker</Heading>
      </Flex>
      <About />
      <Separator size='4' mt='auto' my='1' />
      <Advantages />
      <Separator size='4' mt='auto' my='1' />
      <WhyUs />
      {getIsMocked() && (
        <Flex justify='center'>
          <Button asChild size='2'>
            <Box asChild width='200px'>
              <Link to='/ux/main'>Go to the moon</Link>
            </Box>
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Landing;
