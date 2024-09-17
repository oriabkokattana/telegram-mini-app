import { LinkProps, useLocation } from 'react-router-dom';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as stylex from '@stylexjs/stylex';
import KattanaIcon from '@/assets/kattana.svg?react';
import PersonIcon from '@/assets/person.svg?react';
import SwapIcon from '@/assets/swap.svg?react';
import Link from '@/modules/core/components/Link';

import { styles } from './Footer.styles';

enum Tab {
  home = 'Home',
  swap = 'Swap',
  account = 'Account',
}

const Footer = () => {
  return (
    <NavigationMenu.Root {...stylex.props(styles.base)}>
      <NavigationMenu.List {...stylex.props(styles.navigationList)}>
        <NavigationMenuLink to='/' {...stylex.props(styles.link)}>
          <KattanaIcon {...stylex.props(styles.icon)} />
          <span {...stylex.props(styles.label)}>{Tab.home}</span>
        </NavigationMenuLink>
        <NavigationMenuLink to='/swap' {...stylex.props(styles.link)}>
          <SwapIcon {...stylex.props(styles.icon)} />
          <span {...stylex.props(styles.label)}>{Tab.swap}</span>
        </NavigationMenuLink>
        <NavigationMenuLink to='/portfolio' {...stylex.props(styles.link)}>
          <PersonIcon {...stylex.props(styles.icon)} />
          <span {...stylex.props(styles.label)}>{Tab.account}</span>
        </NavigationMenuLink>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

const NavigationMenuLink = ({ to, ...props }: LinkProps) => {
  const location = useLocation();
  const isActive = to === location.pathname;

  return (
    <NavigationMenu.Link asChild active={isActive}>
      <Link to={to} className='NavigationMenuLink' {...props} />
    </NavigationMenu.Link>
  );
};

export default Footer;
