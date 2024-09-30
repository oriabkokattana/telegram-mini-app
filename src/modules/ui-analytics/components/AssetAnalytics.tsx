import { Flex } from '@radix-ui/themes';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import Assets from '@/modules/ui-main/components/Assets';
import AssetTreemap from './AssetTreemap';

const AssetAnalytics = () => {
  return (
    <Flex direction='column' gap='4' pt='4'>
      <AssetTreemap />
      <Flex direction='column' gap='5'>
        <Flex height='32px' justify='between' align='center'>
          <Text size='3' weight='bold'>
            All Assets
          </Text>
          <Icon name='search' size={24} />
        </Flex>
        <Assets visible />
      </Flex>
    </Flex>
  );
};

export default AssetAnalytics;
