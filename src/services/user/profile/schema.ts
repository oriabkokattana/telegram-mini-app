import { z } from 'zod';

export const ProfileAPIRequestSchema = z.void();

export const ProfileAPIResponseSchema = z.object({
  avatar_image: z.string(),
  github_profile: z.string(),
  nickname: z.string(),
  public_info: z.string(),
  telegram_profile: z.string(),
  twitter_profile: z.string(),
});
