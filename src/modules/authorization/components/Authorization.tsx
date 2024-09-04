import { useEffect, useState } from 'react';
import { Flex, Heading, Section, SegmentedControl } from '@radix-ui/themes';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BiometryManager, initBiometryManager } from '@telegram-apps/sdk-react';
import Biometry from './Biometry';
import EmailPassword from './EmailPassword';
import OAuth from './OAuth';

type AuthMethod = 'Email&Password' | 'OAuth' | 'Biometry' | 'Wallet';

const Authorization = () => {
  const [tab, setTab] = useState<AuthMethod>('Email&Password');
  const [bm, setBm] = useState<BiometryManager>();

  useEffect(() => {
    const [biometryManager] = initBiometryManager();
    biometryManager.then((bm) => setBm(bm)).catch((e) => console.log(e));
  }, []);

  const tabs = bm?.available
    ? ['Email&Password', 'OAuth', 'Wallet', 'Biometry']
    : ['Email&Password', 'OAuth', 'Wallet'];

  return (
    <Flex
      width='100%'
      minHeight='var(--tg-viewport-stable-height)'
      px='4'
      py='4'
      direction='column'
    >
      <Flex gap='2' align='center' mb='2'>
        <Heading>Sign in/up</Heading>
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
        {tab === 'Email&Password' && <EmailPassword />}
        {tab === 'OAuth' && <OAuth />}
        {tab === 'Biometry' && <Biometry biometryManager={bm!} />}
        {tab === 'Wallet' && (
          <Section py='6'>
            <Flex justify='center'>
              <ConnectButton />
            </Flex>
          </Section>
        )}
      </Flex>
    </Flex>
  );
};

export default Authorization;
