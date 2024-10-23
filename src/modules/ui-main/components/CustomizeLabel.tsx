import * as Label from '@radix-ui/react-label';
import { Checkbox, Flex } from '@radix-ui/themes';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import {
  MAIN_SCREEN_LABELS,
  MAIN_SCREEN_LABELS_MAP,
  useMainScreenLabelsStore,
} from '@/store/main-screen-labels-store';

export const CustomizeLabel = () => {
  const { selectedLabels, availableLabels, toggleLabel } = useMainScreenLabelsStore();
  const isBottomGap = useCheckBottomGap();

  return (
    <Flex minHeight='100vh' direction='column' gap='5' px='4' pt='4' pb={isBottomGap ? '6' : '4'}>
      <Text size='4' weight='bold' align='center' lineHeight='24px'>
        Customize label
      </Text>
      <Flex direction='column' gap='4'>
        {MAIN_SCREEN_LABELS.map((item) => (
          <Flex
            key={item}
            asChild
            align='center'
            gap='4'
            style={{ cursor: availableLabels.includes(item) ? 'pointer' : 'not-allowed' }}
          >
            <Label.Root>
              <Checkbox
                disabled={!availableLabels.includes(item)}
                checked={selectedLabels.includes(item)}
                onCheckedChange={() => toggleLabel(item)}
              />
              <Flex align='center' gap='2'>
                <Flex
                  width='48px'
                  height='48px'
                  justify='center'
                  align='center'
                  style={{ borderRadius: 'var(--radius-full)', backgroundColor: 'var(--gray-a3)' }}
                >
                  <Icon name={MAIN_SCREEN_LABELS_MAP[item].icon} size={24} variant='tertiary' />
                </Flex>
                <Text size='2' weight='medium' lineHeight='20px'>
                  {item}
                </Text>
              </Flex>
            </Label.Root>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default CustomizeLabel;
