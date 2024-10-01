import { Flex } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { TokenIcon } from '@/modules/core/design-system/token-icon';

import { styles } from './TokenSelect.styles';

interface TokenSelectProps {
  id: string;
  token?: string;
  setToken(token: string): void;
}

const TokenSelect = ({ token }: TokenSelectProps) => {
  return (
    <Flex align='center' gap='2' p='2' {...stylex.props(styles.base)}>
      <TokenIcon name={token} size='ui-sm' />
      <Text size='4' weight='medium' lineHeight='16px'>
        {token}
      </Text>
      <Icon name='chevron-down' variant='secondary' />
    </Flex>
  );
};

export default TokenSelect;
