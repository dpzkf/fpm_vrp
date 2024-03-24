import { api } from "../../api.ts";
import {
  TCreateCategoryPayload,
  TEditCategoryPayload,
  TEditCategoryResponse,
  TGetCategoriesPagination,
  TGetCategoriesResponse,
  TGetCategoryResponse,
  TCreateCategoryResponse,
} from "./types.ts";

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<TGetCategoriesResponse, TGetCategoriesPagination>({
      query: ({ limit, page }) => ({
        url: `categories?page=${page}&limit=${limit}`,
      }),
      providesTags: ["Categories"],
    }),
    getCategory: build.query<TGetCategoryResponse, { id: string }>({
      query: ({ id }) => ({
        url: `categories/${id}`,
      }),
      providesTags: ["Categories"],
    }),
    editCategory: build.mutation<TEditCategoryResponse, { id: string; body: TEditCategoryPayload }>({
      query: ({ id, body }) => ({
        url: `categories/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: build.mutation<unknown, { id: string }>({
      query: ({ id }) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
    createCategory: build.mutation<TCreateCategoryResponse, { body: TCreateCategoryPayload }>({
      query: ({ body }) => ({
        url: `categories`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
} = categoriesApi;
