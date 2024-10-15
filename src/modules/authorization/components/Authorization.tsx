import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button, Flex } from '@radix-ui/themes';
import { useQueryClient } from '@tanstack/react-query';
import { useMiniApp } from '@telegram-apps/sdk-react';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import {
  getFacebookOAuth,
  getGoogleOAuth,
  getTwitterOAuth,
} from '@/services/auth/oauth-provider/api';
import { OAuthProviderAPIResponseSchema } from '@/services/auth/oauth-provider/schema';
import { useAnalyticsStore } from '@/store/analytics-store';
import { openExternalLink } from '@/utils/open-link';
import monkey from '../media/monkey.png';
import EmailPassword from './EmailPassword';

const Authorization = () => {
  const [emailPassword, setEmailPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [twitterLoading, setTwitterLoading] = useState(false);

  const miniApp = useMiniApp();
  const queryClient = useQueryClient();
  const setSignUpMethod = useAnalyticsStore((state) => state.setSignUpMethod);

  const onGoogleOAuth = async () => {
    try {
      setGoogleLoading(true);
      const uri = await queryClient.ensureQueryData<z.infer<typeof OAuthProviderAPIResponseSchema>>(
        {
          queryKey: ['auth', 'oauth', 'google'],
          queryFn: () => getGoogleOAuth(),
        }
      );
      openExternalLink(uri.redirect_url);
      setSignUpMethod('Google');
      miniApp.close();
    } catch (error) {
      toast.error('Oops! Something went wrong...');
    } finally {
      setGoogleLoading(false);
    }
  };

  const onTwitterOAuth = async () => {
    try {
      setFacebookLoading(true);
      const uri = await queryClient.ensureQueryData<z.infer<typeof OAuthProviderAPIResponseSchema>>(
        {
          queryKey: ['auth', 'oauth', 'twitter'],
          queryFn: () => getTwitterOAuth(),
        }
      );
      openExternalLink(uri.redirect_url);
      setSignUpMethod('SpaceX');
      miniApp.close();
    } catch (error) {
      toast.error('Oops! Something went wrong...');
    } finally {
      setFacebookLoading(false);
    }
  };

  const onFacebookOAuth = async () => {
    try {
      setTwitterLoading(true);
      const uri = await queryClient.ensureQueryData<z.infer<typeof OAuthProviderAPIResponseSchema>>(
        {
          queryKey: ['auth', 'oauth', 'facebook'],
          queryFn: () => getFacebookOAuth(),
        }
      );
      openExternalLink(uri.redirect_url);
      setSignUpMethod('Facebook');
      miniApp.close();
    } catch (error) {
      toast.error('Oops! Something went wrong...');
    } finally {
      setTwitterLoading(false);
    }
  };

  return (
    <Flex height='100vh' direction='column' justify='center' align='center' gap='5' px='4' py='5'>
      <Flex direction='column' align='center' gap='2'>
        <img
          src={monkey}
          alt='monkey'
          width='80px'
          height='80px'
          onClick={() => setEmailPassword(!emailPassword)}
        />
        <Text size='5' weight='bold' lineHeight='18px'>
          Welcome to The One!
        </Text>
      </Flex>
      {emailPassword && <EmailPassword />}
      <Flex width='100%' direction='column' gap='2'>
        <Button
          size='4'
          color='gray'
          variant='soft'
          loading={googleLoading}
          onClick={onGoogleOAuth}
        >
          <Flex width='100%' align='center' pl='4' pr='7'>
            <Icon name='auth-google' variant='tertiary' />
            <Text color='brown' size='3' weight='medium' lineHeight='14px' mx='auto'>
              Continue with Google
            </Text>
          </Flex>
        </Button>
        <Button
          size='4'
          color='gray'
          variant='soft'
          loading={facebookLoading}
          onClick={onFacebookOAuth}
          style={{ display: 'none' }}
        >
          <Flex width='100%' align='center' pl='4' pr='7'>
            <Icon name='auth-facebook' variant='tertiary' />
            <Text color='brown' size='3' weight='medium' lineHeight='14px' mx='auto'>
              Continue with Facebook
            </Text>
          </Flex>
        </Button>
        <Button
          size='4'
          color='gray'
          variant='soft'
          loading={twitterLoading}
          onClick={onTwitterOAuth}
        >
          <Flex width='100%' align='center' pl='4' pr='7'>
            <Icon name='auth-twitter' variant='tertiary' />
            <Text color='brown' size='3' weight='medium' lineHeight='14px' mx='auto'>
              Continue with SpaceX
            </Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Authorization;
