import { useEffect, useState } from 'react';
import * as Label from '@radix-ui/react-label';
import { Box, Button, Flex, IconButton, TextProps } from '@radix-ui/themes';
import { EPeriod } from '@/enums';
import CustomChart from '@/modules/core/components/CustomChart';
import Link from '@/modules/core/components/Link';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@/modules/core/design-system/ui-dropdown';
import { useBalancesStore } from '@/store/balances-store';
import { useSystemCurrencyStore } from '@/store/system-currency';
import { useTimeframeStore } from '@/store/timeframe-store';
import { formatNumberWithCommas, formatPercent } from '@/utils/numbers';

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

interface TotalBalanceProps {
  visible: boolean;
  setVisible(value: boolean): void;
}

const TotalBalance = ({ visible, setVisible }: TotalBalanceProps) => {
  const [period, setPeriod] = useState(EPeriod.day);

  const { currency, currencyRate, currencies, setCurrency } = useSystemCurrencyStore();
  const { total_balance_usd, pnl_usd, pnl_percent } = useBalancesStore();
  const setBalanceTimeframeViaPeriod = useTimeframeStore(
    (state) => state.setBalanceTimeframeViaPeriod
  );

  useEffect(() => {
    setBalanceTimeframeViaPeriod(period);
  }, [period]);

  const balanceString = `${currency === 'USD' ? '$ ' : ''}${formatNumberWithCommas(Number(total_balance_usd) * currencyRate)}${currency === 'USD' ? '' : ` ${currency}`}`;
  const profitPositive = Number(pnl_percent) >= 0;
  const profitString = `${formatNumberWithCommas(Number(pnl_usd))} $ (${formatPercent(Number(pnl_percent) * 100)}%)`;

  return (
    <Box>
      <Flex direction='column' gap='2' justify='center'>
        <Dropdown>
          <DropdownTrigger>
            <Flex align='center' gap='2'>
              <Text color='gray' size='1' weight='medium' textTransform='uppercase'>
                Total Balance ({currency === 'USD' ? 'USD' : currency})
              </Text>
              <Icon name='chevron-down' variant='secondary' />
            </Flex>
          </DropdownTrigger>
          <DropdownContent width='124px' align='end' alignOffset={-50} sideOffset={8}>
            {currencies.map((item) => (
              <DropdownItem key={item} onClick={() => setCurrency(item)}>
                <Text
                  color='bronze'
                  size='2'
                  weight={currency === item ? 'bold' : 'regular'}
                  lineHeight='12px'
                >
                  {item}
                </Text>
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
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
              <Text color={profitPositive ? 'violet' : 'crimson'} size='3' weight='bold'>
                {visible ? profitString : profitString.replace(/./g, '*')}
              </Text>
            </Flex>
          </Flex>
          <Button
            size='3'
            color='gray'
            variant='soft'
            style={{ height: '32px' }}
            onClick={() => setPeriod(period === EPeriod.day ? EPeriod.all : EPeriod.day)}
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
