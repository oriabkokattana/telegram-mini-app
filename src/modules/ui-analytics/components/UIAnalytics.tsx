import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PullToUpdate from '@/modules/core/components/PullToUpdate';
import { AnimatedTabs, AnimatedTabsContent } from '@/modules/core/design-system/animated-tabs';
import {
  trackAssetsTabClicked,
  trackHistoryTabClicked,
  trackYourBalanceTabClicked,
} from '@/utils/amplitude-events';
import AssetAnalytics from './AssetAnalytics';
import BalanceAnalytics from './BalanceAnalytics';
import History from './History';

enum Tab {
  assets = 'Assets',
  balance = 'Your Balance',
  history = 'History',
}

const TABS = [Tab.assets, Tab.balance, Tab.history];

const trackTabs = (tab: string) => {
  switch (tab) {
    case Tab.assets:
      return trackAssetsTabClicked();
    case Tab.balance:
      return trackYourBalanceTabClicked();
    case Tab.history:
      return trackHistoryTabClicked();
  }
};

const UIAnalytics = () => {
  const [searchParams] = useSearchParams();
  const predefinedTab = searchParams.get('tab') as Tab | null;
  const [tab, setTab] = useState(predefinedTab || Tab.assets);
  const assetsContentRef = useRef<HTMLDivElement>(null);

  const onSetTab = (value: string) => {
    if (tab !== value) {
      trackTabs(value);
      setTab(value as Tab);
    }
  };

  return (
    <PullToUpdate scrollableContentRef={assetsContentRef} enabled={tab === Tab.assets}>
      <AnimatedTabs pt='2' tabs={TABS} tab={tab} setTab={onSetTab}>
        <AnimatedTabsContent ref={assetsContentRef} gap={8} value={Tab.assets}>
          <AssetAnalytics />
        </AnimatedTabsContent>
        <AnimatedTabsContent gap={8} value={Tab.balance}>
          <BalanceAnalytics />
        </AnimatedTabsContent>
        <AnimatedTabsContent gap={8} value={Tab.history}>
          <History />
        </AnimatedTabsContent>
      </AnimatedTabs>
    </PullToUpdate>
  );
};

export default UIAnalytics;
