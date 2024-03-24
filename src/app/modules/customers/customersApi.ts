import { api } from "../../api.ts";
import {
  TEditCustomerPayload,
  TEditCustomerResponse,
  TGetCustomerResponse,
  TGetCustomersResponse,
  TGetCustomersPagination,
} from "./types.ts";

export const customersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCustomers: build.query<TGetCustomersResponse, TGetCustomersPagination>({
      query: ({ limit, page }) => ({
        url: `customers?page=${page}&limit=${limit}`,
      }),
      providesTags: ["Customers"],
    }),
    getCustomer: build.query<TGetCustomerResponse, { id: string }>({
      query: ({ id }) => ({
        url: `customers/${id}`,
      }),
      providesTags: ["Customers"],
    }),
    editCustomer: build.mutation<TEditCustomerResponse, { id: string; body: TEditCustomerPayload }>({
      query: ({ id, body }) => ({
        url: `customers/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Customers"],
    }),
    deleteCustomer: build.mutation<unknown, { id: string }>({
      query: ({ id }) => ({
        url: `customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customers"],
    }),
  }),
});

export const { useDeleteCustomerMutation, useEditCustomerMutation, useGetCustomerQuery, useGetCustomersQuery } =
  customersApi;
