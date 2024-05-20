import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type UserLoginInput = z.infer<typeof userLoginSchema>;

export const userRegisterSchema = z.object({
  username: z.string(), //todo: add more validation
  email: z.string().email(),
  password: z.string().min(6),
});
export type UserRegisterInput = z.infer<typeof userRegisterSchema>;
