import { z } from 'zod';

export const SystemRatesAPIRequestSchema = z.void();

export const SystemRatesAPIResponseSchema = z.record(z.string(), z.number());
