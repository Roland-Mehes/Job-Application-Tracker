import { z } from 'zod';

export const createJobSchema = z.object({
  company: z.string().min(2),
  title: z.string().min(3),
  description: z.string().min(2),
  salary: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
