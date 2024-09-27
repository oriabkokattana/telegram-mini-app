import { useState } from 'react';
import * as Label from '@radix-ui/react-label';
import { Box, Button, DropdownMenu, Flex, IconButton, TextProps } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { useThemeParams } from '@telegram-apps/sdk-react';
import CustomChart from '@/modules/core/components/CustomChart';
import Link from '@/modules/core/components/Link';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { darkTheme } from '@/modules/core/design-system/ui.tokens.stylex';
import { useSystemCurrencyStore } from '@/store/system-currency';
import { formatNumberWithCommas, formatPercent } from '@/utils/numbers';

import { styles } from './TotalBalance.styles';

const getTotalBalanceFontSize = (balanceString: string): TextProps => {
  if (balanceString.length > 22) {
    return { size: '4' };
  }
  if (balanceString.length > 17) {
    return { size: '5' };
  }
  if (balanceString.length > 13) {
    return { size: '6' };
  }
  if (balanceString.length > 10) {
    return { size: '7' };
  }
  return { size: '8' };
};

enum Period {
  daily = 'daily',
  all = 'all time',
}

interface TotalBalanceProps {
  balance?: number;
  dailyDiff?: number;
  dailyUSD?: number;
  allTimeDiff?: number;
  allTimeUSD?: number;
  visible: boolean;
  setVisible(value: boolean): void;
}

const TotalBalance = ({
  balance = 0,
  dailyDiff = 0,
  dailyUSD = 0,
  allTimeDiff = 0,
  allTimeUSD = 0,
  visible,
  setVisible,
}: TotalBalanceProps) => {
  const [period, setPeriod] = useState(Period.daily);

  const { currency, currencyRate, currencies, setCurrency } = useSystemCurrencyStore();
  const themeParams = useThemeParams();

  const balanceString = `${currency === 'USD' ? '$ ' : ''}${formatNumberWithCommas(balance * currencyRate)}${currency === 'USD' ? '' : ` ${currency}`}`;
  const profitPositive = period === Period.daily ? dailyDiff >= 0 : allTimeDiff >= 0;
  const profitString = `${formatNumberWithCommas(period === Period.daily ? dailyUSD : allTimeUSD)} $ (${formatPercent((period === Period.daily ? dailyDiff : allTimeDiff) * 100)}%)`;

  return (
    <Box>
      <Flex direction='column' gap='2' justify='center'>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger {...stylex.props(styles.dropdownTrigger)}>
            <Flex align='center' gap='2'>
              <Text
                color='gray'
                size='1'
                weight='medium'
                lineHeight='normal'
                textTransform='uppercase'
              >
                Total Balance ({currency === 'USD' ? 'USD' : currency})
              </Text>
              <Icon name='chevron-down' variant='secondary' />
            </Flex>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            {...stylex.props(styles.dropdownContent, themeParams.isDark && darkTheme)}
            align='end'
            alignOffset={-50}
            sideOffset={8}
          >
            {currencies.map((item) => (
              <DropdownMenu.Item key={item} onClick={() => setCurrency(item)}>
                <Text
                  color='bronze'
                  size='2'
                  weight={currency === item ? 'bold' : 'regular'}
                  lineHeight='12px'
                >
                  {item}
                </Text>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <Flex justify='between' align='center'>
          <Flex direction='column' gap='2px'>
            <Flex align='center' gap='3'>
              <Text {...getTotalBalanceFontSize(balanceString)} weight='bold' lineHeight='34px'>
                {visible ? balanceString : balanceString.replace(/./g, '*')}
              </Text>
              <IconButton variant='ghost' onClick={() => setVisible(!visible)}>
                <Icon name={visible ? 'eye' : 'eye-closed'} variant='tertiary' />
              </IconButton>
            </Flex>
            <Flex align='center' gap='1'>
              <Icon
                name={profitPositive ? 'top-right-arrow' : 'bottom-right-arrow'}
                variant={profitPositive ? 'accent-violet' : 'accent-pink'}
                size={20}
              />
              <Text
                color={profitPositive ? 'violet' : 'crimson'}
                size='3'
                weight='bold'
                lineHeight='normal'
              >
                {visible ? profitString : profitString.replace(/./g, '*')}
              </Text>
            </Flex>
          </Flex>
          <Button
            size='3'
            color='gray'
            variant='soft'
            style={{ height: '32px' }}
            onClick={() => setPeriod(period === Period.daily ? Period.all : Period.daily)}
          >
            <Text color='gold' size='2' lineHeight='12px' textTransform='capitalize'>
              {period}
            </Text>
          </Button>
        </Flex>
        <CustomChart
          variant='violet'
          height={108}
          data={[
            { timestamp: Date.now() - 1500000, value: 121 },
            { timestamp: Date.now() - 1000000, value: 326 },
            { timestamp: Date.now() - 10000, value: 241 },
            { timestamp: Date.now(), value: 411 },
          ]}
        />
        <Flex my='-4' mb='4' px='9'>
          <Flex asChild flexGrow='1'>
            <Link to='/ui-deposit-token-select'>
              <Flex asChild flexGrow='1' direction='column' align='center' gap='2'>
                <Label.Root>
                  <IconButton size='4'>
                    <Icon name='arrow-down-half-circle' variant='white' />
                  </IconButton>
                  <Text size='2' weight='medium' lineHeight='12px'>
                    Deposit
                  </Text>
                </Label.Root>
              </Flex>
            </Link>
          </Flex>
          <Flex asChild flexGrow='1'>
            <Link to='/ui-withdraw-token-select'>
              <Flex asChild flexGrow='1' direction='column' align='center' gap='2'>
                <Label.Root>
                  <IconButton color='gray' variant='soft' size='4'>
                    <Icon name='arrow-up-half-circle' variant='tertiary' />
                  </IconButton>
                  <Text size='2' weight='medium' lineHeight='12px'>
                    Withdraw
                  </Text>
                </Label.Root>
              </Flex>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TotalBalance;
