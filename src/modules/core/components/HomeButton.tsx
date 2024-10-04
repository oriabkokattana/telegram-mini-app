import { Flex } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { Icon } from '../design-system/icon';
import Link from './Link';

import { styles } from './HomeButton.styles';

interface HomeButtonProps {
  top?: number;
}

const HomeButton = ({ top = 0 }: HomeButtonProps) => {
  return (
    <Flex
      asChild
      width='68px'
      height='48px'
      justify='center'
      align='center'
      position='absolute'
      left='100%'
      top={`${top}px`}
      {...stylex.props(styles.base)}
    >
      <Link to='/'>
        <Icon name='home' size={20} />
      </Link>
    </Flex>
  );
};

export default HomeButton;
