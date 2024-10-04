import { useState } from 'react';
import { AnimatedTabs, AnimatedTabsContent } from '@/modules/core/design-system/animated-tabs';
import AssetAnalytics from './AssetAnalytics';
import BalanceAnalytics from './BalanceAnalytics';
import History from './History';

enum Tab {
  assets = 'Assets',
  balance = 'Your Balance',
  history = 'History',
}

const TABS = [Tab.assets, Tab.balance, Tab.history];

const UIAnalytics = () => {
  const [tab, setTab] = useState(Tab.assets);

  return (
    <AnimatedTabs pt='2' tabs={TABS} tab={tab} setTab={(value) => setTab(value as Tab)}>
      <AnimatedTabsContent gap={8} value={Tab.assets}>
        <AssetAnalytics />
      </AnimatedTabsContent>
      <AnimatedTabsContent gap={8} value={Tab.balance}>
        <BalanceAnalytics />
      </AnimatedTabsContent>
      <AnimatedTabsContent gap={8} value={Tab.history}>
        <History />
      </AnimatedTabsContent>
    </AnimatedTabs>
  );
};

export default UIAnalytics;
