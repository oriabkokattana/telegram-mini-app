import { Flex } from '@radix-ui/themes';
import { Icon } from '../design-system/icon';
import { Text } from '../design-system/text';

interface NoDataPlaceholderProps {
  variant: 'sad-smile' | 'list';
  title: string;
  description: string;
}

const NoDataPlaceholder = ({ variant, title, description }: NoDataPlaceholderProps) => {
  return (
    <Flex direction='column' align='center' gap={variant === 'list' ? '4' : '5'} py='4' px='6'>
      <Icon name={variant} variant='secondary' />
      <Flex direction='column' align='center' gap='2'>
        <Text size='4' weight='bold' align='center' lineHeight='16px'>
          {title}
        </Text>
        <Text color='gray' size='1' align='center' lineHeight='15px'>
          {description}
        </Text>
      </Flex>
    </Flex>
  );
};

export default NoDataPlaceholder;
