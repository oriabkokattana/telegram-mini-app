import { z } from 'zod';
import { NetworkSchema } from '@/services/user/networks/schema';

export type NetworkItem = z.infer<typeof NetworkSchema>;
