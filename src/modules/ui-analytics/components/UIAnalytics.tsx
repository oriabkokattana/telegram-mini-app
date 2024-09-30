import { useState } from 'react';
import { Flex, Tabs } from '@radix-ui/themes';
import NoDataPlaceholder from '@/modules/core/components/NoDataPlaceholder';
import AssetAnalytics from './AssetAnalytics';
import BalanceAnalytics from './BalanceAnalytics';

enum Tab {
  assets = 'Assets',
  balance = 'Your Balance',
  history = 'History',
}

const UIAnalytics = () => {
  const [tab, setTab] = useState(Tab.assets);

  return (
    <Flex asChild direction='column' px='4' py='2'>
      <Tabs.Root value={tab} onValueChange={(value) => setTab(value as Tab)}>
        <Tabs.List size='2'>
          <Flex asChild flexGrow='1'>
            <Tabs.Trigger value={Tab.assets}>{Tab.assets}</Tabs.Trigger>
          </Flex>
          <Flex asChild flexGrow='1'>
            <Tabs.Trigger value={Tab.balance}>{Tab.balance}</Tabs.Trigger>
          </Flex>
          <Flex asChild flexGrow='1'>
            <Tabs.Trigger value={Tab.history}>{Tab.history}</Tabs.Trigger>
          </Flex>
        </Tabs.List>
        <Tabs.Content value={Tab.assets}>
          <AssetAnalytics />
        </Tabs.Content>
        <Tabs.Content value={Tab.balance}>
          <BalanceAnalytics />
        </Tabs.Content>
        <Tabs.Content value={Tab.history}>
          <Flex direction='column' gap='4' pt='4'>
            <NoDataPlaceholder
              variant='list'
              title="You don't have history yet"
              description='Complete a transaction to see the history'
            />
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
};

export default UIAnalytics;
