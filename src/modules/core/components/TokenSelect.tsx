import { Flex, RadioCards, Text } from '@radix-ui/themes';
import { useBalances } from '@/services/user/balances/api';

interface TokenSelectProps {
  showBalance?: boolean;
}

const TokenSelect = ({ showBalance }: TokenSelectProps) => {
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
        <Text color='tomato'>{error.response?.data}</Text>
      </Flex>
    );
  }

  return (
    <RadioCards.Root defaultValue={data?.[0].token} columns={{ initial: '1', sm: '3' }} gap='3'>
      {data?.map((item) => (
        <RadioCards.Item key={item.token} value={item.token}>
          <Flex justify='between' align='center' width='100%'>
            <Flex direction='column' width='100%'>
              <Text weight='bold' style={{ textTransform: 'capitalize' }}>
                {item.token.toLowerCase()}
              </Text>
              <Text>{item.token.toUpperCase()}</Text>
            </Flex>
            {showBalance && <Text>{item.balance}</Text>}
          </Flex>
        </RadioCards.Item>
      ))}
    </RadioCards.Root>
  );
};

export default TokenSelect;
