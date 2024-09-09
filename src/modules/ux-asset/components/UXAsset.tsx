import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as stylex from '@stylexjs/stylex';
import { useMiniApp } from '@telegram-apps/sdk-react';
import ExportIcon from '@/assets/export.svg?react';
import ImportIcon from '@/assets/import.svg?react';
import NotificationsIcon from '@/assets/notifications.svg?react';
import SwapIcon from '@/assets/swap.svg?react';
import ChartWithTimeframes from '@/modules/core/components/ChartWithTimeframes';
import Link from '@/modules/core/components/Link';
import TransactionHistory from '@/modules/core/components/TransactionHistory';
import { IconButton } from '@/modules/core/design-system/icon-button';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import PriceInfo from './PriceInfo';

import { styles } from './UXAsset.styles';

const UXAsset = () => {
  const [asset, setAsset] = useState('');

  const params = useParams();
  const miniApp = useMiniApp();

  useEffect(() => {
    miniApp.setHeaderColor('#FFFFFF');
    miniApp.setBgColor('#FFFFFF');
  }, []);

  useEffect(() => {
    setAsset(params.asset || '');
  }, [params]);

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.overall)}>
        <div {...stylex.props(styles.infoWrapper)}>
          <div {...stylex.props(styles.info)}>
            <TokenIcon size='lg' name={asset} />
            <div {...stylex.props(styles.amountWrapper)}>
              <span {...stylex.props(styles.amount)}>106</span>{' '}
              <span {...stylex.props(styles.currency)}>{asset}</span>
            </div>
            <div {...stylex.props(styles.changeWrapper)}>
              <span>~$290 695</span>
              <span>(+ 1,400.90 $)</span>
            </div>
          </div>
          <NotificationsIcon />
        </div>
        <ChartWithTimeframes />
        <div {...stylex.props(styles.actions)}>
          <IconButton
            asChild
            size='md'
            variant='black'
            w='calc(100% / 3)'
            label='Deposit'
            Icon={ImportIcon}
          >
            <Link to={`/ux/deposit/${asset}`} />
          </IconButton>
          <IconButton
            asChild
            size='md'
            variant='gray'
            w='calc(100% / 3)'
            label='Withdraw'
            Icon={ExportIcon}
          >
            <Link to={`/ux/withdraw/${asset}`} />
          </IconButton>
          <IconButton
            asChild
            size='md'
            variant='gray'
            w='calc(100% / 3)'
            label='Swap'
            stroke='grey1000'
            Icon={SwapIcon}
          >
            <Link to={`/ux/swap/${asset}`} />
          </IconButton>
        </div>
      </div>
      <div {...stylex.props(styles.purchaseWrapper)}>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>Purchased on:</span>
          <span {...stylex.props(styles.value)}>15th July 2023</span>
        </div>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>Purchase Price:</span>
          <span {...stylex.props(styles.value)}>$30,000 per {asset}</span>
        </div>
      </div>
      <TransactionHistory variant='collapsible' asset={asset} />
      <PriceInfo asset={asset} />
    </div>
  );
};

export default UXAsset;
