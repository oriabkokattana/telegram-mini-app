import { Flex } from '@radix-ui/themes';
import { Text } from '@/modules/core/design-system/text';
import Assets from './Assets';

interface TablesProps {
  visible: boolean;
}

const Tables = ({ visible }: TablesProps) => {
  return (
    <Flex direction='column' gap='5'>
      <Flex height='32px' align='center'>
        <Text size='3' weight='bold' lineHeight='normal'>
          My Assets
        </Text>
      </Flex>
      <Assets visible={visible} />
    </Flex>
  );
};

export default Tables;
