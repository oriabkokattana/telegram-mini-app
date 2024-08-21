import { Flex, RadioCards, Text } from '@radix-ui/themes';
import { useBalances } from '@/services/user/balances/api';

const CHAINS = ['Ethereum', 'BSC', 'Polygon'];

interface ChainSelectProps {
  token: string | null;
  onSelect(chain: string): void;
}

const ChainSelect = ({ token, onSelect }: ChainSelectProps) => {
  const { data, isSuccess } = useBalances(!!token);

  return (
    <RadioCards.Root defaultValue={CHAINS[0]} columns='1' gap='3'>
      {CHAINS.map((chain) => {
        const balance = token ? data?.[token].network_balances[chain] : undefined;
        return (
          <RadioCards.Item key={chain} value={chain} onClick={() => onSelect(chain)}>
            <Flex justify='between' align='center' width='100%'>
              <Text weight='bold' style={{ textTransform: 'capitalize' }}>
                {chain}
              </Text>
              {isSuccess && (
                <Flex direction='column' align='end'>
                  <Text>Balance: {balance?.balance || 0}</Text>
                  <Text>Reserved: {balance?.reserved_balance || 0}</Text>
                </Flex>
              )}
            </Flex>
          </RadioCards.Item>
        );
      })}
    </RadioCards.Root>
  );
};

export default ChainSelect;
