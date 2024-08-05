import { CameraIcon } from '@radix-ui/react-icons';
import { Flex, Heading, Section, Text } from '@radix-ui/themes';

const WhyUs = () => {
  return (
    <Section py='0'>
      <Flex justify='center' py='2' style={{ backgroundColor: 'var(--gray-a2)' }}>
        <CameraIcon width='32px' height='32px' />
      </Flex>
      <Flex direction='column' gap='3' py='4'>
        <Heading>Why Us</Heading>
        <Text>Description</Text>
        <Text>Description</Text>
      </Flex>
    </Section>
  );
};

export default WhyUs;
