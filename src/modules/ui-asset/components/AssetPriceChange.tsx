import { useState } from 'react';
import * as Label from '@radix-ui/react-label';
import { Box, Button, Flex, IconButton } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { ETimeframe } from '@/enums';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import CustomChart from '@/modules/core/components/CustomChart';
import Link from '@/modules/core/components/Link';
import TimeframeRange from '@/modules/core/components/TimeframeRange';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { useAssetPriceChange } from '@/services/user/asset-price-change/api';
import { trackCurrentTokenPriceChecked } from '@/utils/amplitude-events';
import { formatNumberWithSpaces, formatPercent } from '@/utils/numbers';
import { getPriceChangePercent } from '@/utils/price';

import { styles } from './AssetPriceChange.styles';

import { ChartEntity } from '@/types/chart';

interface AssetPriceChangeProps {
  asset?: string;
  priceUSD: number;
  onSwap(): void;
}

const AssetPriceChange = ({ asset, priceUSD, onSwap }: AssetPriceChangeProps) => {
  const [open, setOpen] = useState<boolean>();
  const [timeframe, setTimeframe] = useState(ETimeframe.m);

  const { data: assetPriceChangeData, isLoading } = useAssetPriceChange(timeframe, asset);
  const isBottomGap = useCheckBottomGap();

  const priceChangePercent = getPriceChangePercent(
    priceUSD,
    assetPriceChangeData
      ? Number(assetPriceChangeData[assetPriceChangeData.length - 1]?.value || 0)
      : priceUSD
  );
  const priceChangePositive = priceChangePercent >= 0;

  return (
    <>
      {open && <Box position='fixed' inset='0' onClick={() => setOpen(false)} />}
      <Box
        height={isBottomGap ? '444px' : '420px'}
        position='fixed'
        top='100%'
        right='0'
        left='0'
        {...stylex.props(
          styles.base,
          isBottomGap && styles.bottomGap,
          open === true && isBottomGap && styles.appearElongated,
          open === true && !isBottomGap && styles.apper,
          open === false && isBottomGap && styles.hideElongated,
          open === false && !isBottomGap && styles.hide
        )}
      >
        <Header
          asset={asset}
          priceUSD={priceUSD}
          priceChangePercent={priceChangePercent}
          chartData={assetPriceChangeData}
          loading={isLoading}
          open={open}
          setOpen={setOpen}
        />
        {open && (
          <Flex direction='column'>
            <Flex direction='column' gap='1'>
              <Text size='4' weight='bold' lineHeight='16px'>
                {formatNumberWithSpaces(priceUSD)} $
              </Text>
              <Flex height='16px' align='center' gap='1'>
                <Icon
                  name={priceChangePositive ? 'top-right-arrow' : 'bottom-right-arrow'}
                  variant={priceChangePositive ? 'accent-violet' : 'accent-pink'}
                  size={16}
                />
                <Text
                  color={priceChangePositive ? 'violet' : 'crimson'}
                  size='2'
                  weight='bold'
                  lineHeight='12px'
                >
                  {formatPercent(priceChangePercent)}%
                </Text>
              </Flex>
            </Flex>
            <CustomChart
              variant={priceChangePositive ? 'violet-to-pink' : 'pink-to-violet'}
              valueType='dollar'
              height={201}
              data={assetPriceChangeData}
              loading={isLoading}
            />
            <Box py='2'>
              <TimeframeRange
                variant='transparent'
                timeframe={timeframe}
                setTimeframe={setTimeframe}
              />
            </Box>
            <Button asChild size='4' onClick={onSwap}>
              <Link to='/swap'>
                <Text color='sky'>Trade</Text>
              </Link>
            </Button>
          </Flex>
        )}
      </Box>
    </>
  );
};

type HeaderProps = {
  asset?: string;
  priceUSD: number;
  priceChangePercent: number;
  chartData?: ChartEntity[];
  loading: boolean;
  open?: boolean;
  setOpen(open?: boolean): void;
};

const Header = ({
  asset,
  priceUSD,
  priceChangePercent,
  chartData,
  loading,
  open,
  setOpen,
}: HeaderProps) => {
  const priceChangePositive = priceChangePercent >= 0;

  const onOpen = () => {
    if (open === false) {
      trackCurrentTokenPriceChecked();
    }
    setOpen(!open);
  };

  return (
    <Flex
      asChild
      height='68px'
      justify='between'
      align='center'
      pl={open ? '5' : '0'}
      style={{ cursor: 'pointer' }}
    >
      <Label.Root>
        {open ? (
          <Text size='3' weight='bold' mx='auto'>
            Current Price {asset}
          </Text>
        ) : (
          <Flex align='center' gap='2'>
            <Flex direction='column' gap='2'>
              <Text color='gray' size='2' weight='medium' lineHeight='12px'>
                Current Price {asset}
              </Text>
              <Flex align='center' gap='2'>
                <Text size='2' weight='bold' lineHeight='12px'>
                  {formatNumberWithSpaces(priceUSD)} $
                </Text>
                <Flex height='16px' align='center' gap='1'>
                  <Icon
                    name={priceChangePositive ? 'top-right-arrow' : 'bottom-right-arrow'}
                    variant={priceChangePositive ? 'accent-violet' : 'accent-pink'}
                    size={16}
                  />
                  <Text
                    color={priceChangePositive ? 'violet' : 'crimson'}
                    size='2'
                    weight='bold'
                    lineHeight='12px'
                  >
                    {formatPercent(priceChangePercent)}%
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Box width='114px'>
              <CustomChart
                variant={priceChangePositive ? 'plum' : 'crimson'}
                type='line'
                height={24}
                data={chartData}
                loading={loading}
              />
            </Box>
          </Flex>
        )}
        <IconButton size='1' variant='ghost' onClick={onOpen}>
          <Icon
            name='chevron-up'
            variant='secondary'
            size={24}
            style={{ ...styles.chevronIcon, ...(open && styles.rotate) }}
          />
        </IconButton>
      </Label.Root>
    </Flex>
  );
};

export default AssetPriceChange;
