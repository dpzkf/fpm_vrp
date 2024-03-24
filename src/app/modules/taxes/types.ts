// Tax type definition
export type TTax = {
  id: number;
  name: string;
  rate: number;
  taxNumber: string;
  details: string;
  isNameShownInInvoice: boolean;
  businessId: number;
  business: string;
};

export type TGetTaxesResponse = {
  taxes: TTax[];
  total: number;
};

export type TGetTaxesPagination = {
  limit: number;
  page: number;
};

export type TGetTaxResponse = TTax;

export type TEditTaxResponse = TTax;

export type TEditTaxPayload = Omit<TTax, "businessId" | "business" | "id">;
