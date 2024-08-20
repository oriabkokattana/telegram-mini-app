import { z } from 'zod';
import { Heading, Section, Table } from '@radix-ui/themes';
import { ProfileAPIResponseSchema } from '@/services/user/profile/schema';

interface PortfolioProps {
  data?: z.infer<typeof ProfileAPIResponseSchema>;
}

const Portfolio = ({ data }: PortfolioProps) => {
  return (
    <Section pb='1'>
      <Heading mb='2'>Portfolio</Heading>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Github</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Public Info</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Telegram</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Twitter</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>{data?.github_profile}</Table.RowHeaderCell>
            <Table.Cell>{data?.public_info}</Table.Cell>
            <Table.Cell>{data?.telegram_profile}</Table.Cell>
            <Table.Cell>{data?.twitter_profile}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Section>
  );
};

export default Portfolio;
