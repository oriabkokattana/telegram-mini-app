import { forwardRef, useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Box, Flex, Tabs } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { useViewport } from '@telegram-apps/sdk-react';
import { useSwipeBackStore } from '@/store/swipe-back-store';

import { styles } from './AnimatedTabs.styles';

const getTabIndex = (tab: string, tabs: string[]) =>
  tabs.indexOf(tab) === -1 ? 0 : tabs.indexOf(tab);

const translate = (x: number) => `-${x}px`;

export type AnimatedTabsProps = {
  pt: string;
  tabs: string[];
  defaultValue?: string;
  tab: string;
  setTab(value: string): void;
} & Omit<Tabs.RootProps, 'value' | 'onValueChange'>;

export const AnimatedTabs = forwardRef<HTMLDivElement, AnimatedTabsProps>(
  ({ pt, tabs, tab, children, setTab, ...props }, forwardedRef) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [stopScroll, setStopScroll] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const viewport = useViewport();
    const setSwipeBackEnabled = useSwipeBackStore((state) => state.setSwipeBackEnabled);

    const width = viewport?.width ? viewport.width : 0;

    const onValueChange = (value: string) => {
      const index = getTabIndex(value, tabs);
      setTab(value);
      setTabIndex(index);
      if (contentRef.current) {
        contentRef.current.style.translate = translate(width * index);
      }
    };

    useEffect(() => {
      if (getTabIndex(tab, tabs) !== 0) {
        setSwipeBackEnabled(false);
      } else {
        setSwipeBackEnabled(true);
      }

      if (tab !== tabs[tabIndex]) {
        onValueChange(tab);
      }
    }, [tab]);

    const swipeHandlers = useSwipeable({
      onSwiping: (eventData) => {
        if (contentRef.current) {
          if (eventData.dir === 'Right' && tabIndex) {
            setStopScroll(true);
            contentRef.current.style.translate = translate(width * tabIndex - eventData.absX); // Set the pull distance
          } else if (eventData.dir === 'Left' && tabIndex !== tabs.length - 1) {
            setStopScroll(true);
            contentRef.current.style.translate = translate(width * tabIndex + eventData.absX); // Set the pull distance
          }
        }
      },
      onSwipedRight: (eventData) => {
        if (tabIndex && width && eventData.absX / width > 0.1) {
          setStopScroll(false);
          onValueChange(tabs[tabIndex - 1]);
        } else {
          setStopScroll(false);
          onValueChange(tabs[tabIndex]);
        }
      },
      onSwipedLeft: (eventData) => {
        if (tabIndex < tabs.length - 1 && width && eventData.absX / width > 0.1) {
          setStopScroll(false);
          onValueChange(tabs[tabIndex + 1]);
        } else {
          setStopScroll(false);
          onValueChange(tabs[tabIndex]);
        }
      },
      onSwipedUp: () => {
        setStopScroll(false);
        onValueChange(tabs[tabIndex]);
      },
      onSwipedDown: () => {
        setStopScroll(false);
        onValueChange(tabs[tabIndex]);
      },
      preventScrollOnSwipe: stopScroll,
    });

    return (
      <Flex asChild width='100%' direction='column' pt={pt}>
        <Tabs.Root
          {...props}
          ref={forwardedRef}
          value={tabs[tabIndex]}
          onValueChange={onValueChange}
        >
          <Tabs.List size='2'>
            {tabs.map((item) => (
              <Flex asChild key={item} flexGrow='1' flexShrink='1' flexBasis='0'>
                <Tabs.Trigger value={item}>{item}</Tabs.Trigger>
              </Flex>
            ))}
          </Tabs.List>
          <Box width='100%' overflow='hidden' {...swipeHandlers}>
            <Flex ref={contentRef} width='max-content' {...stylex.props(styles.transition)}>
              {children}
            </Flex>
          </Box>
        </Tabs.Root>
      </Flex>
    );
  }
);

export const AnimatedTabsContent = forwardRef<
  HTMLDivElement,
  { gap: number } & Omit<Tabs.ContentProps, 'style' | 'className' | 'forceMount'>
>(({ gap, ...props }, forwardedRef) => (
  <Flex
    ref={forwardedRef}
    width='100vw'
    height={`calc(100vh - 40px - ${gap}px)`}
    px='4'
    overflowY='auto'
    {...stylex.props(styles.hideScroll)}
  >
    <Tabs.Content {...props} {...stylex.props(styles.tabContent)} forceMount />
  </Flex>
));
