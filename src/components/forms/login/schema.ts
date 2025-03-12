import { z } from "zod";

import { passwordValidator } from "@/lib/validators";

export const loginSchema = z.object({
  email: z.string().email(),
  password: passwordValidator,
  extendSession: z.boolean(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type LoginResult = {
  token: string;
  refreshToken: string;
};
