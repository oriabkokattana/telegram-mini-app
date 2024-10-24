import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Flex } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { ETimeframe } from '@/enums';
import { Text } from '../design-system/text';

import { styles } from './TimeframeRange.styles';

const TIMEFRAME_RANGE = [ETimeframe.d, ETimeframe.w, ETimeframe.m, ETimeframe.tm, ETimeframe.y];

interface TimeframeRangeProps {
  variant?: 'default' | 'transparent';
  timeframe: ETimeframe;
  setTimeframe(timeframe: ETimeframe): void;
}

const TimeframeRange = ({ variant = 'default', timeframe, setTimeframe }: TimeframeRangeProps) => {
  const onChangeTimframe = (value?: string) => {
    if (value) {
      setTimeframe(value as ETimeframe);
    }
  };

  return (
    <Flex asChild width='100%' height='32px' align='center'>
      <ToggleGroup.Root
        type='single'
        aria-label='Timeframe range'
        value={timeframe}
        onValueChange={onChangeTimframe}
      >
        {TIMEFRAME_RANGE.map((item) => (
          <Flex
            key={item}
            asChild
            height='24px'
            flexGrow='1'
            flexShrink='1'
            flexBasis='0'
            align='center'
            justify='center'
          >
            <ToggleGroup.Item {...stylex.props(styles.timeframeItem, styles[variant])} value={item}>
              <Text
                size='1'
                weight={item === timeframe ? 'medium' : 'regular'}
                lineHeight='10px'
                textTransform='uppercase'
                style={styles.timeframe}
              >
                {item}
              </Text>
            </ToggleGroup.Item>
          </Flex>
        ))}
      </ToggleGroup.Root>
    </Flex>
  );
};

export default TimeframeRange;
