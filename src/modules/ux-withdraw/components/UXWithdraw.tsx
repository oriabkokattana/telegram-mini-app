import { useEffect } from 'react';
import * as Separator from '@radix-ui/react-separator';
import * as stylex from '@stylexjs/stylex';
import { useMiniApp } from '@telegram-apps/sdk-react';
import ChevronDownRoundedIcon from '@/assets/chevron-down-rounded.svg?react';
import QrCodeIcon from '@/assets/qr-code.svg?react';
import ReceiptIcon from '@/assets/receipt.svg?react';
import Link from '@/modules/core/components/Link';
import UXChainSelect from '@/modules/core/components/UXChainSelect';
import { Button } from '@/modules/core/design-system/button';
import { Input } from '@/modules/core/design-system/input';

import { styles } from './UXWithdraw.styles';

const UXWithdraw = () => {
  const miniApp = useMiniApp();

  useEffect(() => {
    miniApp.setHeaderColor('#F7F7F7');
    miniApp.setBgColor('#F7F7F7');
  }, []);

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.headerWrapper)}>
        <span {...stylex.props(styles.header)}>Deposit USDT</span>
        <ReceiptIcon />
      </div>
      <Input
        size='md'
        w='100%'
        label='Address USDT'
        rightElement={
          <Link {...stylex.props(styles.addressAction)} to='/ux/qr-code'>
            <QrCodeIcon />
          </Link>
        }
        placeholder='Enter address'
      />
      <UXChainSelect>
        <Input
          size='md'
          w='100%'
          label='Network for withdrawal'
          rightElement={<ChevronDownRoundedIcon />}
          placeholder='Select Network'
          readOnly
        />
      </UXChainSelect>
      <Input
        size='md'
        w='100%'
        label='Amount'
        rightElement={
          <div {...stylex.props(styles.amountAction)}>
            <span>USDT</span>
            <Separator.Root {...stylex.props(styles.separator)} orientation='vertical' />
            <span>MAX</span>
          </div>
        }
        placeholder='Min 0'
      />
      <div {...stylex.props(styles.descriptionWrapper)}>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>Fee</span>
          <div {...stylex.props(styles.valueWrapper)}>
            <span {...stylex.props(styles.value)}>0</span>{' '}
            <span {...stylex.props(styles.currency)}>USDT</span>
          </div>
        </div>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>Processing Time</span>
          <div {...stylex.props(styles.valueWrapper)}>
            <span {...stylex.props(styles.value)}>4 minutes</span>
          </div>
        </div>
        <Button size='md'>Send</Button>
      </div>
    </div>
  );
};

export default UXWithdraw;
