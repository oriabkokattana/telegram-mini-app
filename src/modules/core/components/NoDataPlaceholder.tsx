import { Flex } from '@radix-ui/themes';
import { Text } from '../design-system/text';

interface NoDataPlaceholderProps {
  text: string;
}

const NoDataPlaceholder = ({ text }: NoDataPlaceholderProps) => {
  return (
    <Flex height='150px' justify='center' align='center'>
      <Text color='gray' size='4' weight='medium' align='center'>
        {text}
      </Text>
    </Flex>
  );
};

export default NoDataPlaceholder;
