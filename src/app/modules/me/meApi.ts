import { TUser } from "../../../types/model.ts";
import { api } from "../../api.ts";
import { setUser } from "./meSlice.ts";
import { TEditMePayload } from "./types.ts";

const meApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query({
      query: () => ({
        url: "users/my",
      }),
      providesTags: ["Me"],
      transformResponse: (result: TUser) => result,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          /* empty */
        }
      },
    }),
    editMe: build.mutation<TUser, { body: TEditMePayload }>({
      query: ({ body }) => ({
        url: `users/my`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useGetMeQuery, useEditMeMutation } = meApi;
