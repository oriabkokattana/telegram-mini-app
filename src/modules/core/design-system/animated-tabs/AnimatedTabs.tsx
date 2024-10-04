import { forwardRef, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Box, Flex, Tabs } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { useViewport } from '@telegram-apps/sdk-react';

import { styles } from './AnimatedTabs.styles';

const getTabIndex = (tab: string, tabs: string[]) =>
  tabs.indexOf(tab) === -1 ? 0 : tabs.indexOf(tab);

export type AnimatedTabsProps = {
  pt: string;
  tabs: string[];
  defaultValue?: string;
  tab: string;
  setTab(value: string): void;
} & Omit<Tabs.RootProps, 'value' | 'onValueChange'>;

export const AnimatedTabs = forwardRef<HTMLDivElement, AnimatedTabsProps>(
  ({ pt, tabs, tab, children, setTab, ...props }, forwardedRef) => {
    const [tabIndex, setTabIndex] = useState(getTabIndex(tab, tabs));
    const viewport = useViewport();
    const width = viewport?.width ? viewport.width : 0;
    const [translateX, setTranslateX] = useState(width * getTabIndex(tab, tabs));
    const [selecting, setSlecting] = useState(false);

    const onValueChange = (value: string) => {
      const index = getTabIndex(value, tabs);
      setTab(value);
      setTabIndex(index);
      setTranslateX(width * index);
      setSlecting(true);
      window.setTimeout(() => setSlecting(false), 500);
    };

    useEffect(() => {
      setTabIndex(getTabIndex(tab, tabs));
    }, [tab]);

    const swipeHandlers = useSwipeable({
      onSwiping: (eventData) => {
        if (eventData.dir === 'Right' && tabIndex) {
          setTranslateX(width * tabIndex - eventData.absX); // Set the pull distance
        } else if (eventData.dir === 'Left' && tabIndex !== tabs.length - 1) {
          setTranslateX(width * tabIndex + eventData.absX); // Set the pull distance
        }
      },
      onSwipedRight: (eventData) => {
        if (tabIndex && width && eventData.absX / width > 0.1) {
          onValueChange(tabs[tabIndex - 1]);
        } else {
          onValueChange(tabs[tabIndex]);
        }
      },
      onSwipedLeft: (eventData) => {
        if (tabIndex < tabs.length - 1 && width && eventData.absX / width > 0.1) {
          onValueChange(tabs[tabIndex + 1]);
        } else {
          onValueChange(tabs[tabIndex]);
        }
      },
    });

    return (
      <Flex asChild direction='column' pt={pt}>
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
            <Flex
              width='max-content'
              {...stylex.props(
                styles.shortTransition,
                selecting && styles.longTransition,
                styles.translate(translateX)
              )}
            >
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
