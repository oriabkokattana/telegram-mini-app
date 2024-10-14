import { useState } from 'react';
import * as Label from '@radix-ui/react-label';
import { Button, Flex, TextField } from '@radix-ui/themes';
import { useEmailPassword } from '@/services/auth/email-password/api';

const EmailPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailPassword = useEmailPassword();

  const onLogin = () => {
    emailPassword.mutate({ email, password });
  };

  return (
    <Flex direction='column' gap='4' pb='2'>
      <Flex direction='column' gap='5'>
        <Flex align='center' gap='9'>
          <Label.Root htmlFor='amount'>Email:</Label.Root>
          <TextField.Root
            size='3'
            placeholder='user@gmail.com'
            id='amount'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Flex>
      </Flex>
      <Flex align='center' gap='33px'>
        <Label.Root htmlFor='amount'>Password:</Label.Root>
        <TextField.Root
          size='3'
          placeholder='123456...'
          id='amount'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Flex>
      <Button onClick={onLogin}>Login</Button>
    </Flex>
  );
};

export default EmailPassword;
