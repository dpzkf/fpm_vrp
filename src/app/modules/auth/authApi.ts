import { api } from "../../api.ts";
import { TAuth } from "../../../types/model.ts";
import { signUpFormSchema } from "../../../pages/SignUp/Form/schema.ts";
import { signInFormSchema } from "../../../pages/SignIn/Form/schema.ts";
import * as z from "zod";
import { setUser, setTokens } from "../me/meSlice.ts";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<TAuth, z.infer<typeof signUpFormSchema>>({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
      transformResponse: (result: TAuth) => result,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
          dispatch(setTokens(data));
        } catch (error) {
          /* empty */
        }
      },
    }),
    login: build.mutation<TAuth, z.infer<typeof signInFormSchema>>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (result: TAuth) => result,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
          dispatch(setTokens(data));
        } catch (error) {
          /* empty */
        }
      },
    }),
  }),
});
export const { useRegisterMutation, useLoginMutation } = authApi;
