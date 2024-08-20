import { toast } from 'sonner';
import { z } from 'zod';
import { Button, Flex, Section } from '@radix-ui/themes';
import { useQueryClient } from '@tanstack/react-query';
import { useMiniApp } from '@telegram-apps/sdk-react';
import {
  getFacebookOAuth,
  getGoogleOAuth,
  getTwitterOAuth,
} from '@/services/auth/oauth-provider/api';
import { OAuthProviderAPIResponseSchema } from '@/services/auth/oauth-provider/schema';
import { openExternalLink } from '@/utils/open-link';

const OAuth = () => {
  const miniApp = useMiniApp();
  const queryClient = useQueryClient();

  const onGoogleOAuth = async () => {
    try {
      const uri = await queryClient.ensureQueryData<z.infer<typeof OAuthProviderAPIResponseSchema>>(
        {
          queryKey: ['auth', 'oauth', 'google'],
          queryFn: () => getGoogleOAuth(),
        }
      );
      openExternalLink(uri.redirect_url);
      miniApp.close();
    } catch (error) {
      toast.error('Oops! Something went wrong...');
    }
  };

  const onTwitterOAuth = async () => {
    try {
      const uri = await queryClient.ensureQueryData<z.infer<typeof OAuthProviderAPIResponseSchema>>(
        {
          queryKey: ['auth', 'oauth', 'twitter'],
          queryFn: () => getTwitterOAuth(),
        }
      );
      openExternalLink(uri.redirect_url);
      miniApp.close();
    } catch (error) {
      toast.error('Oops! Something went wrong...');
    }
  };

  const onFacebookOAuth = async () => {
    try {
      const uri = await queryClient.ensureQueryData<z.infer<typeof OAuthProviderAPIResponseSchema>>(
        {
          queryKey: ['auth', 'oauth', 'facebook'],
          queryFn: () => getFacebookOAuth(),
        }
      );
      openExternalLink(uri.redirect_url);
      miniApp.close();
    } catch (error) {
      toast.error('Oops! Something went wrong...');
    }
  };

  return (
    <Section py='6'>
      <Flex direction='column' gap='4'>
        <Button onClick={onGoogleOAuth}>Login with Google</Button>

        <Button onClick={onTwitterOAuth}>Login with X</Button>

        <Button onClick={onFacebookOAuth}>Login with Facebook</Button>
      </Flex>
    </Section>
  );
};

export default OAuth;
