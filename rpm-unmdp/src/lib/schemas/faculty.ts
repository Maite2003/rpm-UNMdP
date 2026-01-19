import * as z from 'zod';

export const facultySchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  abbreviation: z.string().optional(),
});

export type FacultyValues = z.infer<typeof facultySchema>;