import { Flex, RadioCards, Text } from '@radix-ui/themes';

const CHAINS = ['Ethereum', 'BSC', 'Polygon'];

const ChainSelect = () => {
  return (
    <RadioCards.Root defaultValue={CHAINS[0]} columns={{ initial: '1', sm: '3' }} gap='3'>
      {CHAINS.map((chain) => (
        <RadioCards.Item key={chain} value={chain}>
          <Flex direction='column' width='100%'>
            <Text weight='bold' style={{ textTransform: 'capitalize' }}>
              {chain}
            </Text>
          </Flex>
        </RadioCards.Item>
      ))}
    </RadioCards.Root>
  );
};

export default ChainSelect;
