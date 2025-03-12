import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthState = {
  authed: boolean;
  token?: string;
  refreshToken?: string;
  setAuthed: (token: string, refreshToken: string) => void;
  setUnauthed: () => void;
};

export const useAuth = create(
  persist<AuthState>(
    (set) => ({
      authed: false,
      setAuthed: (token, refreshToken) =>
        set({ authed: true, token, refreshToken }),
      setUnauthed: () =>
        set({ authed: false, token: undefined, refreshToken: undefined }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
