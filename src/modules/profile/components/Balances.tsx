import { z } from 'zod';
import { Heading, Section, Table } from '@radix-ui/themes';
import { BalancesAPIResponseSchema } from '@/services/user/balances/schema';

interface BalancesProps {
  data?: z.infer<typeof BalancesAPIResponseSchema>;
}

const Balances = ({ data }: BalancesProps) => {
  return (
    <Section py='6'>
      <Heading mb='2'>Balances</Heading>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Token</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Balance</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data?.map((item) => (
            <Table.Row key={item.token}>
              <Table.RowHeaderCell>{item?.token}</Table.RowHeaderCell>
              <Table.Cell>{item?.balance}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Section>
  );
};

export default Balances;
