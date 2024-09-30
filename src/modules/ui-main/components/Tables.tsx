import { Box, Flex } from '@radix-ui/themes';
import NoDataPlaceholder from '@/modules/core/components/NoDataPlaceholder';
import { Text } from '@/modules/core/design-system/text';
import { useBalancesStore } from '@/store/balances-store';
import Assets from './Assets';

interface TablesProps {
  visible: boolean;
}

const Tables = ({ visible }: TablesProps) => {
  const balances = useBalancesStore((state) => state.balances);

  if (!Object.keys(balances).length) {
    return (
      <Box pt='5'>
        <NoDataPlaceholder
          variant='list'
          title="You don't have assets yet"
          description='You can make a deposit to show your tokens here'
        />
      </Box>
    );
  }

  return (
    <Flex direction='column' gap='5'>
      <Flex height='32px' align='center'>
        <Text size='3' weight='bold'>
          My Assets
        </Text>
      </Flex>
      <Assets visible={visible} />
    </Flex>
  );
};

export default Tables;
