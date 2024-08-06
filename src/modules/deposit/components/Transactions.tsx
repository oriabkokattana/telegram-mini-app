import { Section, Table, Text } from '@radix-ui/themes';

const Transactions = () => {
  return (
    <Section py='6'>
      <Text>Transactions</Text>
      <Table.Root variant='surface' size='1' mt='2'>
        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Title</Table.RowHeaderCell>
            <Table.Cell>Description</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Title</Table.RowHeaderCell>
            <Table.Cell>Description</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Section>
  );
};

export default Transactions;
