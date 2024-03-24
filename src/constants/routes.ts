import { TAppRoutes } from "../types";

export const AppRoute: TAppRoutes = {
  Auth: {
    SignIn: {
      Root: {
        path: "/signin",
        name: "Sign In",
        key: "signin",
        makePath: () => "/signin",
      },
    },
    SignUp: {
      Root: {
        path: "/signup",
        name: "Sign Up",
        key: "signup",
        makePath: () => "/signup",
      },
    },
    ForgotPassword: {
      Root: {
        path: "/forgot-password",
        name: "Forgot password",
        key: "forgotpassword",
        makePath: () => "/forgot-password",
      },
    },
    PasswordReset: {
      Root: {
        path: "/password-reset",
        name: "Password reset",
        key: "passwordreset",
        makePath: () => "/password-reset",
      },
    },
    EmailVerification: {
      Root: {
        path: "/email-verification",
        name: "Email verification",
        key: "emailverefication",
        makePath: () => "/email-verification",
      },
    },
    SelectSubscription: {
      Root: {
        path: "/select-subscription",
        name: "Select subscription",
        key: "selectsubscription",
        makePath: () => "/select-subscription",
      },
    },
  },
  App: {
    Dashboard: {
      Root: {
        name: "Dashboard",
        path: "/",
        key: "dashboard",
        makePath: () => "/",
      },
    },
    Users: {
      Root: {
        name: "Users",
        path: "/users",
        key: "users",
        makePath: () => "/users",
      },
      Edit: {
        path: "/users/edit/:userId",
        name: "Users",
        key: "user-edit",
        makePath: (userId: number | string) => `/users/edit/${userId}`,
      },
      Add: {
        path: "/users/add",
        name: "Users",
        key: "user-add",
        makePath: () => "/users/add",
      },
    },
    Tax: {
      Root: { name: "Tax", path: "/tax", key: "tax", makePath: () => "/tax" },
      NewTax: { name: "Tax", path: "/tax/new", key: "newTax", makePath: () => "/tax/new" },
      EditTax: {
        name: "Tax",
        path: "/tax/edit/:taxId",
        key: "editTax",
        makePath: (taxId: number | string) => `/tax/edit/${taxId}`,
      },
    },
    Categories: {
      Root: { name: "Categories", path: "/categories", key: "categories", makePath: () => "/categories" },
    },
    Sales: {
      Customers: {
        name: "Customers",
        path: "/sales/customers",
        key: "customers",
        makePath: () => "/sales/customers",
      },
      NewCustomer: {
        name: "Customers",
        path: "/sales/customers/new",
        key: "new-customers",
        makePath: () => "/sales/customers/new",
      },
      Estimates: {
        name: "Estimates",
        path: "/sales/estimates",
        key: "estimates",
        makePath: () => "/sales/estimates",
      },
      Invoices: {
        name: "Invoices",
        path: "/sales/invoices",
        key: "invoices",
        makePath: () => "/sales/invoices",
      },
      EditCustomer: {
        name: "Customers",
        path: "/sales/customers/edit/:customerId",
        key: "edit-customers",
        makePath: (customerId: number | string) => `/sales/customers/edit/${customerId}`,
      },
    },
    Purchases: {
      VendorsRoot: {
        name: "Vendors",
        path: "/purchases/vendors",
        key: "vendors",
        makePath: () => "/purchases/vendors",
      },
      VendorsEdit: {
        name: "Vendors",
        path: "/purchases/vendors/edit/:vendorId",
        key: "vendor-edit",
        makePath: (vendorId: number | string) => `/purchases/vendors/edit/${vendorId}`,
      },
      VendorsAdd: {
        name: "Vendors",
        path: "/purchases/vendors/add",
        key: "vendor-add",
        makePath: () => "/purchases/vendors/add",
      },
    },
    ProductsAndServices: {
      Root: {
        name: "Product and Services",
        path: "/products-and-services",
        key: "products-and-services",
        makePath: () => `/products-and-services`,
      },
      NewProduct: {
        name: "Product and Services",
        path: "/products-and-services/new",
        key: "new-product",
        makePath: () => `/products-and-services/new`,
      },
      EditProduct: {
        name: "Product and Services",
        path: "/products-and-services/edit/:productId",
        key: "edit-product",
        makePath: (productId: number | string) => `/products-and-services/edit/${productId}`,
      },
    },
    BillingSubscription: {
      Root: {
        name: "Billing Subscription",
        path: "/billing-subscriptions",
        key: "billing-subscription",
        makePath: () => "/billing-subscriptions",
      },
      PaymentInvoices: {
        name: "Billing Subscription",
        path: "/billing-subscriptions/payment-invoices",
        key: "billing-subscription-payment-invoices",
        makePath: () => "/billing-subscriptions/payment-invoices",
      },
    },
    BusinessSettings: {
      Root: {
        name: "Business Settings",
        path: "/business-settings",
        key: "businesssettings",
        makePath: () => "/business-settings",
      },
    },
    PaymentSettings: {
      Root: {
        name: "Payment Settings",
        path: "/payment-settings",
        key: "paymentsettings",
        makePath: () => "/payment-settings",
      },
    },
    MyAccount: {
      Root: {
        name: "Profile Settings",
        path: "/account-profile",
        key: "accountprofile",
        makePath: () => "/account-profile",
      },
    },
    AdminUsers: {
      Root: {
        name: "Users",
        path: "/admin-users",
        key: "admin-users",
        makePath: () => "/admin-users",
      },
    },
    AdminSettings: {
      Preferences: {
        name: "Preferences",
        path: "/settings/admin-preferences",
        key: "admin-preferences",
        makePath: () => "/settings/admin-preferences",
      },
      BusinessCategories: {
        name: "Business Categories",
        path: "/settings/business-categories",
        key: "business-categories",
        makePath: () => "/settings/business-categories",
      },
      PaymentSettings: {
        name: "Payment Settings",
        path: "/settings/payment-settings",
        key: "payment-settings",
        makePath: () => "/settings/payment-settings",
      },
      Discount: {
        name: "Discount",
        path: "/settings/discount",
        key: "discount",
        makePath: () => "/settings/discount",
      }
    },
    PricingPackages: {
      Root: {
        name: "Pricing Packages",
        path: "/pricing-packages",
        key: "pricing-packages",
        makePath: () => "/pricing-packages",
      },
      Edit: {
        name: "Pricing Packages",
        path: "/pricing-packages/edit/:id",
        key: "edit-pricing-packages",
        makePath: (packageId: number | string) => `/pricing-packages/edit/${packageId}`,
      },
    },
    BillingAndSubscriptions: {
      Root: {
        name: "Billing & Subscriptions",
        path: "/billing-subscriptions",
        key: "billing-subscriptions",
        makePath: () => `/billing-subscriptions`,
      },
      PaymentInvoices: {
        name: "Billing & Subscriptions",
        path: "/billing-subscriptions/payment-invoices",
        key: "billing-subscriptions-payment-invoices",
        makePath: () => `/billing-subscriptions/payment-invoices`,
      },
    },
  },
} as const;
