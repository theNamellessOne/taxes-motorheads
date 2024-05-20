import { z } from "zod";

export const commentCreateSchema = z.object({
  postId: z.number(),
  content: z.string().min(2).max(128),
});
export type CommentCreateInput = z.infer<typeof commentCreateSchema>;

export const commentUpdateSchema = commentCreateSchema
  .pick({
    content: true,
  })
  .partial();
export type CommentUpdateInput = z.infer<typeof commentUpdateSchema>;
