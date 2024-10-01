import * as Label from '@radix-ui/react-label';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Flex, IconButton } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';

import { styles } from './Footer.styles';

enum ETab {
  home = 'Home',
  swap = 'Swap',
  account = 'Account',
}

interface FooterProps {
  toggleWelcomed(): void;
}

const Footer = ({ toggleWelcomed }: FooterProps) => {
  const isBottomGap = useCheckBottomGap();

  return (
    <NavigationMenu.Root {...stylex.props(styles.base, isBottomGap && styles.bottomGap)}>
      <NavigationMenu.List {...stylex.props(styles.navigationList)}>
        <NavigationMenu.Link asChild active {...stylex.props(styles.link)} onClick={toggleWelcomed}>
          <Flex
            asChild
            height='100%'
            flexGrow='1'
            direction='column'
            justify='center'
            align='center'
            gap='1'
          >
            <Label.Root>
              <IconButton size='1' variant='ghost'>
                <Icon name='home' />
              </IconButton>
              <Text customSize='10px' weight='medium' letterSpacing='-0.1px' lineHeight='8px'>
                {ETab.home}
              </Text>
            </Label.Root>
          </Flex>
        </NavigationMenu.Link>
        <NavigationMenu.Link asChild {...stylex.props(styles.link)} onClick={toggleWelcomed}>
          <Flex
            asChild
            height='100%'
            flexGrow='1'
            direction='column'
            justify='center'
            align='center'
            gap='1'
          >
            <Label.Root>
              <IconButton size='4'>
                <Icon name='swap' variant='white' />
              </IconButton>
            </Label.Root>
          </Flex>
        </NavigationMenu.Link>
        <NavigationMenu.Link asChild {...stylex.props(styles.link)} onClick={toggleWelcomed}>
          <Flex
            asChild
            height='100%'
            flexGrow='1'
            direction='column'
            justify='center'
            align='center'
            gap='1'
          >
            <Label.Root>
              <IconButton size='1' variant='ghost'>
                <Icon name='account' variant='secondary' />
              </IconButton>
              <Text customSize='10px' weight='medium' letterSpacing='-0.1px' lineHeight='8px'>
                {ETab.account}
              </Text>
            </Label.Root>
          </Flex>
        </NavigationMenu.Link>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Footer;
