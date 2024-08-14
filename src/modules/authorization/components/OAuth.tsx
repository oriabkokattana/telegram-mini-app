import { Button, Flex, Section } from '@radix-ui/themes';
import { useUtils } from '@telegram-apps/sdk-react';
import {
  useFacebookOauth,
  useGoogleOauth,
  useTwitterOauth,
} from '@/services/auth/oauth-provider/api';

const OAuth = () => {
  const utils = useUtils();

  const { data: googleOAuth, isSuccess: isGoogleOauthSuccess } = useGoogleOauth();
  const { data: twitterOAuth, isSuccess: isTwitterOauthSuccess } = useTwitterOauth();
  const { data: facebookOAuth, isSuccess: isFacebookOauthSuccess } = useFacebookOauth();

  return (
    <Section py='6'>
      <Flex direction='column' gap='4'>
        {isGoogleOauthSuccess && (
          <Button onClick={() => utils.openLink(googleOAuth.redirect_url, { tryBrowser: true })}>
            Login with Google
          </Button>
        )}
        {isTwitterOauthSuccess && (
          <Button onClick={() => utils.openLink(twitterOAuth.redirect_url, { tryBrowser: true })}>
            Login with X
          </Button>
        )}
        {isFacebookOauthSuccess && (
          <Button onClick={() => utils.openLink(facebookOAuth.redirect_url, { tryBrowser: true })}>
            Login with Facebook
          </Button>
        )}
      </Flex>
    </Section>
  );
};

export default OAuth;
