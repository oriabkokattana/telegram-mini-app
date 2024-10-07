import { Flex, FlexProps, Skeleton } from '@radix-ui/themes';
import { generateUniqueArray } from '@/utils/placeholders';

const ITEMS = generateUniqueArray(4);

interface AssetsSkeletonProps {
  gap: FlexProps['gap'];
}

const AssetsSkeleton = ({ gap }: AssetsSkeletonProps) => {
  return (
    <Flex direction='column' gap={gap}>
      {ITEMS.map((item) => (
        <Flex key={item} gap='2'>
          <Skeleton width='36px' height='36px' style={{ borderRadius: '6px' }} />
          <Skeleton width='140px' height='36px' />
          <Skeleton height='36px' ml='2' style={{ flex: '1' }} />
        </Flex>
      ))}
    </Flex>
  );
};

export default AssetsSkeleton;
