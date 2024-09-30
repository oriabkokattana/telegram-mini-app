import { useState } from 'react';
import { Flex, TabNav } from '@radix-ui/themes';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import Assets from '@/modules/ui-main/components/Assets';
import AssetTreemap from './AssetTreemap';

enum Tab {
  assets = 'Assets',
  balance = 'Your Balance',
  history = 'History',
}

const UIAnalytics = () => {
  const [tab, setTab] = useState(Tab.assets);

  return (
    <Flex direction='column' gap='4' px='4' py='2'>
      <TabNav.Root size='2'>
        <TabNav.Link asChild active={tab === Tab.assets} onClick={() => setTab(Tab.assets)}>
          <Flex flexGrow='1'>{Tab.assets}</Flex>
        </TabNav.Link>
        <TabNav.Link asChild active={tab === Tab.balance} onClick={() => setTab(Tab.balance)}>
          <Flex flexGrow='1'>{Tab.balance}</Flex>
        </TabNav.Link>
        <TabNav.Link asChild active={tab === Tab.history} onClick={() => setTab(Tab.history)}>
          <Flex flexGrow='1'>{Tab.history}</Flex>
        </TabNav.Link>
      </TabNav.Root>
      <AssetTreemap />
      <Flex direction='column' gap='5'>
        <Flex height='32px' justify='between' align='center'>
          <Text size='3' weight='bold'>
            All Assets
          </Text>
          <Icon name='search' size={24} />
        </Flex>
        <Assets visible />
      </Flex>
    </Flex>
  );
};

export default UIAnalytics;
