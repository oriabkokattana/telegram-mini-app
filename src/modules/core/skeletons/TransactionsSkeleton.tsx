import { Flex, Skeleton } from '@radix-ui/themes';
import { generateUniqueArray } from '@/utils/placeholders';

const ITEMS = generateUniqueArray(4);

const TransactionsSkeleton = () => {
  return (
    <Flex direction='column' gap='2'>
      {ITEMS.map((item) => (
        <Flex
          key={item}
          height='56px'
          justify='between'
          align='center'
          gap='3'
          style={{ borderBottom: '1px solid rgba(154, 148, 170, 0.10)' }}
        >
          <Flex direction='column' gap='2'>
            <Skeleton width='90px' height='16px' />
            <Skeleton width='115px' height='12px' />
          </Flex>
          <Flex direction='column' gap='2' align='end'>
            <Skeleton width='120px' height='16px' />
            <Skeleton width='75px' height='16px' />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default TransactionsSkeleton;
