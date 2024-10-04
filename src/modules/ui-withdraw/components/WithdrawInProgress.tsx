import { useState } from 'react';
import { toast } from 'sonner';
import { Box, Button, Card, Flex, IconButton } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import Link from '@/modules/core/components/Link';
import { Dialog, DialogTitle } from '@/modules/core/design-system/dialog';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import { useTransactionStatus } from '@/services/user/transaction-status/api';
import { useWithdrawStore } from '@/store/withdraw-store';
import { NETWORK_TX_SCAN_MAP } from '@/utils/networks';
import { formatNumber, formatNumberWithCommas } from '@/utils/numbers';
import { openExternalLink } from '@/utils/open-link';

import { styles } from './WithdrawInProgress.styles';

import { ShortDuration } from '@/types';

interface WithdrawInProgressProps {
  id?: string;
  token?: string;
  networkName?: string;
  networkDescription?: string;
  amount: number;
  amountUSD: number;
  fee: number;
  duration: ShortDuration;
  address?: string;
  isBottomGap: boolean;
}

const WithdrawInProgress = ({
  id,
  token,
  networkName,
  networkDescription,
  amount,
  amountUSD,
  fee,
  duration,
  address,
  isBottomGap,
}: WithdrawInProgressProps) => {
  const [txOpen, setTxOpen] = useState(false);

  const reset = useWithdrawStore((state) => state.reset);
  const { data: transactionStatusData } = useTransactionStatus('withdraw', id);

  const txCompleted = transactionStatusData?.status === 'completed';
  const txHash = transactionStatusData?.tx_hash;

  const onCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      toast.success('Copied to clipboard!');
    } else {
      toast.error('Custody wallet address not defined');
    }
  };

  const onOpenScan = () => {
    if (txHash && networkName && NETWORK_TX_SCAN_MAP[networkName]) {
      openExternalLink(NETWORK_TX_SCAN_MAP[networkName] + txHash);
    } else {
      toast.error('Wrong network or transaction hash');
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
            {...stylex.props(
              styles.statusIconWrapper,
              txCompleted ? styles.greenWrapper : styles.violetWrapper
            )}
          >
            <Icon
              name={txCompleted ? 'circle-check' : 'progress-clock'}
              variant={txCompleted ? 'mint' : 'plum'}
              size={44}
            />
          </Flex>
          <Text size='5' weight='bold' lineHeight='18px'>
            {txCompleted ? 'Withdrawal Successful!' : 'Withdrawal In Progress'}
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
                <Flex py='1' px='2' {...stylex.props(styles.networkWrapper, styles.violetWrapper)}>
                  <Text color='violet' size='2' weight='bold' lineHeight='12px'>
                    {networkDescription}
                  </Text>
                </Flex>
              </Flex>
              <Flex minHeight='20px' justify='between' align='center' gap='4'>
                <Text size='2' weight='medium' lineHeight='12px'>
                  To
                </Text>
                <Flex maxWidth='250px' align='center' gap='2'>
                  <Text
                    size='2'
                    weight='bold'
                    align='right'
                    lineHeight='16px'
                    wordBreak='break-word'
                  >
                    {address}
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
      <Flex width='100%' align='center' gap='2' mt='8'>
        <Button asChild color='gray' variant='soft' size='4' onClick={reset} style={{ flex: 1 }}>
          <Link to='/'>
            <Text color='brown' size='3' weight='bold'>
              Done
            </Text>
          </Link>
        </Button>
        <Dialog
          asChild
          open={txOpen}
          trigger={
            txHash ? (
              <Button size='4'>
                <Text color='sky' size='3' weight='bold'>
                  Transaction Hash
                </Text>
              </Button>
            ) : null
          }
          setOpen={setTxOpen}
        >
          <Flex direction='column' gap='4' px='4'>
            <DialogTitle asChild>
              <Text size='4' align='center' weight='bold' lineHeight='16px'>
                Transaction Hash
              </Text>
            </DialogTitle>
            <Flex direction='column' gap='2'>
              <Card size='2' variant='classic'>
                <Flex width='300px' justify='center' mx='auto'>
                  <Text size='3' weight='medium' align='center' wordBreak='break-word'>
                    {txHash}
                  </Text>
                </Flex>
              </Card>
              <Button size='4' onClick={onOpenScan}>
                <Text color='sky' size='3' weight='bold'>
                  Open in scanner
                </Text>
              </Button>
            </Flex>
          </Flex>
        </Dialog>
      </Flex>
    </Flex>
  );
};

export default WithdrawInProgress;
