import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex } from '@radix-ui/themes';
import { AnimatedTabs, AnimatedTabsContent } from '@/modules/core/design-system/animated-tabs';
import { Icon } from '@/modules/core/design-system/icon';
import { TextField, TextFieldSlot } from '@/modules/core/design-system/text-field';
import { useSwapTokens } from '@/services/user/swap-tokens/api';
import { useBalancesStore } from '@/store/balances-store';
import { useTradingStore } from '@/store/trading-store';
import AllTokens from './AllTokens';
import OwnTokens from './OwnTokens';

import { SwapTokenType } from '@/types';

enum Tab {
  all = 'All Tokens',
  own = 'Your Tokens',
}

const TABS = [Tab.all, Tab.own];

const UISwapTokenSelectScreen = () => {
  const params = useParams();
  const type = params.type as SwapTokenType;
  const balances = useBalancesStore((state) => state.balances);

  const [search, setSearch] = useState('');
  const [tab, setTab] = useState(
    type === 'base' && !!Object.keys(balances).length ? Tab.own : Tab.all
  );

  const { base, setBase, setBaseWithQuoteReset, quote, setQuote, rotate } = useTradingStore();

  const { data: swapTokensData, isLoading } = useSwapTokens(type === 'base' ? quote : base);

  const onSelect = (symbol: string, name: string, precision: number) => {
    if (type) {
      if (type === 'base') {
        if (quote === symbol) {
          rotate();
        } else {
          if (swapTokensData?.some((item) => item.symbol === symbol)) {
            setBase(symbol, name, precision);
          } else {
            setBaseWithQuoteReset(symbol, name, precision);
          }
        }
      } else {
        if (base === symbol) {
          rotate();
        } else {
          setQuote(symbol, name, precision);
        }
      }
    }
  };

  const filteredTokenList = swapTokensData?.filter((token) => {
    const tokenName = token.name.toLowerCase();
    const tokenSymbol = token.symbol.toLowerCase();
    return tokenName.includes(search.toLowerCase()) || tokenSymbol.includes(search.toLowerCase());
  });

  return (
    <Flex direction='column' pt='4'>
      <Box width='100%' px='4'>
        <TextField value={search} onChange={setSearch} placeholder='Search' clear>
          <TextFieldSlot>
            <Icon name='search' variant='tertiary' />
          </TextFieldSlot>
        </TextField>
      </Box>
      <AnimatedTabs pt='4' tabs={TABS} tab={tab} setTab={(value) => setTab(value as Tab)}>
        <AnimatedTabsContent gap={80} value={Tab.all}>
          <AllTokens data={filteredTokenList} loading={isLoading} onSelect={onSelect} />
        </AnimatedTabsContent>
        <AnimatedTabsContent gap={80} value={Tab.own}>
          <OwnTokens data={filteredTokenList} type={type} loading={isLoading} onSelect={onSelect} />
        </AnimatedTabsContent>
      </AnimatedTabs>
    </Flex>
  );
};

export default UISwapTokenSelectScreen;
