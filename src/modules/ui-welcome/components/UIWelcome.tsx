import { useNavigate } from 'react-router-dom';
import * as Label from '@radix-ui/react-label';
import { Box, Button, Flex, IconButton } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { useUserStore } from '@/store/user-store';
import Footer from './Footer';

import { styles } from './UIWelcome.styles';

const UIWelcome = () => {
  const toggleWelcomed = useUserStore((state) => state.toggleWelcomed);
  const navigate = useNavigate();

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
        <Flex width='100%' px='9'>
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
        </Flex>
      </Flex>
      <Flex flexGrow='1' position='relative'>
        <Box position='absolute' inset='0' {...stylex.props(styles.placeholder)} />
        <Flex height='32px' align='center' position='relative' px='4'>
          <Text color='sky' size='3' weight='bold'>
            My Assets
          </Text>
        </Flex>
        <Flex
          asChild
          position='absolute'
          top='50%'
          left='50%'
          mt='30px'
          style={{ translate: '-50% -50%' }}
        >
          <Button size='3' onClick={onToggleWelcomed}>
            <Text color='sky' size='2' weight='bold' lineHeight='12px'>
              Login or Registration
            </Text>
          </Button>
        </Flex>
      </Flex>
      <Footer toggleWelcomed={onToggleWelcomed} />
    </Flex>
  );
};

export default UIWelcome;
