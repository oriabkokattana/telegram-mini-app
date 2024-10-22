import { RefObject, useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { toast } from 'sonner';
import { Box, Flex, FlexProps } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import AnimatedGlobe from '@/modules/core/components/AnimatedGlobe';
import { getBalances } from '@/services/user/balances/api';
import { useBalancesStore } from '@/store/balances-store';
import { useTimeframeStore } from '@/store/timeframe-store';

import { styles } from './PullToUpdate.styles';

const TRESHOLD = 135; // Minimum pull distance to trigger refresh
const LOADER_HEIGHT = 80;

const translate = (y: number) => `0 ${y}px`;

type PullToUpdateProps = {
  enabled?: boolean;
  scrollableContentRef?: RefObject<HTMLDivElement>;
} & FlexProps;

const PullToUpdate = ({ enabled, scrollableContentRef, ...props }: PullToUpdateProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [transition, setTransition] = useState(false);
  const isTopRef = useRef(true); // Ref to track the scroll position
  const contentRef = useRef<HTMLDivElement>(null);
  const timeframe = useTimeframeStore((state) => state.balanceTimeframe);
  const setBalances = useBalancesStore((state) => state.setBalances);

  // Function to handle refresh
  const refreshContent = async () => {
    if (!refreshing) {
      try {
        setTransition(true);
        setRefreshing(true);
        // wait for user to see balances are refreshing
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await getBalances({ params: { period: timeframe } });
        setBalances(data);
      } catch (error) {
        toast.error('Oops, Something went wrong...');
      } finally {
        setRefreshing(false);
        window.setTimeout(() => setTransition(false), 300);
      }
    }
  };

  // Use swipeable hook to manage pull gestures
  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      const positionY = eventData.deltaY;
      // Check if we are at the top of the scrollable content
      if (eventData.dir === 'Down' && isTopRef.current && contentRef.current && !refreshing) {
        contentRef.current.style.translate = translate(positionY); // Set the pull distance
      }
    },
    onSwipedDown: (eventData) => {
      if (eventData.deltaY > TRESHOLD) {
        refreshContent();
      }
      if (contentRef.current && !refreshing) {
        contentRef.current.style.translate = translate(0);
      }
    },
    onSwipedLeft: () => {
      if (contentRef.current && !refreshing) {
        contentRef.current.style.translate = translate(0);
      }
    },
    onSwipedRight: () => {
      if (contentRef.current && !refreshing) {
        contentRef.current.style.translate = translate(0);
      }
    },
    onSwipedUp: () => {
      if (contentRef.current && !refreshing) {
        contentRef.current.style.translate = translate(0);
      }
    },
    trackTouch: enabled,
    trackMouse: enabled,
  });

  useEffect(() => {
    if (contentRef.current) {
      if (refreshing) {
        contentRef.current.style.translate = translate(LOADER_HEIGHT);
      } else {
        contentRef.current.style.translate = translate(0);
      }
    }
  }, [refreshing]);

  // Set up the scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollable = scrollableContentRef?.current || contentRef.current;
      if (scrollable) {
        isTopRef.current = scrollable.scrollTop <= 0; // Update scroll position
      }
    };
    const scrollable = scrollableContentRef?.current || contentRef.current;
    scrollable?.addEventListener('scroll', handleScroll);
    return () => {
      scrollable?.removeEventListener('scroll', handleScroll);
    };
  }, [scrollableContentRef?.current, contentRef.current]);

  return (
    <Box {...handlers} style={{ touchAction: 'none' }} height='100vh' overflow='hidden'>
      {refreshing && (
        <Flex
          width='100%'
          height='80px'
          justify='center'
          align='center'
          position='fixed'
          left='0'
          top='0'
        >
          <AnimatedGlobe />
        </Flex>
      )}
      <Flex
        {...props}
        ref={contentRef}
        height='100vh'
        overflow='auto'
        {...stylex.props(styles.hideScroll, transition && styles.transition)}
      />
    </Box>
  );
};

export default PullToUpdate;
