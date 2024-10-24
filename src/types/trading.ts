import { z } from 'zod';
import { SwapTokenSchema } from '@/services/user/swap-tokens/schema';

export type SwapTokenItem = z.infer<typeof SwapTokenSchema>;
export type SwapTokenType = 'base' | 'quote';

export type SwapDialogType = 'none' | 'funds' | 'min-exceeded' | 'swap-confirmation';
