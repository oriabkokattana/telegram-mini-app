import { Button, Flex, Section } from '@radix-ui/themes';
import {
  useFacebookOauth,
  useGoogleOauth,
  useTwitterOauth,
} from '@/services/auth/oauth-provider/api';
import { openLink } from '@/utils/open-link';

const OAuth = () => {
  const { data: googleOAuth, isSuccess: isGoogleOauthSuccess, error } = useGoogleOauth();
  const { data: twitterOAuth, isSuccess: isTwitterOauthSuccess, error: er1 } = useTwitterOauth();
  const { data: facebookOAuth, isSuccess: isFacebookOauthSuccess } = useFacebookOauth();

  console.log(error);
  console.log(er1);

  return (
    <Section py='6'>
      <Flex direction='column' gap='4'>
        {isGoogleOauthSuccess && (
          <Button onClick={() => openLink(googleOAuth.redirect_url)}>Login with Google</Button>
        )}
        {isTwitterOauthSuccess && (
          <Button onClick={() => openLink(twitterOAuth.redirect_url)}>Login with X</Button>
        )}
        {isFacebookOauthSuccess && (
          <Button onClick={() => openLink(facebookOAuth.redirect_url)}>Login with Facebook</Button>
        )}
      </Flex>
    </Section>
  );
};

export default OAuth;
