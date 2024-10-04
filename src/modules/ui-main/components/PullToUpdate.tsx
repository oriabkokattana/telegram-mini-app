import { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { toast } from 'sonner';
import { Box, Flex, FlexProps } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import AnimatedGlobe from '@/modules/core/components/AnimatedGlobe';
import { getBalances } from '@/services/user/balances/api';
import { useBalancesStore } from '@/store/balances-store';
import { useTimeframeStore } from '@/store/timeframe-store';
import Footer from './Footer';

import { styles } from './PullToUpdate.styles';

const TRESHOLD = 135; // Minimum pull distance to trigger refresh
const LOADER_HEIGHT = 80;

const PullToUpdate = (props: FlexProps) => {
  const [translateY, setTranslateY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isTopRef = useRef(true); // Ref to track the scroll position
  const timeframe = useTimeframeStore((state) => state.balanceTimeframe);
  const setBalances = useBalancesStore((state) => state.setBalances);

  // Function to handle refresh
  const refreshContent = async () => {
    if (!refreshing) {
      try {
        setRefreshing(true);
        // wait for user to see balances are refreshing
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await getBalances({ params: { period: timeframe } });
        setBalances(data);
      } catch (error) {
        toast.error('Oops, Something went wrong...');
      } finally {
        setRefreshing(false);
      }
    }
  };

  // Use swipeable hook to manage pull gestures
  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      // Check if we are at the top of the scrollable content
      if (eventData.dir === 'Down' && isTopRef.current && eventData.deltaY > 40) {
        setTranslateY(eventData.deltaY); // Set the pull distance
      }
    },
    onSwipedDown: (eventData) => {
      if (eventData.deltaY > TRESHOLD) {
        refreshContent();
      }
      setTranslateY(0);
    },
    trackTouch: true,
  });

  // Set up the scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        isTopRef.current = scrollRef.current.scrollTop <= 0; // Update scroll position
      }
    };
    scrollRef.current?.addEventListener('scroll', handleScroll);
    return () => {
      scrollRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Box {...handlers} style={{ touchAction: 'none' }}>
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
          ref={scrollRef}
          height='100vh'
          overflow='auto'
          {...stylex.props(
            styles.content,
            (refreshing || translateY === 0) && styles.transition,
            styles.translate(refreshing ? LOADER_HEIGHT : translateY)
          )}
        />
      </Box>
      <Footer />
    </>
  );
};

export default PullToUpdate;
