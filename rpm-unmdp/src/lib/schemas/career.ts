import * as z from 'zod';

export const careerSchema = z.object({
  name: z.string(),
});

export type CareerValues = z.infer<typeof careerSchema>;