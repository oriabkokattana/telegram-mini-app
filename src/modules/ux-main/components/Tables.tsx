import { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as stylex from '@stylexjs/stylex';
import Assets from './Assets';

import { styles } from './Tables.styles';

enum Tab {
  myAssets,
  watchlist,
  priceAlerts,
  openOrders,
}

const TABS_LEN = 4;

const Tables = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(Tab.myAssets);
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex < TABS_LEN - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (currentIndex === TABS_LEN - 1 && tabsRef.current) {
      tabsRef.current.scrollTo({ behavior: 'smooth', left: tabsRef.current.scrollWidth });
    }
    if (currentIndex === 0 && tabsRef.current) {
      tabsRef.current.scrollTo({ behavior: 'smooth', left: 0 });
    }
  }, [currentIndex]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  return (
    <TabsPrimitive.Root
      {...stylex.props(styles.base)}
      value={currentIndex.toString()}
      onValueChange={(value) => setCurrentIndex(Number(value))}
    >
      <div {...stylex.props(styles.tabListWrapper)}>
        <TabsPrimitive.List {...stylex.props(styles.tabList)} ref={tabsRef}>
          <TabsPrimitive.Trigger
            {...stylex.props(styles.tabTrigger)}
            value={Tab.myAssets.toString()}
          >
            My Assets
          </TabsPrimitive.Trigger>
          {/* <TabsPrimitive.Trigger
            {...stylex.props(styles.tabTrigger)}
            value={Tab.watchlist.toString()}
          >
            Watchlist
          </TabsPrimitive.Trigger>
          <TabsPrimitive.Trigger
            {...stylex.props(styles.tabTrigger)}
            value={Tab.priceAlerts.toString()}
          >
            Price Alerts
          </TabsPrimitive.Trigger>
          <TabsPrimitive.Trigger
            {...stylex.props(styles.tabTrigger)}
            value={Tab.openOrders.toString()}
          >
            Open Orders
          </TabsPrimitive.Trigger> */}
        </TabsPrimitive.List>
      </div>

      <div {...swipeHandlers} {...stylex.props(styles.swipeContainer)}>
        <div {...stylex.props(styles.tabContentWrapper, styles.tx(currentIndex))}>
          <TabsPrimitive.Content
            {...stylex.props(styles.tabContent)}
            value={Tab.myAssets.toString()}
            forceMount
          >
            <Assets />
          </TabsPrimitive.Content>
          {/* <TabsPrimitive.Content
            {...stylex.props(styles.tabContent)}
            value={Tab.watchlist.toString()}
          ></TabsPrimitive.Content>
          <TabsPrimitive.Content
            {...stylex.props(styles.tabContent)}
            value={Tab.priceAlerts.toString()}
          ></TabsPrimitive.Content>
          <TabsPrimitive.Content
            {...stylex.props(styles.tabContent)}
            value={Tab.openOrders.toString()}
          ></TabsPrimitive.Content> */}
        </div>
      </div>
    </TabsPrimitive.Root>
  );
};

export default Tables;
