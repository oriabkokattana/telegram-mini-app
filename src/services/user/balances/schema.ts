import { z } from 'zod';

export const BalancesAPIRequestSchema = z.void();

export const BalanceSchema = z.object({
  balance: z.number(),
  balance_usd: z.number(),
  price_change: z.number(),
  reserved_balance: z.number(),
  reserved_balance_usd: z.number(),
});

const NetworkBalancesSchema = z.record(
  z.string(), // Network name, e.g., "BSC"
  BalanceSchema
);

const CurrencySchema = z.object({
  total_balance: BalanceSchema,
  network_balances: NetworkBalancesSchema,
});

export const BalancesAPIResponseSchema = z.record(
  z.string(), // Currency name, e.g., "USDT"
  CurrencySchema
);
