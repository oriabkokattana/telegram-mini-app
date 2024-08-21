import { ChevronRightIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Box, Flex, IconButton, Separator, Text, TextField } from '@radix-ui/themes';

interface SwapInputProps {
  coin: string;
  price: number;
  priceChange: number;
  priceChangePercent: number;
  balance: number;
  action: 'Send' | 'Receive';
  onChange(amount: string): void;
}

const SwapInput = ({
  coin,
  price,
  priceChange,
  priceChangePercent,
  balance,
  action,
  onChange,
}: SwapInputProps) => {
  return (
    <Box>
      <Flex align='center'>
        <Flex width='100%' align='center' gap='2'>
          <Box flexGrow='0' flexShrink='0' flexBasis='20%'>
            <Text weight='bold'>{coin}</Text>
          </Box>
          <Box maxWidth='100px'>
            <TextField.Root placeholder='Search...'>
              <TextField.Slot>
                <MagnifyingGlassIcon height='16' width='16' />
              </TextField.Slot>
            </TextField.Root>
          </Box>
          <Text ml='auto'>${price}</Text>
          <Flex direction='column' gap='1'>
            <Text size='2'>+${priceChange}</Text>
            <Text size='2'>+{priceChangePercent}%</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex mt='2' justify='between' align='center'>
        <Text size='2'>{action}</Text>
        <Box width='100px'>
          <TextField.Root
            color='gray'
            variant='soft'
            size='1'
            placeholder='0'
            onChange={(e) => onChange(e.target.value)}
          >
            <TextField.Slot />
            <TextField.Slot>
              <IconButton size='1' variant='ghost'>
                <ChevronRightIcon height='14' width='14' />
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
        </Box>
      </Flex>
      <Separator size='4' my='1' />
      <Flex justify='between' align='center'>
        <Text size='2'>Balance</Text>
        <Text size='2'>{balance}</Text>
      </Flex>
    </Box>
  );
};

export default SwapInput;
