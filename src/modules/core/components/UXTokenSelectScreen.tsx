import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import SearchIcon from '@/assets/search.svg?react';
import TrashIcon from '@/assets/trash.svg?react';
import { useSetAppBg } from '@/hooks/use-set-app-bg';
import { useSearchHistoryStore } from '@/store/search-history-store';
import { getTokenBalanceList } from '@/utils/token-with-balance';
import { Input } from '../design-system/input';
import { TokenIcon } from '../design-system/token-icon';

import { styles } from './UXTokenSelectScreen.styles';

import { TokenItem } from '@/types';

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
  data?: TokenItem[];
  extended?: boolean;
  onSelect(token: TokenItem): void;
}

const UXTokenSelectScreen = ({ data, extended, onSelect }: UXTokenSelectScreenProps) => {
  const [search, setSearch] = useState('');
  const [symbol, setSymbol] = useState('');

  const { history, addToHistory, clearHistory } = useSearchHistoryStore();

  useSetAppBg('white');

  const tokens = getTokenBalanceList(data, !extended)?.filter((token) => {
    const tokenName = token.name.toLowerCase() + '&' + token.symbol.toLowerCase();
    const isSearch = tokenName.includes(search.toLowerCase());
    const isSymbol =
      symbol === '1' ? /\d/.test(tokenName) : tokenName.startsWith(symbol.toLowerCase());
    return isSearch && isSymbol;
  });

  const popular = data?.filter((token) => token.popular);

  const handleSelect = (token: TokenItem) => {
    if (!popular?.some((item) => item.symbol === token.symbol)) {
      addToHistory(token.symbol);
    }
    onSelect(token);
  };

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
        {extended && !!history.length && (
          <div {...stylex.props(styles.column, styles.sm)}>
            <div {...stylex.props(styles.labelWrapper)}>
              <span {...stylex.props(styles.label)}>Search History</span>
              <TrashIcon {...stylex.props(styles.trashIcon)} onClick={clearHistory} />
            </div>
            <div {...stylex.props(styles.tagList)}>
              {history.map((item) => (
                <div
                  {...stylex.props(styles.tagWrapper, search === item)}
                  key={item}
                  onClick={() => setSearch(item)}
                >
                  <span {...stylex.props(styles.tag)}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {extended && (
          <div {...stylex.props(styles.column, styles.sm)}>
            <span {...stylex.props(styles.label)}>Popular Assets</span>
            <div {...stylex.props(styles.tagList)}>
              {popular?.map((item) => (
                <div
                  {...stylex.props(styles.tagWrapper)}
                  key={item.symbol}
                  onClick={() => handleSelect(item)}
                >
                  <span {...stylex.props(styles.tag)}>{item.symbol}</span>
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
          {tokens?.map((item) => (
            <div {...stylex.props(styles.row)} key={item.symbol} onClick={() => handleSelect(item)}>
              <div {...stylex.props(styles.tokenWrapper)}>
                <TokenIcon size='sm' name={item.symbol} />
                <span {...stylex.props(styles.name)}>{item.name}</span>
              </div>
              <div {...stylex.props(styles.amountWrapper)}>
                <span {...stylex.props(styles.amount)}>{item.balance}</span>{' '}
                <span {...stylex.props(styles.currency)}>{item.symbol}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UXTokenSelectScreen;
