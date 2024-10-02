import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Tabs } from '@radix-ui/themes';
import { Icon } from '@/modules/core/design-system/icon';
import { TextField, TextFieldSlot } from '@/modules/core/design-system/text-field';
import { useTradingStore } from '@/store/trading-store';
import AllTokens from './AllTokens';
import OwnTokens from './OwnTokens';

import { TokenType } from '@/types';

enum Tab {
  all = 'All Tokens',
  own = 'Your Tokens',
}

const UISwapTokenSelectScreen = () => {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState(Tab.all);

  const params = useParams();
  const { base, setBase, quote, setQuote, rotate } = useTradingStore();

  const onSelect = (token: string) => {
    if (params.type) {
      const type = params.type as TokenType;
      if (type === 'base') {
        if (quote === token) {
          rotate();
        } else {
          setBase(token);
        }
      } else {
        if (base === token) {
          rotate();
        } else {
          setQuote(token);
        }
      }
    }
  };

  return (
    <Flex direction='column' gap='4' p='4'>
      <TextField value={search} onChange={setSearch} placeholder='Search' clear>
        <TextFieldSlot>
          <Icon name='search' variant='tertiary' />
        </TextFieldSlot>
      </TextField>
      <Tabs.Root value={tab} onValueChange={(value) => setTab(value as Tab)}>
        <Tabs.List size='2'>
          <Flex asChild flexGrow='1'>
            <Tabs.Trigger value={Tab.all}>{Tab.all}</Tabs.Trigger>
          </Flex>
          <Flex asChild flexGrow='1'>
            <Tabs.Trigger value={Tab.own}>{Tab.own}</Tabs.Trigger>
          </Flex>
        </Tabs.List>
        <Tabs.Content value={Tab.all}>
          <AllTokens onSelect={onSelect} />
        </Tabs.Content>
        <Tabs.Content value={Tab.own}>
          <OwnTokens onSelect={onSelect} />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
};

export default UISwapTokenSelectScreen;
