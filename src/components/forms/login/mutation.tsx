import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@/components/hooks/useAuth";
import { queryKeys } from "@/lib/keys";

import type { LoginSchema, LoginResult } from "./schema";
import { request } from "@/lib/http";

export const useLoginMutation = () => {
  const { setAuthed } = useAuth();
  const { mutate, error, isPending } = useMutation<
    LoginResult,
    Error,
    LoginSchema
  >({
    mutationKey: queryKeys["AUTH_LOGIN"],
    mutationFn: async (input) => {
      return await request<LoginResult>({
        path: "/auth/login",
        method: "POST",
        body: input,
      });
    },
    onSuccess: (result) => {
      setAuthed(result.token, result.refreshToken);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    login: mutate,
    isPending,
    error,
  };
};
