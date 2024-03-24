// User type definition
import { ERole } from "../../../constants/userRoles.ts";

export enum EAccess {
  Access = "ACCESS",
  NoAccess = "NO_ACCESS",
}

type TUserConfiguration = {
  CUSTOMERS: EAccess;
  BILLS: EAccess;
  ESTIMATES: EAccess;
  INVOICES: EAccess;
  PRODUCTS: EAccess;
  REPORTS: EAccess;
  EXPENSES: EAccess;
};

type TPermission = {
  configuration: TUserConfiguration;
  template: ERole;
};

export type TUser = {
  id: number;
  fullName: string;
  email: string;
  createdAt: Date;
  permissions: TPermission;
};

export type TGetUsersResponse = {
  users: TUser[];
  total: number;
};

export type TGetUsersPagination = {
  limit: number;
  page: number;
};

export type TGetUserResponse = TUser;

export type TEditUserResponse = TUser;

export type TEditUserPayload = Omit<TUser, "id" | "createdAt" | "permissions"> & {
  permissionsTemplate: ERole;
  permissionsConfiguration: TUserConfiguration;
};
