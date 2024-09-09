import { useState } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as stylex from '@stylexjs/stylex';
import chart from '@/assets/chart.svg';

import { styles } from './ChartWithTimeframes.styles';

enum ChartTimeframe {
  hour = '1H',
  day = '24H',
  week = '1W',
  month = '1M',
  threeMonths = '3M',
  year = '1Y',
}

const TIMEFRAMES = [
  ChartTimeframe.hour,
  ChartTimeframe.day,
  ChartTimeframe.week,
  ChartTimeframe.month,
  ChartTimeframe.threeMonths,
  ChartTimeframe.year,
];

interface ChartWithTimeframesProps {
  chartImage?: string;
}

const ChartWithTimeframes = ({ chartImage }: ChartWithTimeframesProps) => {
  const [timeframe, setTimeframe] = useState(ChartTimeframe.hour);

  const onChangeTimframe = (value?: string) => {
    if (value) {
      setTimeframe(value as ChartTimeframe);
    }
  };
  return (
    <div {...stylex.props(styles.base)}>
      <img {...stylex.props(styles.chart)} src={chartImage || chart} alt='chart' />
      <ToggleGroup.Root
        {...stylex.props(styles.timeframeGroup, chartImage ? styles.static : undefined)}
        type='single'
        aria-label='Select timeframe'
        value={timeframe}
        onValueChange={onChangeTimframe}
      >
        {TIMEFRAMES.map((item) => (
          <ToggleGroup.Item {...stylex.props(styles.timeframe)} value={item}>
            {item}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
};

export default ChartWithTimeframes;
