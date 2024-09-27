import { LinkProps, useLocation } from 'react-router-dom';
import * as Label from '@radix-ui/react-label';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Flex, IconButton } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import Link from '@/modules/core/components/Link';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';

import { styles } from './Footer.styles';

enum Tab {
  home = 'Home',
  swap = 'Swap',
  account = 'Account',
}

const Footer = () => {
  const { platform } = useLaunchParams();

  return (
    <NavigationMenu.Root {...stylex.props(styles.base, platform === 'ios' && styles.extended)}>
      <NavigationMenu.List {...stylex.props(styles.navigationList)}>
        <NavigationMenuLink to='/ui-main' {...stylex.props(styles.link)}>
          <Label.Root>
            <IconButton size='1' variant='ghost'>
              <Icon name='home' variant='primary' />
            </IconButton>
            <Text customSize='10px' weight='medium' letterSpacing='-0.1px' lineHeight='8px'>
              {Tab.home}
            </Text>
          </Label.Root>
        </NavigationMenuLink>
        <NavigationMenuLink to='/ui-swap' {...stylex.props(styles.link)}>
          <Label.Root>
            <IconButton size='4'>
              <Icon name='swap' variant='white' />
            </IconButton>
          </Label.Root>
        </NavigationMenuLink>
        <NavigationMenuLink to='/ui-profile' {...stylex.props(styles.link)}>
          <Label.Root>
            <IconButton size='1' variant='ghost'>
              <Icon name='account' variant='secondary' />
            </IconButton>
            <Text customSize='10px' weight='medium' letterSpacing='-0.1px' lineHeight='8px'>
              {Tab.account}
            </Text>
          </Label.Root>
        </NavigationMenuLink>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

const NavigationMenuLink = ({ to, children, ...props }: LinkProps) => {
  const location = useLocation();
  const isActive = to === location.pathname;

  return (
    <NavigationMenu.Link asChild active={isActive}>
      <Link {...props} to={to}>
        <Flex
          asChild
          height='100%'
          flexGrow='1'
          direction='column'
          justify='center'
          align='center'
          gap='1'
        >
          {children}
        </Flex>
      </Link>
    </NavigationMenu.Link>
  );
};

export default Footer;
