import { useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useMiniApp } from '@telegram-apps/sdk-react';
import SearchIcon from '@/assets/search.svg?react';
import TrashIcon from '@/assets/trash.svg?react';
import { Input } from '../design-system/input';
import { TokenIcon } from '../design-system/token-icon';

import { styles } from './UXTokenSelect.styles';

const SEARCH_HISTORY = ['BTC'];
const POPULAR_ASSETS = ['USDT', 'BTC', 'ETH', 'SOL', 'TON', 'SOL', 'ARB'];
const SEARCH_LIST = [
  { name: 'Aave', amount: '0,00', currency: 'AAVE' },
  { name: 'Acala', amount: '0,00', currency: 'ACA' },
  { name: 'Arcblock', amount: '0,00', currency: 'ABT' },
  { name: 'Aion', amount: '0,00', currency: 'AION' },
  { name: 'Algorand', amount: '0,00', currency: 'ALGO' },
  { name: 'Auto', amount: '0,00', currency: 'AUTO' },
];
const SYMBOL_LIST = [
  '1',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export interface UXTokenSelectProps {
  extended?: boolean;
  onSubmit(): void;
}

const UXTokenSelect = ({ extended, onSubmit }: UXTokenSelectProps) => {
  const miniApp = useMiniApp();

  useEffect(() => {
    miniApp.setHeaderColor('#F7F7F7');
    miniApp.setBgColor('#F7F7F7');
  }, []);

  return (
    <div {...stylex.props(styles.base)}>
      <span {...stylex.props(styles.header)}>Select Asset</span>
      <Input
        size='sm'
        w='100%'
        leftElement={<SearchIcon {...stylex.props(styles.searchIcon)} />}
        placeholder='Search...'
      />
      <div {...stylex.props(styles.column, styles.md)}>
        {extended && (
          <div {...stylex.props(styles.column, styles.sm)}>
            <div {...stylex.props(styles.labelWrapper)}>
              <span {...stylex.props(styles.label)}>Search History</span>
              <TrashIcon />
            </div>
            <div {...stylex.props(styles.tagList)}>
              {SEARCH_HISTORY.map((tag) => (
                <div {...stylex.props(styles.tagWrapper)} key={tag}>
                  <span {...stylex.props(styles.tag)}>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {extended && (
          <div {...stylex.props(styles.column, styles.sm)}>
            <div {...stylex.props(styles.labelWrapper)}>
              <span {...stylex.props(styles.label)}>Popular Assets</span>
            </div>
            <div {...stylex.props(styles.tagList)}>
              {POPULAR_ASSETS.map((tag) => (
                <div {...stylex.props(styles.tagWrapper)} key={tag}>
                  <span {...stylex.props(styles.tag)}>{tag}</span>
                </div>
              ))}
            </div>
            <div {...stylex.props(styles.symbolList)}>
              {SYMBOL_LIST.map((symbol) => (
                <span {...stylex.props(styles.symbol)} key={symbol}>
                  {symbol}
                </span>
              ))}
            </div>
          </div>
        )}
        <div {...stylex.props(styles.column, styles.sm)}>
          <div {...stylex.props(styles.labelWrapper)}>
            <span {...stylex.props(styles.label)}>{extended ? 'A' : 'ASSET'}</span>
            {!extended && <span {...stylex.props(styles.label)}>AVAILABLE BALANCE</span>}
          </div>
          {SEARCH_LIST.map((token) => (
            <div {...stylex.props(styles.row)} key={token.name} onClick={onSubmit}>
              <div {...stylex.props(styles.tokenWrapper)}>
                <TokenIcon size='sm' name={token.name} />
                <span {...stylex.props(styles.name)}>{token.name}</span>
              </div>
              <div {...stylex.props(styles.amountWrapper)}>
                <span {...stylex.props(styles.amount)}>{token.amount}</span>{' '}
                <span {...stylex.props(styles.currency)}>{token.currency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UXTokenSelect;
