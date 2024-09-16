import { z } from 'zod';

export const DirectionSchema = z.enum(['deposit', 'withdraw']);

export type Direction = z.infer<typeof DirectionSchema>;
