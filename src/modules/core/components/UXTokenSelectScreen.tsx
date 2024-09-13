import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import SearchIcon from '@/assets/search.svg?react';
import TrashIcon from '@/assets/trash.svg?react';
import { useSetAppBg } from '@/hooks/use-set-app-bg';
import { Input } from '../design-system/input';
import { TokenIcon } from '../design-system/token-icon';

import { styles } from './UXTokenSelectScreen.styles';

export type TokenItem = {
  name: string;
  amount: string;
  currency: string;
};

const SEARCH_HISTORY = ['BTC'];
const POPULAR_ASSETS = [
  { name: 'USD Tether', amount: '0,00', currency: 'USDT' },
  { name: 'Bitcoin', amount: '0,00', currency: 'BTC' },
  { name: 'Solana', amount: '0,00', currency: 'SOL' },
  { name: 'Ethereum', amount: '0,00', currency: 'ETH' },
  { name: 'Toncoin', amount: '0,00', currency: 'TON' },
  { name: 'Arbitrum', amount: '0,00', currency: 'ARB' },
];
const SEARCH_LIST: TokenItem[] = [
  { name: 'Aave', amount: '0,00', currency: 'AAVE' },
  { name: 'Acala', amount: '0,00', currency: 'ACA' },
  { name: 'Arcblock', amount: '0,00', currency: 'ABT' },
  { name: 'Aion', amount: '0,00', currency: 'AION' },
  { name: 'Algorand', amount: '0,00', currency: 'ALGO' },
  { name: 'Auto', amount: '0,00', currency: 'AUTO' },
  { name: 'USD Tether', amount: '0,00', currency: 'USDT' },
  { name: 'Bitcoin', amount: '0,00', currency: 'BTC' },
  { name: 'Solana', amount: '0,00', currency: 'SOL' },
  { name: 'Ethereum', amount: '0,00', currency: 'ETH' },
  { name: 'Toncoin', amount: '0,00', currency: 'TON' },
  { name: 'Arbitrum', amount: '0,00', currency: 'ARB' },
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

export interface UXTokenSelectScreenProps {
  extended?: boolean;
  onSelect(token: TokenItem): void;
}

const UXTokenSelectScreen = ({ extended, onSelect }: UXTokenSelectScreenProps) => {
  const [search, setSearch] = useState('');
  const [symbol, setSymbol] = useState('');

  useSetAppBg('white');

  const tokens = SEARCH_LIST.filter((token) => {
    const tokenName = token.name.toLowerCase() + '&' + token.currency.toLowerCase();
    const isSearch = tokenName.includes(search.toLowerCase());
    const isSymbol =
      symbol === '1' ? /\d/.test(tokenName) : tokenName.startsWith(symbol.toLowerCase());
    return isSearch && isSymbol;
  });

  return (
    <div {...stylex.props(styles.base)}>
      <span {...stylex.props(styles.header)}>Select Asset</span>
      <Input
        size='sm'
        variant='grey200'
        w='100%'
        leftElement={<SearchIcon {...stylex.props(styles.searchIcon)} />}
        placeholder='Search...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
                <div
                  {...stylex.props(styles.tagWrapper, search === tag)}
                  key={tag}
                  onClick={() => setSearch(tag)}
                >
                  <span {...stylex.props(styles.tag)}>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {extended && (
          <div {...stylex.props(styles.column, styles.sm)}>
            <span {...stylex.props(styles.label)}>Popular Assets</span>
            <div {...stylex.props(styles.tagList)}>
              {POPULAR_ASSETS.map((tag) => (
                <div
                  {...stylex.props(styles.tagWrapper)}
                  key={tag.name}
                  onClick={() => onSelect(tag)}
                >
                  <span {...stylex.props(styles.tag)}>{tag.currency}</span>
                </div>
              ))}
            </div>
            <div {...stylex.props(styles.symbolList)}>
              {SYMBOL_LIST.map((item) => (
                <span
                  {...stylex.props(styles.symbol, symbol === item && styles.symbolSelected)}
                  key={item}
                  onClick={() => setSymbol(symbol === item ? '' : item)}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
        <div {...stylex.props(styles.column, styles.sm)}>
          <div {...stylex.props(styles.labelWrapper)}>
            <span {...stylex.props(styles.label)}>{extended ? symbol || 'ALL' : 'ASSET'}</span>
            {!extended && <span {...stylex.props(styles.label)}>AVAILABLE BALANCE</span>}
          </div>
          {tokens.map((token) => (
            <div {...stylex.props(styles.row)} key={token.currency} onClick={() => onSelect(token)}>
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

export default UXTokenSelectScreen;
