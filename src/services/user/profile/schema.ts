import { z } from 'zod';

export const ProfileAPIRequestSchema = z.void();

export const ProfileAPIResponseSchema = z.object({
  avatar_image: z.string(),
  fees_saving_usd: z.number(),
  github_profile: z.string(),
  kyc_status: z.number(),
  nickname: z.string(),
  public_info: z.string(),
  rank: z.number(),
  telegram_profile: z.string(),
  twitter_profile: z.string(),
  two_fa_enabled: z.boolean(),
});
