import * as z from 'zod';

export const universitySchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  abbreviation: z.string().optional(),
  website: z.url("Debe ser una URL valida").optional().or(z.literal(""))
});

export type UniversityValues = z.infer<typeof universitySchema>;