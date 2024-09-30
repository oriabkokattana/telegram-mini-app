import { toast } from 'sonner';
import { Box, Button, Card, Flex, IconButton } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import Link from '@/modules/core/components/Link';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import { useWithdrawStore } from '@/store/withdraw-store';
import { formatAddressShort } from '@/utils/address';
import { formatNumber, formatNumberWithCommas } from '@/utils/numbers';
import ProgressClockIcon from '../media/progress-clock.svg?react';

import { styles } from './WithdrawInProgress.styles';

import { ShortDuration } from '@/types';

interface WithdrawInProgressProps {
  token?: string;
  network?: string;
  amount: number;
  amountUSD: number;
  fee: number;
  duration: ShortDuration;
  address?: string;
  isBottomGap: boolean;
}

const WithdrawInProgress = ({
  token,
  network,
  amount,
  amountUSD,
  fee,
  duration,
  address,
  isBottomGap,
}: WithdrawInProgressProps) => {
  const reset = useWithdrawStore((state) => state.reset);

  const onCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      toast.success('Copied to clipboard!');
    } else {
      toast.error('Custody wallet address not defined');
    }
  };

  return (
    <Flex height='100vh' direction='column' px='4' pb={isBottomGap ? '6' : '4'}>
      <Flex flexGrow='1' direction='column' justify='center' align='center' gap='8'>
        <Flex direction='column' align='center' gap='4'>
          <Flex
            width='64px'
            height='64px'
            justify='center'
            align='center'
            {...stylex.props(styles.violetWrapper)}
          >
            <ProgressClockIcon />
          </Flex>
          <Text size='5' weight='bold' lineHeight='18px'>
            Withdrawal In Progress
          </Text>
          <Flex align='center' gap='1'>
            <TokenIcon name={token} size='ui-xs' />
            <Text size='2' weight='bold' lineHeight='12px'>
              {formatNumber(amount)}{' '}
              <Text color='gray' size='2' weight='bold' lineHeight='12px'>
                {token} {amountUSD ? ` (~$${formatNumberWithCommas(amountUSD)})` : ''}
              </Text>
            </Text>
          </Flex>
        </Flex>
        <Box width='100%'>
          <Card variant='ghost'>
            <Flex direction='column' gap='3'>
              <Flex height='20px' justify='between' align='center'>
                <Text size='2' weight='medium' lineHeight='12px'>
                  Network
                </Text>
                <Flex py='1' px='2' {...stylex.props(styles.violetWrapper)}>
                  <Text color='violet' size='2' weight='bold' lineHeight='12px'>
                    {network}
                  </Text>
                </Flex>
              </Flex>
              <Flex height='20px' justify='between' align='center'>
                <Text size='2' weight='medium' lineHeight='12px'>
                  To
                </Text>
                <Flex align='center' gap='2'>
                  <Text size='2' weight='bold' lineHeight='12px'>
                    {formatAddressShort(address)}
                  </Text>
                  <IconButton size='1' variant='ghost' onClick={onCopyAddress}>
                    <Icon name='copy' variant='secondary' />
                  </IconButton>
                </Flex>
              </Flex>
              <Flex height='20px' justify='between' align='center'>
                <Text size='2' weight='medium' lineHeight='12px'>
                  Fee
                </Text>
                <Text size='2' weight='bold' lineHeight='12px'>
                  {fee}{' '}
                  <Text color='gray' size='2' weight='bold' lineHeight='12px'>
                    {token}
                  </Text>
                </Text>
              </Flex>
              <Flex height='20px' justify='between' align='center'>
                <Text size='2' weight='medium' lineHeight='12px'>
                  Processing Time
                </Text>
                <Text size='2' weight='bold' lineHeight='12px'>
                  {duration.number}{' '}
                  <Text color='gray' size='2' weight='bold' lineHeight='12px'>
                    {duration.of}
                  </Text>
                </Text>
              </Flex>
              <Flex height='20px' justify='between' align='center'>
                <Text size='2' weight='medium' lineHeight='12px'>
                  Total
                </Text>
                <Text size='2' weight='bold' lineHeight='12px'>
                  {formatNumber(amount)}{' '}
                  <Text color='gray' size='2' weight='bold' lineHeight='12px'>
                    {token} (~${formatNumberWithCommas(amountUSD)})
                  </Text>
                </Text>
              </Flex>
            </Flex>
          </Card>
        </Box>
      </Flex>
      <Box asChild mt='8'>
        <Button asChild color='gray' variant='soft' size='4' mt='auto' onClick={reset}>
          <Link to='/ui-main'>
            <Text color='brown' size='3' weight='bold'>
              Done
            </Text>
          </Link>
        </Button>
      </Box>
    </Flex>
  );
};

export default WithdrawInProgress;
