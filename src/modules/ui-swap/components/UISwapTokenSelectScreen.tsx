import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Tabs } from '@radix-ui/themes';
import { Icon } from '@/modules/core/design-system/icon';
import { TextField, TextFieldSlot } from '@/modules/core/design-system/text-field';
import { useSwapTokens } from '@/services/user/swap-tokens/api';
import { useTradingStore } from '@/store/trading-store';
import AllTokens from './AllTokens';
import OwnTokens from './OwnTokens';

import { SwapTokenType } from '@/types';

enum Tab {
  all = 'All Tokens',
  own = 'Your Tokens',
}

const UISwapTokenSelectScreen = () => {
  const params = useParams();
  const type = params.type as SwapTokenType;

  const [search, setSearch] = useState('');
  const [tab, setTab] = useState(type === 'base' ? Tab.own : Tab.all);

  const { base, setBase, quote, setQuote, rotate } = useTradingStore();

  const { data: swapTokensData, isLoading } = useSwapTokens(type, type === 'base' ? quote : base);

  const onSelect = (symbol: string, name: string) => {
    if (type) {
      if (type === 'base') {
        if (quote === symbol) {
          rotate();
        } else {
          setBase(symbol, name);
        }
      } else {
        if (base === symbol) {
          rotate();
        } else {
          setQuote(symbol, name);
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
    <Flex direction='column' gap='4' p='4'>
      <TextField value={search} onChange={setSearch} placeholder='Search' clear>
        <TextFieldSlot>
          <Icon name='search' variant='tertiary' />
        </TextFieldSlot>
      </TextField>
      <Tabs.Root value={tab} onValueChange={(value) => setTab(value as Tab)}>
        <Tabs.List size='2'>
          <Flex asChild flexGrow='1' flexShrink='1' flexBasis='0'>
            <Tabs.Trigger value={Tab.all}>{Tab.all}</Tabs.Trigger>
          </Flex>
          <Flex asChild flexGrow='1' flexShrink='1' flexBasis='0'>
            <Tabs.Trigger value={Tab.own}>{Tab.own}</Tabs.Trigger>
          </Flex>
        </Tabs.List>
        <Tabs.Content value={Tab.all}>
          <AllTokens data={filteredTokenList} loading={isLoading} onSelect={onSelect} />
        </Tabs.Content>
        <Tabs.Content value={Tab.own}>
          <OwnTokens data={filteredTokenList} loading={isLoading} onSelect={onSelect} />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
};

export default UISwapTokenSelectScreen;
