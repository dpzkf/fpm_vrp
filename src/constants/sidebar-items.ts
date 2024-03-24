import { AppRoute } from "./routes";
import { TSidebarMenuItem } from "../types";

import {
  DASHBOARD_ICON,
  CATEGORIES_ICO,
  SALES_ICO,
  TAX_ICO,
  PAYMENT_SETTINGS_ICO,
  SETTINGS_ICO,
  STAR_ICO,
  USERS_ICO,
  PURCHASE_ICO,
  PRICING_PACKAGES_ICON,
} from "../assets/icons";

const {
  Categories,
  Dashboard,
  Sales,
  Tax,
  Users,
  BillingSubscription,
  BusinessSettings,
  PaymentSettings,
  AdminUsers,
  AdminSettings,
  Purchases,
  ProductsAndServices,
  PricingPackages,
} = AppRoute.App;

export const MENU_ITEMS_MAIN: TSidebarMenuItem[] = [
  {
    name: Dashboard.Root.name,
    url: Dashboard.Root.path,
    icon: DASHBOARD_ICON,
  },
  {
    name: "Sales",
    internalLinks: [
      {
        name: Sales.Customers.name,
        url: Sales.Customers.path,
      },
      {
        name: Sales.Estimates.name,
        url: Sales.Estimates.path,
      },
      {
        name: Sales.Invoices.name,
        url: Sales.Invoices.path,
      },
    ],
    url: "/sales",
    icon: SALES_ICO,
  },
  {
    name: "Purchases",
    internalLinks: [
      {
        name: Purchases.VendorsRoot.name,
        url: Purchases.VendorsRoot.path,
      },
    ],
    url: "/purchases",
    icon: PURCHASE_ICO,
  },
  {
    name: ProductsAndServices.Root.name,
    url: ProductsAndServices.Root.path,
    icon: CATEGORIES_ICO,
  },
  {
    name: Categories.Root.name,
    url: Categories.Root.path,
    icon: CATEGORIES_ICO,
  },
  {
    name: Tax.Root.name,
    url: Tax.Root.path,
    icon: TAX_ICO,
  },
  {
    name: Users.Root.name,
    url: Users.Root.path,
    icon: USERS_ICO,
  },
];

export const MENU_ITEMS_OTHERS: TSidebarMenuItem[] = [
  {
    name: BillingSubscription.Root.name,
    url: BillingSubscription.Root.path,
    icon: STAR_ICO,
  },
  {
    name: BusinessSettings.Root.name,
    url: BusinessSettings.Root.path,
    icon: SETTINGS_ICO,
  },
  {
    name: PaymentSettings.Root.name,
    url: PaymentSettings.Root.path,
    icon: PAYMENT_SETTINGS_ICO,
  },
];

export const MENU_ITEMS_ADMIN: TSidebarMenuItem[] = [
  {
    name: AdminUsers.Root.name,
    url: AdminUsers.Root.path,
    icon: USERS_ICO,
  },
  {
    name: PricingPackages.Root.name,
    url: PricingPackages.Root.path,
    icon: PRICING_PACKAGES_ICON,
  },
];

export const MENU_ITEMS_OTHERS_ADMIN: TSidebarMenuItem[] = [
  {
    name: "Settings",
    internalLinks: [
      {
        name: AdminSettings.Preferences.name,
        url: AdminSettings.Preferences.path,
      },
      {
        name: AdminSettings.PaymentSettings.name,
        url: AdminSettings.PaymentSettings.path,
      },
      {
        name: AdminSettings.Discount.name,
        url: AdminSettings.Discount.path,
      },
      {
        name: AdminSettings.BusinessCategories.name,
        url: AdminSettings.BusinessCategories.path,
      },
    ],
    url: "/settings",
    icon: SETTINGS_ICO,
  },
];
