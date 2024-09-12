import { Fragment } from 'react/jsx-runtime';
import * as Select from '@radix-ui/react-select';
import * as stylex from '@stylexjs/stylex';
import ChevronDownIcon from '@/assets/chevron-down.svg?react';
import ChevronUpIcon from '@/assets/chevron-up.svg?react';
import { TokenIcon } from '../design-system/token-icon';

import { styles } from './UXCoinSelect.styles';

const COINS_LIST = ['USDT', 'BTC', 'SOL', 'ETH', 'TON', 'ARB'];

interface UXCoinSelectProps {
  id?: string;
  coin?: string;
  onSelectCoin(coin: string): void;
}

const UXCoinSelect = ({ id, coin = 'X', onSelectCoin }: UXCoinSelectProps) => {
  return (
    <Select.Root value={coin} onValueChange={onSelectCoin}>
      <Select.Trigger {...stylex.props(styles.trigger)} id={id}>
        <Select.Value asChild aria-label={coin}>
          <div {...stylex.props(styles.valueWrapper)}>
            <TokenIcon name={coin} customSize='24px' />
            <span {...stylex.props(styles.value, coin === 'X' ? styles.placeholder : undefined)}>
              {coin === 'X' ? 'Pick coin' : coin}
            </span>
          </div>
        </Select.Value>
        <Select.Icon asChild>
          <ChevronDownIcon {...stylex.props(styles.chevronDownIcon)} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content {...stylex.props(styles.base)} onClick={(e) => e.stopPropagation()}>
          <Select.ScrollUpButton {...stylex.props(styles.scrollButtonWrapper)}>
            <ChevronUpIcon {...stylex.props(styles.scrollButton)} />
          </Select.ScrollUpButton>
          <Select.Viewport {...stylex.props(styles.viewport)}>
            {COINS_LIST.map((item) => (
              <Fragment key={item}>
                <Select.Item {...stylex.props(styles.item)} value={item}>
                  <Select.ItemText asChild>
                    <div {...stylex.props(styles.itemText)}>
                      <TokenIcon name={item} customSize='24px' />
                      <span {...stylex.props(styles.value)}>{item}</span>
                    </div>
                  </Select.ItemText>
                  <Select.ItemIndicator asChild>
                    <ChevronDownIcon {...stylex.props(styles.itemIndicator)} />
                  </Select.ItemIndicator>
                </Select.Item>
                <Select.Separator {...stylex.props(styles.separator)} />
              </Fragment>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton {...stylex.props(styles.scrollButtonWrapper)}>
            <ChevronDownIcon {...stylex.props(styles.scrollButton)} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default UXCoinSelect;
