import { User } from "@prisma/client";
import { api } from "./api";
export type UserData = Omit<User, "id">;
type ResponceLoginData = User & { token: string };
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponceLoginData, UserData>({
      query: (userData) => ({
        url: "/user/login",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation<ResponceLoginData, UserData>({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
    }),
    current: builder.query<ResponceLoginData, void>({
      query: () => ({
        url: "/user/current",
        method: "GET",
      }),
    }),
  }),
});
export const { useLoginMutation, useCurrentQuery, useRegisterMutation } =
  authApi;
export const {
  endpoints: { login, register, current },
} = authApi;
