export type TCustomer = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  businessNumber: string;
  taxRate: number;
  address: string;
  billingAddress: string;
  shippingAddress: string;
  businessId: number;
  business: string;
  invoices: TInvoice[];
};

export type TInvoice = {
  id: number;
  tag: string;
  poNumber: string;
  date: string;
  terms: string;
  dueDate: string;
  type: string;
  status: string;
  recurringFrequency: string;
  recurringStartDate: string;
  recurringEndDate: string;
  customerId: number;
  customer: string;
};

export type TGetCustomersResponse = {
  customers: TCustomer[];
  total: number;
};

export type TGetCustomerResponse = TCustomer;

export type TEditCustomerResponse = TCustomer;

export type TGetCustomersPagination = {
  limit: number;
  page: number;
};

export type TEditCustomerPayload = {
  name: string;
  email: string;
  phoneNumber: string;
  businessNumber: string;
  taxRate: number;
  address: string;
  billingAddress: string;
  shippingAddress: string;
};
