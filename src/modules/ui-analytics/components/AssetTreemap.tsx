import { CSSProperties, useMemo } from 'react';
import { NodeProps, ResponsiveTreeMapHtml } from '@nivo/treemap';
import { Box, Flex } from '@radix-ui/themes';
import { Responsive } from '@radix-ui/themes/dist/esm/props/prop-def.js';
import Link from '@/modules/core/components/Link';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { useBalancesStore } from '@/store/balances-store';
import { trackTreemapChartClicked } from '@/utils/amplitude-events';
import { formatNumberWithSpaces, formatPercent, trimToPrecision } from '@/utils/numbers';

type Rank = 'small' | 'medium' | 'big';

type Asset = {
  name: string;
  balance: number;
  balanceUSD: number;
  pnlPercent: number;
};

type AssetWithColorAndRank = Asset & { color: string; rank: Rank };

type TreemapData = AssetWithColorAndRank & { children: AssetWithColorAndRank[] };

const assignColorsAndRank = (assets: Asset[]): AssetWithColorAndRank[] => {
  if (assets.length === 0) return [];

  // Sort assets by balanceUSD in descending order
  const sortedAssets = [...assets].sort((a, b) => b.balanceUSD - a.balanceUSD);

  const groups = {
    high: [] as Asset[],
    medium: [] as Asset[],
    low: [] as Asset[],
  };

  const assignToGroup = (asset: Asset, group: Asset[]) => {
    if (group.length === 0) {
      group.push(asset);
    } else {
      const highestInGroup = group[0].balanceUSD;
      const lowestAllowed = highestInGroup * 0.7; // 30% less than the highest
      if (asset.balanceUSD >= lowestAllowed) {
        group.push(asset);
      } else {
        return false; // Indicates the asset doesn't fit in the current group
      }
    }
    return true;
  };

  // Fill the "high" group first
  for (const asset of sortedAssets) {
    if (!assignToGroup(asset, groups.high)) break;
  }

  // Then fill the "medium" group
  for (let i = groups.high.length; i < sortedAssets.length; i++) {
    if (!assignToGroup(sortedAssets[i], groups.medium)) break;
  }

  // The remaining assets go into the "low" group
  groups.low = sortedAssets.slice(groups.high.length + groups.medium.length);

  return sortedAssets.map((asset) => {
    let color: string;
    let rank: Rank;

    if (groups.high.includes(asset)) {
      color = asset.pnlPercent >= 0 ? 'rgba(174, 154, 255, 1)' : 'rgba(255, 101, 179, 1)';
      rank = 'big';
    } else if (groups.medium.includes(asset)) {
      color = asset.pnlPercent >= 0 ? 'rgba(147, 129, 215, 1)' : 'rgba(196, 77, 139, 1)';
      rank = 'medium';
    } else {
      color = asset.pnlPercent >= 0 ? 'rgba(84, 71, 123, 1)' : 'rgba(120, 48, 89, 1)';
      rank = 'small';
    }

    return { ...asset, color, rank };
  });
};

const AssetTreemap = () => {
  const balances = useBalancesStore((state) => state.balances);

  const treeMapData = useMemo<TreemapData>(() => {
    const tokens = Object.keys(balances);
    const assets = tokens.map((item) => ({
      name: item,
      balance: Number(balances[item].total_balance.balance),
      balanceUSD: Number(balances[item].total_balance.balance_usd),
      pnlPercent: Number(balances[item].total_balance.pnl_percent) * 100,
    }));
    return {
      name: 'root',
      balance: 0,
      balanceUSD: 0,
      pnlPercent: 0,
      rank: 'big',
      color: 'rgba(0, 0, 0, 0)',
      children: assignColorsAndRank(assets),
    };
  }, [balances]);

  if (!treeMapData.children.length) {
    return null;
  }

  return (
    <Box height={treeMapData.children.length > 4 ? 'calc(100vh - 180px)' : '304px'}>
      <ResponsiveTreeMapHtml
        data={treeMapData}
        identity='name'
        value='balanceUSD'
        tile='binary'
        innerPadding={4}
        leavesOnly
        colors={{ datum: 'data.color' }}
        nodeComponent={CustomTreemapNode}
      />
    </Box>
  );
};

const getTreemapNodeStyles = (
  rank: Rank,
  width: number,
  height: number,
  rotate: number
): Record<'base' | 'header' | 'description' | 'usd', CSSProperties> => {
  if (width <= 90 || height <= 40) {
    return {
      base: { gap: 0, padding: 0, alignItems: 'center' },
      header: {
        width: rotate === -90 ? height : '100%',
        gap: 4,
        justifyContent: 'center',
        rotate: `${rotate}deg`,
      },
      description: { display: 'none' },
      usd: { display: 'none' },
    };
  }

  if (width <= 120) {
    return {
      base: { gap: 9, padding: 16, alignItems: 'center' },
      header: {
        width: rotate === -90 ? height : '100%',
        gap: 8,
        justifyContent: 'center',
        rotate: `${rotate}deg`,
      },
      description: { display: 'none' },
      usd: { display: 'none' },
    };
  }

  if (rank === 'small') {
    return {
      base: { gap: 13, padding: 12, alignItems: 'center' },
      header: { width: '100%', gap: 4, justifyContent: 'center' },
      description: { justifyContent: 'center' },
      usd: { display: 'none' },
    };
  }

  if (rank === 'medium') {
    return {
      base: { gap: 9, padding: 16 },
      header: { width: '100%', gap: 8 },
      description: {},
      usd: {},
    };
  }
  return {
    base: { gap: 9, padding: 16 },
    header: { width: '100%', gap: 8 },
    description: {},
    usd: {},
  };
};

const getTreemapNodeFontSizes = (
  rank: Rank,
  width: number
): Record<
  'headerFontSize',
  { size: Responsive<'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>; lineHeight: string }
> => {
  if (width < 90) {
    return {
      headerFontSize: { size: '2', lineHeight: '12px' },
    };
  }
  if (rank === 'small') {
    return {
      headerFontSize: { size: '3', lineHeight: '14px' },
    };
  }
  if (rank === 'medium') {
    return {
      headerFontSize: { size: '5', lineHeight: '18px' },
    };
  }
  return {
    headerFontSize: { size: '6', lineHeight: '22px' },
  };
};

const CustomTreemapNode = ({ node }: NodeProps<TreemapData>) => {
  const { base, header, description, usd } = getTreemapNodeStyles(
    node.data.rank,
    node.width,
    node.height,
    node.labelRotation
  );
  const { headerFontSize } = getTreemapNodeFontSizes(node.data.rank, node.width);

  const positiveProfit = node.data.pnlPercent >= 0;

  return (
    <Flex
      asChild
      direction='column'
      justify='center'
      position='absolute'
      top='0'
      left='0'
      style={{
        width: node.width,
        height: node.height,
        translate: `${node.x}px ${node.y}px`,
        overflow: 'hidden',
        borderRadius: '8px',
        backgroundColor: node.color,
        ...base,
      }}
      onClick={() => trackTreemapChartClicked(node.data.name)}
    >
      <Link to={`/asset/${node.data.name}`}>
        <Flex align='center' style={header}>
          <Text color='sky' weight='medium' truncate {...headerFontSize}>
            {trimToPrecision(node.data.balance, 2)}
          </Text>
          <Text color='sky' weight='medium' truncate {...headerFontSize}>
            {node.data.name}
          </Text>
        </Flex>
        <Flex width='100%' align='center' gap='2' style={description}>
          <Flex height='16px' align='center' gap='1'>
            <Icon
              name={positiveProfit ? 'top-right-arrow' : 'bottom-right-arrow'}
              variant='white'
              size={16}
            />
            <Text color='sky' size='1' weight='medium' lineHeight='10px' truncate>
              {formatPercent(node.data.pnlPercent)}%
            </Text>
          </Flex>
          <Text color='sky' size='1' weight='medium' lineHeight='10px' truncate style={usd}>
            ${formatNumberWithSpaces(node.data.balanceUSD, 1)}
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};

export default AssetTreemap;
