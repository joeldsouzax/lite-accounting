import { z } from 'zod';

export const ledger = z
  .object({
    name: z
      .string()
      .length(55, 'name should not be greater than 55 characters')
      .optional(),
    description: z.string().length(160, 'description is too large').optional(),
  })
  .strict();
