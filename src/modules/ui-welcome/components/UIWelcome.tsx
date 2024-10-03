import { useNavigate } from 'react-router-dom';
import * as Label from '@radix-ui/react-label';
import { Box, Button, Flex, IconButton } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { useThemeStore } from '@/store/theme-store';
import { useUserStore } from '@/store/user-store';
import AssetsPlaceholder from './AssetsPlaceholder';
import Footer from './Footer';

import { styles } from './UIWelcome.styles';

const UIWelcome = () => {
  const toggleWelcomed = useUserStore((state) => state.toggleWelcomed);
  const navigate = useNavigate();
  const theme = useThemeStore((state) => state.theme);

  const onToggleWelcomed = () => {
    toggleWelcomed();
    navigate('/auth');
  };

  return (
    <Flex height='100vh' direction='column' gap='8' pt='8'>
      <Flex direction='column' align='center' gap='7' px='4'>
        <Flex direction='column' align='center' gap='5'>
          <Flex width='210px' direction='column' align='center' gap='4'>
            <Icon name='app-logo' width={169} height={64} />
            <Text color='gray' size='2' weight='medium' align='center' lineHeight='20px'>
              Next SpaceX in crypto trading. A new era in trading experience.
            </Text>
          </Flex>
          <Button size='3' onClick={onToggleWelcomed}>
            <Text color='sky' size='2' weight='bold' lineHeight='12px'>
              Get Started
            </Text>
          </Button>
        </Flex>
        <Flex width='100%'>
          <Flex
            asChild
            flexGrow='1'
            flexShrink='1'
            flexBasis='0'
            direction='column'
            align='center'
            gap='2'
            style={{ cursor: 'pointer' }}
          >
            <Label.Root>
              <IconButton color='gray' variant='soft' size='4' onClick={onToggleWelcomed}>
                <Icon name='arrow-down-half-circle' variant='tertiary' />
              </IconButton>
              <Text size='2' lineHeight='12px'>
                Deposit
              </Text>
            </Label.Root>
          </Flex>
          <Flex
            asChild
            flexGrow='1'
            flexShrink='1'
            flexBasis='0'
            direction='column'
            align='center'
            gap='2'
            style={{ cursor: 'pointer' }}
          >
            <Label.Root>
              <IconButton color='gray' variant='soft' size='4' onClick={onToggleWelcomed}>
                <Icon name='arrow-up-half-circle' variant='tertiary' />
              </IconButton>
              <Text size='2' lineHeight='12px'>
                Withdraw
              </Text>
            </Label.Root>
          </Flex>
          <Flex
            asChild
            flexGrow='1'
            flexShrink='1'
            flexBasis='0'
            direction='column'
            align='center'
            gap='2'
            style={{ cursor: 'not-allowed' }}
          >
            <Label.Root>
              <IconButton color='gray' variant='soft' size='4' disabled>
                <Icon name='plus' variant='tertiary' />
              </IconButton>
              <Text color='gray' size='2' lineHeight='12px'>
                Add a label
              </Text>
            </Label.Root>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        width='100%'
        flexGrow='1'
        direction='column'
        gap='5'
        position='relative'
        overflow='hidden'
      >
        <Box
          position='absolute'
          inset='0'
          onClick={onToggleWelcomed}
          {...stylex.props(styles.placeholder, theme === 'dark' ? styles.dark : styles.light)}
        />
        <Flex
          height='32px'
          align='center'
          gap='28px'
          position='relative'
          px='4'
          style={{ zIndex: '2' }}
        >
          <Text size='3' weight='bold'>
            My Assets
          </Text>
          <Text color='gray' size='3' weight='medium'>
            Watchlist
          </Text>
          <Text color='gray' size='3' weight='medium'>
            Price Alerts
          </Text>
        </Flex>
        <AssetsPlaceholder />
      </Flex>
      <Footer toggleWelcomed={onToggleWelcomed} />
    </Flex>
  );
};

export default UIWelcome;
