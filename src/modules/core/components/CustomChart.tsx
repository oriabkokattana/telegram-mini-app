import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts';
import { Margin } from 'recharts/types/util/types';
import { Flex } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { useThemeStore } from '@/store/theme-store';
import { formatDateWithTimeShort } from '@/utils/date';
import { formatPercent } from '@/utils/numbers';
import { Text } from '../design-system/text';
import darkThemePlaceholder from '../media/dark-theme-chart-placeholder.svg';
import lightThemePlaceholder from '../media/light-theme-chart-placeholder.svg';

import { styles } from './CustomChart.styles';

import { ChartEntity } from '@/types/chart';

export type ChartType = 'area' | 'line';
export type ChartValueType = 'percent' | 'dollar';
export type ChartVariant = 'plum' | 'crimson' | 'pink-to-violet' | 'violet-to-pink';
export type ChartData = { name: number; value: number; exactValue: number };

const addVariation = (item: ChartEntity): ChartData => {
  const exactValue = parseFloat(item.value) || 0;
  const variation = exactValue * 0.001; // 0.1% variation
  const adjustedValue = exactValue + (Math.random() * variation * 2 - variation);

  return {
    name: item.timestamp,
    value: adjustedValue, // 5% more or less than initial value
    exactValue, // initial value without variation
  };
};

const parseChartData = (data?: ChartEntity[]): ChartData[] => {
  if (!data?.length || data.length === 1) {
    return [];
  }

  const allSame = data.every((item) => item.value === data[0].value);

  if (allSame) {
    return data.map((item) => addVariation(item));
  }

  return data.map((item) => ({
    name: item.timestamp,
    value: parseFloat(item.value) || 0,
    exactValue: parseFloat(item.value) || 0,
  }));
};

const getChartStrokeColor = (variant: ChartVariant) => {
  switch (variant) {
    case 'plum':
      return '#AE9AFF';
    case 'crimson':
      return '#FF65B3';
    case 'pink-to-violet':
      return 'url(#pinkToVioletGradient)';
    case 'violet-to-pink':
      return 'url(#violetToPinkGradient)';
    default:
      return '#FAFAFA';
  }
};

const getChartFillColor = (variant: ChartVariant) => {
  switch (variant) {
    case 'pink-to-violet':
    case 'violet-to-pink':
      return 'url(#violetGradient)';
    default:
      return '#FAFAFA';
  }
};

interface CustomChartProps {
  variant: ChartVariant;
  type?: ChartType;
  valueType?: ChartValueType;
  height: number;
  data?: ChartEntity[];
  loading: boolean;
  margin?: Margin;
}

const CustomChart = ({
  variant,
  type = 'area',
  valueType = 'percent',
  height,
  data,
  loading,
  margin,
}: CustomChartProps) => {
  const theme = useThemeStore((state) => state.theme);

  if ((!data?.length || data.length === 1) && !loading) {
    return (
      <img
        src={theme === 'dark' ? darkThemePlaceholder : lightThemePlaceholder}
        height={height}
        width='100%'
        style={{ objectFit: 'cover' }}
      />
    );
  }

  const chartData = parseChartData(data);

  if (type === 'line') {
    return (
      <ResponsiveContainer width='100%' height={height}>
        <LineChart data={chartData} margin={margin}>
          <Line
            type='monotone'
            dataKey='value'
            stroke={getChartStrokeColor(variant)}
            strokeWidth={1.15108}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width='100%' height={height}>
      <AreaChart data={chartData} margin={margin}>
        <defs>
          <linearGradient id='violetGradient' x1='0' y1='0' x2='0' y2='1'>
            <stop stopColor='#5841D8' stopOpacity={0.2} />
            <stop offset='100%' stopColor='#5841D8' stopOpacity={0} />
          </linearGradient>
          <linearGradient id='pinkToVioletGradient' x1='0' y1='0' x2='1' y2='0'>
            <stop stopColor='#FF65B3' />
            <stop offset='50%' stopColor='#AE9AFF' />
            <stop offset='100%' stopColor='#AE9AFF' />
          </linearGradient>
          <linearGradient id='violetToPinkGradient' x1='0' y1='0' x2='1' y2='0'>
            <stop stopColor='#AE9AFF' />
            <stop offset='50%' stopColor='#FF65B3' />
            <stop offset='100%' stopColor='#FF65B3' />
          </linearGradient>
        </defs>
        <Tooltip content={<CustomTooltip valueType={valueType} />} />
        <Area
          dataKey='value'
          type='linear'
          stroke={getChartStrokeColor(variant)}
          strokeWidth={2}
          fill={getChartFillColor(variant)}
          baseValue='dataMin'
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

type CustomTooltipProps = { valueType: ChartValueType } & TooltipProps<number, number>;

const CustomTooltip = ({ valueType, payload }: CustomTooltipProps) => {
  const value = payload?.[0]?.payload?.exactValue;
  const timestamp = payload?.[0]?.payload?.name;

  return (
    <Flex direction='column' gap='2' py='2' px='4' {...stylex.props(styles.tooltip)}>
      <Text size='1' weight='bold' lineHeight='10px'>
        {formatDateWithTimeShort(timestamp)}
      </Text>
      {valueType === 'percent' ? (
        <Text color={value >= 0 ? 'violet' : 'crimson'} size='1' weight='medium' lineHeight='10px'>
          {formatPercent(value * 100)}%
        </Text>
      ) : (
        <Text color='gray' size='1' weight='medium' lineHeight='10px'>
          {formatPercent(value * 100)} $
        </Text>
      )}
    </Flex>
  );
};

export default CustomChart;
