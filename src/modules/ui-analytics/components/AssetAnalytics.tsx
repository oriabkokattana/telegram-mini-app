import { Flex } from '@radix-ui/themes';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import NoDataPlaceholder from '@/modules/core/components/NoDataPlaceholder';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import Assets from '@/modules/ui-main/components/Assets';
import { useBalancesStore } from '@/store/balances-store';
import AssetTreemap from './AssetTreemap';

const AssetAnalytics = () => {
  const balances = useBalancesStore((state) => state.balances);
  const isBottomGap = useCheckBottomGap();

  if (!Object.keys(balances).length) {
    return (
      <Flex direction='column' gap='4' pt='4'>
        <NoDataPlaceholder
          variant='list'
          title="You don't have assets yet"
          description='You can make a deposit to show your tokens here'
        />
      </Flex>
    );
  }

  return (
    <Flex direction='column' gap='4' pt='4' pb={isBottomGap ? '6' : '4'}>
      <AssetTreemap />
      <Flex direction='column' gap='5'>
        <Flex height='32px' justify='between' align='center'>
          <Text size='3' weight='bold'>
            All Assets
          </Text>
          <Icon name='search' size={24} />
        </Flex>
        <Assets />
      </Flex>
    </Flex>
  );
};

export default AssetAnalytics;
