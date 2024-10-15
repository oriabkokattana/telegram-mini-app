import { To, useLocation } from 'react-router-dom';
import * as Label from '@radix-ui/react-label';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Flex, IconButton } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import Link from '@/modules/core/components/Link';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { trackSwapIconButtonClicked } from '@/utils/amplitude-events';

import { styles } from './Footer.styles';

enum ETab {
  home = 'Home',
  swap = 'Swap',
  account = 'Account',
}

const Footer = () => {
  const isBottomGap = useCheckBottomGap();

  return (
    <NavigationMenu.Root {...stylex.props(styles.base, isBottomGap && styles.bottomGap)}>
      <NavigationMenu.List {...stylex.props(styles.navigationList)}>
        <NavigationMenuLink to='/' {...stylex.props(styles.link)}>
          <Label.Root>
            <IconButton size='1' variant='ghost'>
              <Icon name='home' />
            </IconButton>
            <Text customSize='10px' weight='medium' letterSpacing='-0.1px' lineHeight='8px'>
              {ETab.home}
            </Text>
          </Label.Root>
        </NavigationMenuLink>
        <NavigationMenuLink
          to='/swap'
          {...stylex.props(styles.link)}
          onClick={() => trackSwapIconButtonClicked()}
        >
          <Label.Root>
            <IconButton size='4'>
              <Icon name='swap' variant='white' />
            </IconButton>
          </Label.Root>
        </NavigationMenuLink>
        <NavigationMenuLink to='/account' {...stylex.props(styles.link)} disabled>
          <Label.Root>
            <IconButton size='1' variant='ghost' disabled>
              <Icon name='account' variant='secondary' />
            </IconButton>
            <Text customSize='10px' weight='medium' letterSpacing='-0.1px' lineHeight='8px'>
              {ETab.account}
            </Text>
          </Label.Root>
        </NavigationMenuLink>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

type NavigationMenuLinkProps = {
  to: To;
  disabled?: boolean;
} & NavigationMenu.NavigationMenuLinkProps;

const NavigationMenuLink = ({ to, disabled, children, ...props }: NavigationMenuLinkProps) => {
  const location = useLocation();
  const isActive = to === location.pathname;

  if (disabled) {
    return (
      <NavigationMenu.Link {...props} asChild active={false}>
        <Flex
          asChild
          height='100%'
          flexGrow='1'
          direction='column'
          justify='center'
          align='center'
          gap='1'
          style={{ cursor: 'not-allowed' }}
        >
          {children}
        </Flex>
      </NavigationMenu.Link>
    );
  }

  return (
    <NavigationMenu.Link {...props} asChild active={isActive}>
      <Link to={to}>
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
