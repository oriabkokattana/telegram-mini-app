import { Section, Table, Text } from '@radix-ui/themes';

const PreviousWithdrawals = () => {
  return (
    <Section py='2' px='2' style={{ border: '1px solid var(--gray-6)' }}>
      <Text>Last Withdrawals</Text>
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

export default PreviousWithdrawals;
