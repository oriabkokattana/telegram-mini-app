import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Margin } from 'recharts/types/util/types';
import { formatDate } from '@/utils/date';

interface CustomChartProps {
  variant: 'pale' | 'outline';
  width?: string | number;
  height?: string | number;
  data?: { timestamp: number; value: number }[];
  margin?: Margin;
}

const CustomChart = ({ variant, width, height, data, margin }: CustomChartProps) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart width={390} height={164} data={data} margin={margin}>
        <defs>
          <linearGradient id='paleGradient' x1='0' y1='0' x2='0' y2='1'>
            <stop stopColor='#EAEAEA' />
            <stop offset='93%' stopColor='#D9D9D9' stopOpacity={0} />
          </linearGradient>
          <linearGradient id='outlineGradient' x1='0' y1='0' x2='0' y2='1'>
            <stop stopColor='#E6E6E6' stopOpacity={0.12} />
            <stop offset='100%' stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          labelStyle={{ fontFamily: '"Roobert PRO", Helvetica', color: 'rgba(0, 0, 0, 1)' }}
          itemStyle={{ fontFamily: '"Roobert PRO", Helvetica', color: 'rgba(169, 169, 169, 1)' }}
          formatter={(value) => `$${value}`}
          labelFormatter={(label) => formatDate(data?.[label]?.timestamp)}
        />
        <Area
          dataKey='value'
          type='monotone'
          stroke={variant === 'pale' ? '#EAEAEA' : '#A9A9A9'}
          strokeWidth={variant === 'pale' ? 2 : 1.15}
          fill={`url(#${variant}Gradient)`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomChart;
