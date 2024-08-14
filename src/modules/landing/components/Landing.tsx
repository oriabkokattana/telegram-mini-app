import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Heading, Separator } from '@radix-ui/themes';
import { useMainButton } from '@telegram-apps/sdk-react';
import Link from '@/modules/core/components/Link';
import About from './About';
import Advantages from './Advantages';
import WhyUs from './WhyUs';

const Landing = () => {
  const mb = useMainButton();
  const navigate = useNavigate();

  useEffect(() => {
    mb.setParams({
      bgColor: '#aa1388',
      text: 'Go to the moon',
      isVisible: true,
      isEnabled: true,
    });

    mb.on('click', () => {
      navigate('/auth');
      mb.hide();
    });

    return () => {
      mb.hide();
    };
  }, []);

  return (
    <Flex width='100%' minHeight='var(--tg-viewport-height)' px='4' py='4' direction='column'>
      <Flex justify='center' mb='2'>
        <Heading size='3'>Welcome to Kattana broker</Heading>
      </Flex>
      <About />
      <Separator size='4' mt='auto' my='1' />
      <Advantages />
      <Separator size='4' mt='auto' my='1' />
      <WhyUs />
      {import.meta.env.DEV && (
        <Flex justify='center'>
          <Button asChild size='2'>
            <Box asChild width='200px'>
              <Link to='/auth'>Go to the moon</Link>
            </Box>
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Landing;
