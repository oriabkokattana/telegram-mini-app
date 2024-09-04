import { useEffect, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useMiniApp } from '@telegram-apps/sdk-react';
import SearchIcon from '@/assets/search.svg?react';
import TrashIcon from '@/assets/trash.svg?react';
import { Input } from '../design-system/input';
import { TokenIcon } from '../design-system/token-icon';

import { styles } from './UXTokenSelect.styles';

export type TokenItem = {
  name: string;
  amount: string;
  currency: string;
};

const SEARCH_HISTORY = ['BTC'];
const POPULAR_ASSETS = ['USDT', 'BTC', 'ETH', 'SOL', 'TON', 'ARB'];
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

export interface UXTokenSelectProps {
  extended?: boolean;
  onSelect(token: TokenItem): void;
}

const UXTokenSelect = ({ extended, onSelect }: UXTokenSelectProps) => {
  const miniApp = useMiniApp();
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState('');
  const [popular, setPopular] = useState('');
  const [symbol, setSymbol] = useState('');

  useEffect(() => {
    miniApp.setHeaderColor('#F7F7F7');
    miniApp.setBgColor('#F7F7F7');
  }, []);

  const tokens = SEARCH_LIST.filter((token) => {
    const tokenName = token.name.toLowerCase() + '&' + token.currency.toLowerCase();
    const isSearch = tokenName.includes(search.toLowerCase());
    const isHistory = tokenName.includes(history.toLowerCase());
    const isPopular = tokenName.includes(popular.toLowerCase());
    const isSymbol =
      symbol === '1' ? /\d/.test(tokenName) : tokenName.startsWith(symbol.toLowerCase());
    return isSearch && isHistory && isPopular && isSymbol;
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
                  {...stylex.props(styles.tagWrapper, history === tag && styles.tagSelected)}
                  key={tag}
                  onClick={() => setHistory(history === tag ? '' : tag)}
                >
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
                <div
                  {...stylex.props(styles.tagWrapper, popular === tag && styles.tagSelected)}
                  key={tag}
                  onClick={() => setPopular(popular === tag ? '' : tag)}
                >
                  <span {...stylex.props(styles.tag)}>{tag}</span>
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
            <div {...stylex.props(styles.row)} key={token.name} onClick={() => onSelect(token)}>
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
