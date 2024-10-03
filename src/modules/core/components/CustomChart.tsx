import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  // Tooltip
} from 'recharts';
import { Margin } from 'recharts/types/util/types';
import { useThemeStore } from '@/store/theme-store';
import darkThemePlaceholder from '../media/dark-theme-chart-placeholder.svg';
import lightThemePlaceholder from '../media/light-theme-chart-placeholder.svg';

import { ChartEntity } from '@/types/chart';
// import { formatDate } from '@/utils/date';

export type ChartVariant = 'pale' | 'outline' | 'violet';
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
    case 'pale':
      return '#EAEAEA';
    case 'outline':
      return '#A9A9A9';
    case 'violet':
      return 'url(#pinkToVioletGradient)';
    default:
      return '#EAEAEA';
  }
};

interface CustomChartProps {
  variant?: ChartVariant;
  type?: 'area' | 'line';
  height: number;
  data?: ChartEntity[];
  loading: boolean;
  margin?: Margin;
}

const CustomChart = ({
  variant = 'violet',
  type = 'area',
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
    <ResponsiveContainer width='100%' height={height}>
      <LineChart data={chartData} margin={margin}>
        <Line type='monotone' dataKey='value' stroke='var(--plum-a11)' />
      </LineChart>
    </ResponsiveContainer>;
  }

  return (
    <ResponsiveContainer width='100%' height={height}>
      <AreaChart data={chartData} margin={margin}>
        <defs>
          <linearGradient id='paleGradient' x1='0' y1='0' x2='0' y2='1'>
            <stop stopColor='#EAEAEA' />
            <stop offset='93%' stopColor='#D9D9D9' stopOpacity={0} />
          </linearGradient>
          <linearGradient id='outlineGradient' x1='0' y1='0' x2='0' y2='1'>
            <stop stopColor='#E6E6E6' stopOpacity={0.12} />
            <stop offset='100%' stopOpacity={0} />
          </linearGradient>
          <linearGradient id='pinkToVioletGradient' x1='0' y1='0' x2='1' y2='0'>
            <stop stopColor='#FF65B3' />
            <stop offset='50%' stopColor='#AE9AFF' />
            <stop offset='100%' stopColor='#AE9AFF' />
          </linearGradient>
          <linearGradient id='violetGradient' x1='0' y1='0' x2='0' y2='1'>
            <stop stopColor='#5841D8' stopOpacity={0.2} />
            <stop offset='93%' stopColor='#5841D8' stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* <Tooltip
          labelStyle={{ fontFamily: '"Roobert PRO", Helvetica', color: 'rgba(0, 0, 0, 1)' }}
          itemStyle={{ fontFamily: '"Roobert PRO", Helvetica', color: 'rgba(169, 169, 169, 1)' }}
          formatter={(value) => `$${value}`}
          labelFormatter={(label) => formatDate(data?.[label]?.timestamp)}
        /> */}
        <Area
          dataKey='value'
          type='linear'
          stroke={getChartStrokeColor(variant)}
          strokeWidth={variant === 'outline' ? 1.15 : 2}
          fill={`url(#${variant}Gradient)`}
          baseValue='dataMin'
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomChart;
