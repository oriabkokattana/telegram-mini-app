import { Flex } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import Link from '@/modules/core/components/Link';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { TokenIcon } from '@/modules/core/design-system/token-icon';

import { styles } from './TokenSelectButton.styles';

import { SwapTokenType } from '@/types';

interface TokenSelectButtonProps {
  token?: string;
  type: SwapTokenType;
}

const TokenSelectButton = ({ token, type }: TokenSelectButtonProps) => {
  return (
    <Flex asChild height='40px' align='center' gap='2' p='2' {...stylex.props(styles.base)}>
      <Link to={`/swap-token-select/${type}`}>
        {token && <TokenIcon name={token} size='sm' variant='monochrome' />}
        <Text size='4' weight='medium' lineHeight='16px' ml={token ? '0' : '1'}>
          {token || 'Select token'}
        </Text>
        <Icon name='chevron-down' variant='secondary' />
      </Link>
    </Flex>
  );
};

export default TokenSelectButton;
