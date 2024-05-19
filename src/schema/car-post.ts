import { z } from "zod";

export const carPostCreateSchema = z.object({
  title: z.string(),
  content: z.string(),
  imgUrl: z.string().url(),
});
export type CarPostCreate = z.infer<typeof carPostCreateSchema>;

export const carPostUpdateSchema = carPostCreateSchema
  .pick({
    title: true,
    content: true,
    imgUrl: true,
  })
  .partial();
export type CarPostUpdate = z.infer<typeof carPostUpdateSchema>;
