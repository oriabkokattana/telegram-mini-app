import { z } from 'zod';
import { ProfileAPIResponseSchema } from '@/services/user/profile/schema';

export type Profile = z.infer<typeof ProfileAPIResponseSchema>;
