import { ECategoryType } from "../../../constants";

export type TCategory = {
  id: number;
  name: string;
  type: ECategoryType;
  businessId: number;
  business: string;
  products: TProduct[];
  expenses: TExpense[];
};

export type TProduct = {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  category: string;
  quantity: number;
  details: string;
  isEnabledForPurchases: boolean;
  isEnabledForSales: boolean;
  businessId: number;
  business: string;
  operations: string[];
};

export type TExpense = {
  id: number;
  amount: number;
  taxRate: number;
  vendorId: number;
  categoryId: number;
  date: string;
  notes: string;
  fileUrl: string;
  vendor: string;
  category: string;
};

export type TGetCategoriesResponse = {
  categories: TCategory[];
  total: number;
};

export type TGetCategoryResponse = TCategory;
export type TEditCategoryResponse = TCategory;
export type TCreateCategoryResponse = TCategory;

export type TGetCategoriesPagination = {
  limit: number;
  page: number;
};

export type TCreateCategoryPayload = {
  name: string;
  type: ECategoryType;
};

export type TEditCategoryPayload = TCreateCategoryPayload;
