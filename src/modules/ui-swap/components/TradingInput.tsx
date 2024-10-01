import { InputHTMLAttributes } from 'react';
import Big from 'big.js';
import * as Label from '@radix-ui/react-label';
import { Flex } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { formatNumberWithCommas, formatPercent, transformCommaToDot } from '@/utils/numbers';
import TokenSelect from './TokenSelect';

import { styles } from './TradingInput.styles';

type TradingInputProps = {
  type: 'base' | 'quote';
  error?: boolean;
  balance: Big;
  priceUSD: Big;
  priceChangePercent: Big;
  amountUSD: Big;
  token?: string;
  value: string;
  onChange(value: string): void;
  onSetCoin(coin: string): void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'>;

const TradingInput = ({
  type,
  error,
  balance,
  priceUSD,
  priceChangePercent,
  amountUSD,
  token,
  value,
  onChange,
  onSetCoin,
  ...props
}: TradingInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Allow only numbers, commas, and dots
    const cleanedInput = input.replace(/[^0-9.,]/g, '');

    // Format the cleaned input: remove all commas except the last one and replace it with a dot
    const formattedValue = transformCommaToDot(cleanedInput);

    onChange(formattedValue);
  };

  return (
    <Flex
      width='100%'
      direction='column'
      gap='4'
      p='4'
      {...stylex.props(styles.base, error && styles.baseError)}
    >
      <Flex justify='between' align='center'>
        <Text asChild color='gray' size='1' weight='medium' lineHeight='10px'>
          <Label.Root htmlFor={`${type}-coin-select`}>{type === 'base' ? 'From' : 'To'}</Label.Root>
        </Text>
        <Text asChild color='gray' size='1' weight='medium' lineHeight='10px'>
          <Label.Root
            htmlFor={type}
            onClick={() => onChange(balance.toString())}
            onMouseDown={(e) => e.preventDefault()}
          >
            Balance: {formatNumberWithCommas(balance)} {token}
          </Label.Root>
        </Text>
      </Flex>
      <Flex width='100%' align='center' gap='2'>
        <TokenSelect id={`${type}-token-select`} token={token} setToken={onSetCoin} />
        <Text asChild size='7' customSize={26} weight='medium' lineHeight='26px'>
          <input
            {...stylex.props(styles.input, error && styles.inputError)}
            {...props}
            type='text'
            inputMode='decimal'
            pattern='[0-9,.]*'
            id={type}
            placeholder='0.0'
            value={value}
            onChange={handleChange}
          />
        </Text>
      </Flex>
      <Flex justify='between' align='center'>
        <Flex align='center' gap='1'>
          <Text color='gray' size='1' weight='medium' lineHeight='10px'>
            ${formatNumberWithCommas(priceUSD)}
          </Text>
          <Icon
            name={priceChangePercent.gte(0) ? 'top-right-arrow' : 'bottom-right-arrow'}
            size={16}
          />
          <Text size='1' weight='medium' lineHeight='10px'>
            {formatPercent(priceChangePercent)}%
          </Text>
        </Flex>
        <Text color='gray' size='1' weight='medium' lineHeight='10px'>
          ~ ${formatNumberWithCommas(amountUSD)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TradingInput;
