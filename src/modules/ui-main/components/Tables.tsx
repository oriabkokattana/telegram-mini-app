import { Box, Flex } from '@radix-ui/themes';
import NoDataPlaceholder from '@/modules/core/components/NoDataPlaceholder';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { useBalancesStore } from '@/store/balances-store';
import { useThemeStore } from '@/store/theme-store';
import Assets from './Assets';

const Tables = () => {
  const theme = useThemeStore((state) => state.theme);
  const balances = useBalancesStore((state) => state.balances);

  if (!Object.keys(balances).length) {
    return (
      <Flex direction='column' gap='5'>
        <Flex height='32px' justify='between' align='center' position='relative'>
          <Flex align='center' gap='28px' position='relative'>
            <Text size='3' weight='bold'>
              My Assets
            </Text>
            <Text color='gray' size='3' weight='medium'>
              Watchlist
            </Text>
            <Text color='gray' size='3' weight='medium'>
              Price Alerts
            </Text>
            <Box
              width='49px'
              height='40px'
              position='absolute'
              top='-8px'
              right='-17px'
              style={{
                background:
                  theme === 'dark'
                    ? 'linear-gradient(270deg, #0C0612 0%, rgba(12, 6, 18, 0.00) 100%)'
                    : 'linear-gradient(270deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)',
              }}
            />
          </Flex>
          <Icon name='filter' />
        </Flex>
        <NoDataPlaceholder
          variant='list'
          title="You don't have assets yet"
          description='You can make a deposit to show your tokens here'
        />
      </Flex>
    );
  }

  return (
    <Flex direction='column' gap='5'>
      <Flex height='32px' align='center'>
        <Text size='3' weight='bold'>
          My Assets
        </Text>
      </Flex>
      <Assets />
    </Flex>
  );
};

export default Tables;
