import { z } from 'zod';

export const ProfileAPIRequestSchema = z.void();

export const ProfileAPIResponseSchema = z.object({
  all_time_profit_diff: z.number(),
  all_time_profit_usd: z.number(),
  avatar_image: z.string(),
  daily_profit_diff: z.number(),
  daily_profit_usd: z.number(),
  fees_saving_usd: z.number(),
  github_profile: z.string(),
  kyc_status: z.number(),
  nickname: z.string(),
  public_info: z.string(),
  rank: z.number(),
  telegram_profile: z.string(),
  total_balance: z.number(),
  twitter_profile: z.string(),
  two_fa_enabled: z.boolean(),
});
