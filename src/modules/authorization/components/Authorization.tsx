import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import * as Label from '@radix-ui/react-label';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Section,
  SegmentedControl,
  Text,
  TextField,
} from '@radix-ui/themes';
// import { useGoogleLogin } from '@react-oauth/google';
import { initBiometryManager, useLaunchParams, useUtils } from '@telegram-apps/sdk-react';
import Link from '@/modules/core/components/Link';

type AuthMethod = 'Email&Password' | 'OAuth' | 'Biometry';

const Authorization = () => {
  const [token, setToken] = useState<string>();
  const [tab, setTab] = useState<AuthMethod>('Email&Password');

  const navigate = useNavigate();
  const lp = useLaunchParams();
  const utils = useUtils();

  const googleLogin = () => {
    utils.openLink('https://kattana.io/', { tryBrowser: true });
  };
  // useGoogleLogin({
  //   onSuccess: (codeResponse) => toast(codeResponse.code),
  //   flow: 'auth-code',
  //   ux_mode: 'popup',
  // });

  const onBiometry = async () => {
    try {
      const [biometryManager] = initBiometryManager();
      const bm = await biometryManager;
      const accessGranted = await bm.requestAccess({ reason: 'Authorize to start using biometry' });
      if (accessGranted) {
        const token = await bm.authenticate({ reason: 'Authorize to unlock the storage' });
        console.log('token: ', token);

        setToken(token);
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tabs =
    lp.platform === 'ios' || lp.platform === 'android'
      ? ['Email&Password', 'OAuth', 'Biometry']
      : ['Email&Password', 'OAuth'];

  return (
    <Flex width='100%' minHeight='var(--tg-viewport-height)' px='4' py='4' direction='column'>
      <Flex gap='2' align='center' mb='2'>
        <IconButton asChild>
          <Link to='/'>
            <ChevronLeftIcon />
          </Link>
        </IconButton>
        <Heading>Sign in/up</Heading>
        {token && (
          <Text as='p' mt='2'>
            Token: {token}
          </Text>
        )}
      </Flex>
      <Flex width='100%' my='auto' direction='column' gap='6'>
        <Flex justify='center'>
          <SegmentedControl.Root size='1' defaultValue='Email&Password'>
            {tabs.map((item) => (
              <SegmentedControl.Item
                key={item}
                value={item}
                onClick={() => setTab(item as AuthMethod)}
              >
                {item}
              </SegmentedControl.Item>
            ))}
          </SegmentedControl.Root>
        </Flex>
        {tab === 'Email&Password' && (
          <Section py='6'>
            <Flex direction='column' gap='4'>
              <Flex direction='column' gap='5'>
                <Flex maxWidth='300px' align='center' gap='9'>
                  <Label.Root htmlFor='amount'>Email:</Label.Root>
                  <TextField.Root size='3' placeholder='user@gmail.com' id='amount' />
                </Flex>
              </Flex>
              <Flex maxWidth='300px' align='center' gap='33px'>
                <Label.Root htmlFor='amount'>Password:</Label.Root>
                <TextField.Root size='3' placeholder='123456...' id='amount' />
              </Flex>
              <Button asChild>
                <Link to='/profile'>Login</Link>
              </Button>
            </Flex>
          </Section>
        )}
        {tab === 'OAuth' && (
          <Section py='6'>
            <Flex direction='column' gap='4'>
              <Button onClick={() => googleLogin()}>Login with Google</Button>
              <Button asChild>
                <Link to='/profile'>Login with Apple</Link>
              </Button>
              <Button asChild>
                <Link to='/profile'>Login with X</Link>
              </Button>
            </Flex>
          </Section>
        )}
        {tab === 'Biometry' && (
          <Section py='6'>
            <Box asChild width='100%'>
              <Button onClick={onBiometry}>Login with Biometry</Button>
            </Box>
          </Section>
        )}
      </Flex>
    </Flex>
  );
};

export default Authorization;
