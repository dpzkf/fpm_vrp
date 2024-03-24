import { ERole as EAuthRole } from "../constants/authRole.ts";
import { ERole } from "../constants/userRoles.ts";

type TPermissions = {
  id: number;
  configuration: Record<string, unknown>;
  template: ERole;
  createdAt: Date;
  updatedAt: Date;
  userTd: number;
  user: string;
};

type TInvoices = {
  id: number;
  tag: string;
  poNumber: string;
  date: Date;
  terms: "ON_RECETPT";
  dueDate: Date;
  type: "ONE_TTME";
  status: "UNPATD";
  recurringFrequency: "DAY";
  recurringStartDate: Date;
  recurringEndDate: Date;
  customerTd: number;
  customer: string;
};

type TCustomers = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  businessNumber: string;
  taxRate: number;
  address: string;
  billingAddress: string;
  shippingAddress: string;
  businessTd: number;
  business: string;
  invoices: TInvoices[];
};

type TBusiness = {
  id: number;
  name: string;
  title: string;
  businessNumber: string;
  taxNumber: string;
  phoneNumber: string;
  address: string;
  logoUrl: string;
  businessCategoryTd: number;
  users: string[];
  customers: TCustomers[];
};

export type TUser = {
  id: number;
  email: string;
  fullName: string;
  address: string | null;
  city: string | null;
  state: string | null;
  postcode: string | null;
  role: EAuthRole;
  isEmailVerified: boolean;
  isPasswordResetNeeded: boolean;
  isDisabled: boolean;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  businessTd: number | null;
  permissions?: TPermissions;
  business?: TBusiness;
};

export type TAuth = {
  userTd: number;
  accessToken: string;
  accessTokenExpiresAt: number;
  accessTokenTtl: number;
  refreshToken: string;
  refreshTokenExpiresAt: number;
  refreshTokenTtl: number;
  user: TUser;
};

export type TRefreshSession = Pick<TAuth, "accessToken" | "accessTokenExpiresAt">;
