import { api } from "../../api.ts";
import { TGetTaxesResponse, TGetTaxesPagination, TGetTaxResponse, TEditTaxResponse, TEditTaxPayload } from "./types.ts";

export const taxesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTaxes: build.query<TGetTaxesResponse, TGetTaxesPagination>({
      query: ({ limit, page }) => ({
        url: `taxes?page=${page}&limit=${limit}`,
      }),
      providesTags: ["Taxes"],
    }),
    getTax: build.query<TGetTaxResponse, { id: string }>({
      query: ({ id }) => ({
        url: `taxes/${id}`,
      }),
      providesTags: ["Taxes"],
    }),
    editTax: build.mutation<TEditTaxResponse, { id: string; body: TEditTaxPayload }>({
      query: ({ id, body }) => ({
        url: `taxes/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Taxes"],
    }),
    deleteTax: build.mutation<unknown, { id: string }>({
      query: ({ id }) => ({
        url: `taxes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Taxes"],
    }),
    createTax: build.mutation<TGetTaxResponse, { body: TEditTaxPayload }>({
      query: ({ body }) => ({
        url: `taxes`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Taxes"],
    }),
  }),
});

export const { useDeleteTaxMutation, useEditTaxMutation, useGetTaxQuery, useGetTaxesQuery, useCreateTaxMutation } =
  taxesApi;
