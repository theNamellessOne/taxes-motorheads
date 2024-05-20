import { z } from "zod";

export const carPostCreateSchema = z.object({
  title: z.string(),
  content: z.string(),
  imgUrl: z.string().url(),
  preview: z.string(),
});
export type CarPostCreateInput = z.infer<typeof carPostCreateSchema>;

export const carPostUpdateSchema = carPostCreateSchema
  .pick({
    title: true,
    content: true,
    imgUrl: true,
    preview: true,
  })
  .partial();
export type CarPostUpdateInput = z.infer<typeof carPostUpdateSchema>;
