import { z } from 'zod';

export const LogoutAPIRequestSchema = z.string().optional();

export const LogoutAPIResponseSchema = z.boolean();
