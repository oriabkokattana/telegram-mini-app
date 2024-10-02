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
    <Flex height='100vh' direction='column' gap='6' pt='8'>
      <Flex direction='column' align='center' gap='7' px='4'>
        <Flex direction='column' align='center' gap='3'>
          <Text size='8' weight='bold' lineHeight='34px'>
            Trade crypto
          </Text>
          <Text color='gray' size='2' weight='medium' lineHeight='12px'>
            Create an account to start
          </Text>
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
            direction='column'
            align='center'
            gap='2'
            style={{ cursor: 'pointer' }}
          >
            <Label.Root>
              <IconButton color='gray' variant='soft' size='4' onClick={onToggleWelcomed}>
                <Icon name='plus' variant='tertiary' />
              </IconButton>
              <Text size='2' lineHeight='12px'>
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
          {...stylex.props(styles.placeholder, theme === 'dark' ? styles.dark : styles.light)}
        />
        <Flex
          height='32px'
          justify='between'
          align='center'
          position='relative'
          px='4'
          style={{ zIndex: '2' }}
        >
          <Flex align='center' gap='28px' position='relative'>
            <Text size='3' weight='bold'>
              My Assets
            </Text>
            <Text color='gray' size='3' weight='bold'>
              Watchlist
            </Text>
            <Text color='gray' size='3' weight='bold'>
              Price Alerts
            </Text>
            <Box
              width='49px'
              height='40px'
              position='absolute'
              top='-8px'
              right='-17px'
              style={{
                background:
                  theme === 'dark'
                    ? 'linear-gradient(270deg, #0C0612 0%, rgba(12, 6, 18, 0.00) 100%)'
                    : 'linear-gradient(270deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)',
              }}
            />
          </Flex>
          <Icon name='filter' />
        </Flex>
        <AssetsPlaceholder />
      </Flex>
      <Footer toggleWelcomed={onToggleWelcomed} />
    </Flex>
  );
};

export default UIWelcome;
