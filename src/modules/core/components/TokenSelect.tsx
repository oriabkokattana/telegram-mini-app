import { Flex, RadioCards, Text } from '@radix-ui/themes';
import { useBalances } from '@/services/user/balances/api';

interface TokenSelectProps {
  defaultValue: string | null;
  showBalance?: boolean;
  onSelect(token: string): void;
}

const TokenSelect = ({ defaultValue, showBalance, onSelect }: TokenSelectProps) => {
  const { data, error, isError, isLoading } = useBalances();

  if (isLoading) {
    return (
      <Flex width='100%' height='100%' justify='center' align='center'>
        <Text>Loading...</Text>
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex width='100%' height='100%' justify='center' align='center'>
        <Text color='tomato'>{error.response?.data.error}</Text>
      </Flex>
    );
  }

  const tokens = Object.keys(data || {});

  return (
    <RadioCards.Root defaultValue={defaultValue || undefined} columns='1' gap='3'>
      {tokens?.map((token) => (
        <RadioCards.Item key={token} value={token} onClick={() => onSelect(token)}>
          <Flex justify='between' align='center' width='100%'>
            <Flex direction='column'>
              <Text weight='bold' style={{ textTransform: 'capitalize' }}>
                {token.toLowerCase()}
              </Text>
              <Text>{token.toUpperCase()}</Text>
            </Flex>
            {showBalance && (
              <Flex direction='column' align='end'>
                <Text>Balance: {data?.[token].total_balance.balance}</Text>
                <Text>Reserved: {data?.[token].total_balance.reserved_balance}</Text>
              </Flex>
            )}
          </Flex>
        </RadioCards.Item>
      ))}
    </RadioCards.Root>
  );
};

export default TokenSelect;
