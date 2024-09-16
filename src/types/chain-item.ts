import { z } from 'zod';
import { NetworkSchema } from '@/services/user/networks/schema';

export type ChainItem = z.infer<typeof NetworkSchema>;
