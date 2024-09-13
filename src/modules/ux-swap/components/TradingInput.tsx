import { InputHTMLAttributes } from 'react';
import * as Label from '@radix-ui/react-label';
import * as stylex from '@stylexjs/stylex';
import UXCoinSelect from '@/modules/core/components/UXCoinSelect';

import { styles } from './TradingInput.styles';

const formatNumber = (input: string): string => {
  // Remove all commas first
  let noCommas = input.replace(/,/g, '');

  // Replace the last comma with a dot if a comma exists
  if (input.includes(',')) {
    const parts = input.split(',');
    noCommas = parts.slice(0, -1).join('') + '.' + parts[parts.length - 1];
  }

  return noCommas;
};

type TradingInputProps = {
  type: 'base' | 'quote';
  balance: number;
  coin?: string;
  value: string;
  onChange(value: string): void;
  onSetCoin(coin: string): void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'>;

const TradingInput = ({
  type,
  balance,
  coin,
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
    const formattedValue = formatNumber(cleanedInput);

    onChange(formattedValue);
  };

  return (
    <div {...stylex.props(styles.base)}>
      <span {...stylex.props(styles.label)}>
        <Label.Root htmlFor={`${type}-coin-select`}>{type === 'base' ? 'From' : 'To'}</Label.Root>
        <Label.Root
          htmlFor={type}
          onClick={() => onChange(balance.toString())}
          onMouseDown={(e) => e.preventDefault()}
        >
          Balance: {balance} {coin}
        </Label.Root>
      </span>
      <div {...stylex.props(styles.inputWrapper)}>
        <UXCoinSelect id={`${type}-coin-select`} coin={coin} onSelectCoin={onSetCoin} />
        <input
          {...stylex.props(styles.input)}
          {...props}
          type='text'
          inputMode='decimal'
          pattern='[0-9,.]*'
          id={type}
          placeholder='0.0'
          value={value}
          onChange={handleChange}
        />
        {type === 'quote' && <span {...stylex.props(styles.fee)}>after 0% fee</span>}
      </div>
      <span {...stylex.props(styles.usdEquivalent)}>~ $23,240.49</span>
    </div>
  );
};

export default TradingInput;
