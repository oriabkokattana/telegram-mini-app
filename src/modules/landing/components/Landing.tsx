import { Box, Button, Flex, Heading, Separator } from '@radix-ui/themes';
import { useMainButton } from '@telegram-apps/sdk-react';
import Link from '@/modules/core/components/Link';
import About from './About';
import Advantages from './Advantages';
import WhyUs from './WhyUs';

const Landing = () => {
  const mb = useMainButton();

  mb.setParams({
    bgColor: '#aa1388',
    text: 'Go to the moon',
    isVisible: true,
  });

  return (
    <Flex width='100%' minHeight='100vh' px='4' py='4' direction='column'>
      <Flex justify='center' mb='2'>
        <Heading size='3'>Welcome to Kattana broker</Heading>
      </Flex>
      <About />
      <Advantages />
      <WhyUs />
      <Separator size='4' mt='auto' mb='3' />
      <Flex justify='center'>
        <Button asChild size='2'>
          <Box asChild width='200px'>
            <Link to='profile'>Go to the moon</Link>
          </Box>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Landing;
