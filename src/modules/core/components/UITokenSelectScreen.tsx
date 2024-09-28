import { useMemo, useState } from 'react';
import { Button, Flex, IconButton } from '@radix-ui/themes';
import { useBalancesStore } from '@/store/balances-store';
import { useSearchHistoryStore } from '@/store/search-history-store';
import { formatNumberWithCommas } from '@/utils/numbers';
import { getAvailableBalance } from '@/utils/token-with-balance';
import { Icon } from '../design-system/icon';
import { Text } from '../design-system/text';
import { TextField, TextFieldSlot } from '../design-system/text-field';
import { TokenIcon } from '../design-system/token-icon';

import { AvailableBalance, Direction, TokenItem } from '@/types';

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

type Token = TokenItem & AvailableBalance;

export interface UITokenSelectScreenProps {
  data?: TokenItem[];
  direction?: Direction;
  onSelect(token: TokenItem): void;
}

const UITokenSelectScreen = ({ data, direction, onSelect }: UITokenSelectScreenProps) => {
  const [search, setSearch] = useState('');
  const { history, addToHistory, clearHistory } = useSearchHistoryStore();
  const balances = useBalancesStore((state) => state.balances);

  const tokenList = useMemo<Token[]>(() => {
    if (!data?.length) {
      return [];
    }
    const items = [...data].map((item) => ({
      ...item,
      ...getAvailableBalance(balances[item.symbol]?.total_balance),
    }));
    items.sort((a, b) => b.balanceUSD - a.balanceUSD);
    if (direction === 'withdraw') {
      return items.filter((item) => !!item.balance);
    }
    return items;
  }, [data, balances, direction]);

  const popularAssets = useMemo(() => data?.filter((item) => item.popular) || [], [data]);

  const handleSelect = (token: TokenItem) => {
    const isInPopularAssets = popularAssets?.some((item) => item.symbol === token.symbol);
    if (!isInPopularAssets) {
      addToHistory(token.symbol);
    }
    onSelect({
      name: token.name,
      symbol: token.symbol,
      popular: token.popular,
      precision: token.precision,
    });
  };

  const isAdvancedSearchView = direction === 'deposit' && !search;

  return (
    <Flex direction='column' gap='5' p='4'>
      <Text size='4' align='center' weight='bold' lineHeight='16px'>
        Select Asset
      </Text>
      <TextField value={search} onChange={setSearch} placeholder='Search' clear>
        <TextFieldSlot>
          <Icon name='search' variant='tertiary' />
        </TextFieldSlot>
      </TextField>
      {isAdvancedSearchView ? (
        <AdvancedSearchView
          tokenList={tokenList}
          popularAssets={popularAssets}
          history={history}
          setSearch={setSearch}
          clearHistory={clearHistory}
          onSelect={handleSelect}
        />
      ) : (
        <SearchView tokenList={tokenList} search={search} onSelect={handleSelect} />
      )}
    </Flex>
  );
};

type AdvancedSearchViewProps = {
  tokenList: Token[];
  popularAssets: TokenItem[];
  history: string[];
  setSearch(value: string): void;
  clearHistory(): void;
  onSelect(token: TokenItem): void;
};

const AdvancedSearchView = ({
  tokenList,
  popularAssets,
  history,
  setSearch,
  clearHistory,
  onSelect,
}: AdvancedSearchViewProps) => {
  const tokensMap = useMemo(
    () =>
      SYMBOL_LIST.reduce<Record<string, Token[]>>((acc, symbol) => {
        if (symbol === '1') {
          const items = tokenList.filter((token) => /\d/.test(token.symbol));
          if (items.length) {
            acc[symbol] = items;
          }
          return acc;
        }
        const items = tokenList.filter(
          (token) => token.symbol.startsWith(symbol) && !/\d/.test(token.symbol)
        );
        if (items.length) {
          acc[symbol] = items;
        }
        return acc;
      }, {}),
    [tokenList]
  );

  return (
    <Flex direction='column' gap='5'>
      {!!history.length && (
        <Flex direction='column' gap='2'>
          <Flex height='20px' justify='between' align='center'>
            <Text color='gray' size='2' lineHeight='12px'>
              Search History
            </Text>
            <IconButton size='1' variant='ghost' onClick={clearHistory}>
              <Icon name='bin' variant='secondary' />
            </IconButton>
          </Flex>
          <Flex wrap='wrap' gap='2'>
            {history.map((item) => (
              <Button key={item} color='gray' variant='soft' onClick={() => setSearch(item)}>
                <Text color='indigo' size='2'>
                  {item}
                </Text>
              </Button>
            ))}
          </Flex>
        </Flex>
      )}
      {!!popularAssets.length && (
        <Flex direction='column' gap='2'>
          <Text color='gray' size='2' lineHeight='20px'>
            Popular Assets
          </Text>
          <Flex wrap='wrap' gap='2'>
            {popularAssets.map((item) => (
              <Button key={item.symbol} color='gray' variant='soft' onClick={() => onSelect(item)}>
                <Text color='indigo' size='2'>
                  {item.symbol}
                </Text>
              </Button>
            ))}
          </Flex>
        </Flex>
      )}
      {Object.keys(tokensMap).map((symbol) => (
        <Flex key={symbol} direction='column' gap='4'>
          <Text color='gray' size='2' lineHeight='20px'>
            {symbol}
          </Text>
          {tokensMap[symbol].map((item) => (
            <AssetRow key={item.symbol + item.name} token={item} onClick={() => onSelect(item)} />
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

type SearchViewProps = {
  tokenList: Token[];
  search: string;
  onSelect(token: TokenItem): void;
};

const SearchView = ({ tokenList, search, onSelect }: SearchViewProps) => {
  const filteredTokenList = tokenList.filter((token) => {
    const tokenName = token.name.toLowerCase();
    const tokenSymbol = token.symbol.toLowerCase();
    return tokenName.includes(search.toLowerCase()) || tokenSymbol.includes(search.toLowerCase());
  });

  return (
    <Flex direction='column' gap='4'>
      <Flex height='20px' justify='between' align='center'>
        <Text color='gray' size='2' lineHeight='12px'>
          Asset
        </Text>
        <Text color='gray' size='2' lineHeight='12px'>
          Balance
        </Text>
      </Flex>
      {filteredTokenList.map((item) => (
        <AssetRow key={item.symbol + item.name} token={item} onClick={() => onSelect(item)} />
      ))}
    </Flex>
  );
};

type AssetRowProps = {
  token: Token;
  onClick(): void;
};

const AssetRow = ({ token, onClick }: AssetRowProps) => {
  return (
    <Flex
      height='36px'
      justify='between'
      align='center'
      gap='2'
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <Flex align='center' gap='2'>
        <Flex p='6px'>
          <TokenIcon name={token.symbol} size='ui-sm' />
        </Flex>
        <Flex direction='column' gap='1'>
          <Text size='3' weight='bold'>
            {token.symbol}
          </Text>
          <Text
            color='gray'
            customSize='13px'
            weight='medium'
            lineHeight='14px'
            letterSpacing='-0.13px'
          >
            {token.name}
          </Text>
        </Flex>
      </Flex>
      <Flex align='center' gap='1'>
        <Text size='3' weight='bold'>
          {formatNumberWithCommas(token.balance)}
        </Text>
        <Text color='gray' lineHeight='14px'>
          {token.symbol}
        </Text>
      </Flex>
    </Flex>
  );
};

export default UITokenSelectScreen;
