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
  setToken(token: string): void;
}

const TokenSelectButton = ({ token, type }: TokenSelectButtonProps) => {
  return (
    <Flex asChild align='center' gap='2' p='2' {...stylex.props(styles.base)}>
      <Link to={`/swap-token-select/${type}`}>
        <TokenIcon name={token} size='ui-sm' />
        <Text size='4' weight='medium' lineHeight='16px'>
          {token}
        </Text>
        <Icon name='chevron-down' variant='secondary' />
      </Link>
    </Flex>
  );
};

export default TokenSelectButton;
