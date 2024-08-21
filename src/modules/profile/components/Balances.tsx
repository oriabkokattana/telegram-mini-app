import { z } from 'zod';
import { Heading, Section, Table } from '@radix-ui/themes';
import { BalancesAPIResponseSchema } from '@/services/user/balances/schema';

interface BalancesProps {
  data?: z.infer<typeof BalancesAPIResponseSchema>;
}

const Balances = ({ data }: BalancesProps) => {
  const tokens = Object.keys(data || {});

  return (
    <Section py='6'>
      <Heading mb='2'>Balances</Heading>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Token</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Balance</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Reserved</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body key={tokens.toString()}>
          {tokens?.map((token) => (
            <Table.Row key={token}>
              <Table.RowHeaderCell>{token}</Table.RowHeaderCell>
              <Table.Cell>{data?.[token].total_balance.balance}</Table.Cell>
              <Table.Cell>{data?.[token].total_balance.reserved_balance}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Section>
  );
};

export default Balances;
