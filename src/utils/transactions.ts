import { RawTransactionMapping, TransactionItem } from '@/types';

export const transformTransactions = (data?: RawTransactionMapping): TransactionItem[] => {
  if (!data) {
    return [];
  }

  const transactionsArray: TransactionItem[] = [];

  // Flatten the data into a list of transactions with asset names
  Object.entries(data).forEach(([asset, transactions]) => {
    transactions.forEach((transaction, index) => {
      const action = transaction.is_income ? `Deposit ${asset} funds` : `Withdraw ${asset} funds`;

      const date = new Date(transaction.timestamp * 1000).toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      transactionsArray.push({
        id: `${asset}-${index}`,
        action,
        date,
        amount: transaction.amount,
      });
    });
  });

  // Sort transactions by timestamp
  transactionsArray.sort((a, b) => {
    const timestampA = new Date(a.date).getTime();
    const timestampB = new Date(b.date).getTime();
    return timestampA - timestampB;
  });

  return transactionsArray;
};
