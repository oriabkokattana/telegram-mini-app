import { Heading, Section, Table } from '@radix-ui/themes';

const Portfolio = () => {
  return (
    <Section>
      <Heading mb='2'>Portfolio</Heading>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Coin</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Count</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>PnL</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Swap</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>BTC</Table.RowHeaderCell>
            <Table.Cell>12</Table.Cell>
            <Table.Cell>15%</Table.Cell>
            <Table.Cell>20$</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>ETH</Table.RowHeaderCell>
            <Table.Cell>12</Table.Cell>
            <Table.Cell>15%</Table.Cell>
            <Table.Cell>20$</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>SOL</Table.RowHeaderCell>
            <Table.Cell>12</Table.Cell>
            <Table.Cell>15%</Table.Cell>
            <Table.Cell>20$</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Section>
  );
};

export default Portfolio;
