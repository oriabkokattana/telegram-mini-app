import { z } from 'zod';

export const BalancesAPIRequestSchema = z.void();

export const BalanceSchema = z.object({
  balance: z.string(),
  balance_usd: z.string(),
  pnl_percent: z.string(),
  pnl_usd: z.string(),
  reserved_balance: z.string(),
  reserved_balance_usd: z.string(),
});

const CurrencySchema = z.object({
  currency_name: z.string(),
  precision: z.number(),
  total_balance: BalanceSchema,
});

export const BalancesAPIResponseSchema = z.object({
  pnl_percent: z.string(),
  pnl_usd: z.string(),
  total_balance_usd: z.string(),
  balances: z.record(
    z.string(), // Currency name, e.g., "USDT"
    CurrencySchema
  ),
});
