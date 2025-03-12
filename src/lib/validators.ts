import { z } from "zod";

export const passwordValidator = z
  .string()
  .min(6)
  .refine(
    (input) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/.test(input),
    "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character",
  );
