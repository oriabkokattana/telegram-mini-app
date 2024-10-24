import { InputHTMLAttributes } from 'react';
import Big from 'big.js';
import * as Label from '@radix-ui/react-label';
import { Flex } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import {
  formatNumberWithCommas,
  formatPercent,
  replaceAfterDot,
  transformCommaToDot,
} from '@/utils/numbers';
import TokenSelectButton from './TokenSelectButton';

import { styles } from './TradingInput.styles';

import { SwapTokenType } from '@/types';

type TradingInputProps = {
  type: SwapTokenType;
  error?: boolean;
  balance: Big;
  priceUSD: Big;
  priceChangePercent: Big;
  amountUSD: Big;
  token?: string;
  precision: number;
  value: string;
  onChange(value: string): void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'>;

const TradingInput = ({
  type,
  error,
  balance,
  priceUSD,
  priceChangePercent,
  amountUSD,
  token,
  precision,
  value,
  onChange,
  ...props
}: TradingInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Allow only numbers, commas, and dots
    const cleanedInput = input.replace(/[^0-9.,]/g, '');

    // Format the cleaned input: remove all commas except the last one and replace it with a dot
    const formattedValue = transformCommaToDot(cleanedInput);

    // Limit to precision
    const limitedValue = replaceAfterDot(formattedValue, precision - 1);

    onChange(limitedValue);
  };

  return (
    <Flex
      width='100%'
      direction='column'
      gap='4'
      p='4'
      {...stylex.props(styles.base, error && styles.baseError)}
      onFocus={() =>
        setTimeout(
          () => document.querySelector('#root')?.scrollTo({ top: 27, behavior: 'smooth' }),
          500
        )
      }
    >
      <Flex justify='between' align='center'>
        <Text color='gray' size='1' weight='medium' lineHeight='10px'>
          {type === 'base' ? 'From' : 'To'}
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
        <TokenSelectButton token={token} type={type} />
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
      <Flex justify='between' align='center' gap='2'>
        <Flex height='16px' align='center' gap='1'>
          <Text color='gray' size='1' weight='medium' lineHeight='16px'>
            ${formatNumberWithCommas(priceUSD)}
          </Text>
          <Icon
            name={priceChangePercent.gte(0) ? 'top-right-arrow' : 'bottom-right-arrow'}
            size={16}
          />
          <Text size='1' weight='medium' lineHeight='16px'>
            {formatPercent(priceChangePercent)}%
          </Text>
        </Flex>
        <Text color='gray' size='1' weight='medium' lineHeight='16px' truncate>
          ~ ${formatNumberWithCommas(amountUSD)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TradingInput;
