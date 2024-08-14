import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button, Flex, Section } from '@radix-ui/themes';
import { BiometryManager } from '@telegram-apps/sdk-react';

interface BiometryProps {
  biometryManager: BiometryManager;
}

const Biometry = ({ biometryManager }: BiometryProps) => {
  const navigate = useNavigate();
  const onBiometry = async () => {
    try {
      if (!biometryManager.accessRequested) {
        await biometryManager.requestAccess({
          reason: 'Grant access to start using biometry',
        });
      }
      if (!biometryManager.accessGranted) {
        toast.info('Enable biometry for this bot in telegram biometry settings');
        return;
      }
      await biometryManager.authenticate({ reason: 'Authorize to unlock trading' });
      navigate('/profile');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Section py='6'>
      <Flex direction='column' gap='4'>
        <Button onClick={() => biometryManager.openSettings()}>Biometry Settings</Button>
        <Button onClick={onBiometry}>Login with Biometry</Button>
      </Flex>
    </Section>
  );
};

export default Biometry;
