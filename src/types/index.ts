import { Table } from "@tanstack/react-table";
import { ReactNode } from "react";
import { ValueOf } from "./utils";

import { SubscriptionType, SubscriptionPeriod } from "../constants/subscription";

export type TAppRouteItem = {
  /**
   * Path to the page route.
   * @example '/signin'
   */
  path: string;
  /**
   * Name of the page route.
   * @example 'Sign In'
   */
  name: string;
  /**
   * Unique key of the page route.
   * @example 'signin'
   */
  key: string;
  /**
   *  function to construct the path to the page route.
   */
  makePath: (...arguments_: (number | string)[]) => string;
};

export type TAppRoutes = {
  Auth: {
    SignIn: {
      Root: TAppRouteItem;
    };
    SignUp: {
      Root: TAppRouteItem;
    };
    ForgotPassword: {
      Root: TAppRouteItem;
    };
    PasswordReset: {
      Root: TAppRouteItem;
    };
    EmailVerification: {
      Root: TAppRouteItem;
    };
    SelectSubscription: {
      Root: TAppRouteItem;
    };
  };
  App: {
    Dashboard: {
      Root: TAppRouteItem;
    };
    Sales: {
      Customers: TAppRouteItem;
      NewCustomer: TAppRouteItem;
      Estimates: TAppRouteItem;
      Invoices: TAppRouteItem;
      EditCustomer: TAppRouteItem;
    };
    Purchases: {
      VendorsRoot: TAppRouteItem;
      VendorsAdd: TAppRouteItem;
      VendorsEdit: TAppRouteItem;
    };
    Categories: {
      Root: TAppRouteItem;
    };
    ProductsAndServices: {
      Root: TAppRouteItem;
      NewProduct: TAppRouteItem;
      EditProduct: TAppRouteItem;
    };
    Users: {
      Root: TAppRouteItem;
      Edit: TAppRouteItem;
      Add: TAppRouteItem;
    };
    Tax: {
      Root: TAppRouteItem;
      NewTax: TAppRouteItem;
      EditTax: TAppRouteItem;
    };
    BillingSubscription: {
      Root: TAppRouteItem;
      PaymentInvoices: TAppRouteItem;
    };
    PaymentSettings: {
      Root: TAppRouteItem;
    };
    BusinessSettings: {
      Root: TAppRouteItem;
    };
    MyAccount: {
      Root: TAppRouteItem;
    };
    AdminUsers: {
      Root: TAppRouteItem;
    };
    AdminSettings: {
      Preferences: TAppRouteItem;
      BusinessCategories: TAppRouteItem;
      PaymentSettings: TAppRouteItem;
      Discount: TAppRouteItem;
    };
    PricingPackages: {
      Root: TAppRouteItem;
      Edit: TAppRouteItem;
    };
    BillingAndSubscriptions: {
      Root: TAppRouteItem;
      PaymentInvoices: TAppRouteItem;
    };
  };
};

export type TSidebarMenuItem = {
  name: string;
  url: string;
  internalLinks?: {
    name: string;
    url: string;
  }[];
  icon?: React.FunctionComponent;
};

export type TSubscriptionPeriod = ValueOf<typeof SubscriptionPeriod>;
export type TSubscriptionType = ValueOf<typeof SubscriptionType>;

export type TModal = {
  opened: boolean;
  close: () => void;
  children?: ReactNode;
  headerText?: string;
  buttonText?: string;
  handleButtonClick?: () => void;
};

export type TLayout = {
  isAdmin?: boolean;
};

export type TTable<T> = {
  table: Table<T>;
};

export type TModalForm = {
  /**
   * Callback that is called when the form is submitted successfully.
   */
  onSubmitSuccess?: () => void;
  /**
   * Callback that is called when the form is submitted with an error.
   */
  onSubmitError?: (error: string) => void;
};
