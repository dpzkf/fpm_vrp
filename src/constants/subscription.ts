export const SubscriptionPeriod = {
  FREE: "Free",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
} as const;

export const SubscriptionType = {
  BASIC: "Basic",
  STANDARD: "Standard",
  PREMIUM: "Premium",
} as const;

export const SubscriptionFeatures = {
  [SubscriptionType.BASIC]: [
    "Unlimited Invoices",
    "2 Estimates",
    "2 Customers",
    "1 Businesses",
    "1 Invoice Templates",
    "Get Invoice Payment via PayPal/Stripe",
    "4 Multi User Roles",
  ],
  [SubscriptionType.STANDARD]: [
    "Unlimited Invoices",
    "40 Estimates",
    "5 Customers",
    "5 Businesses",
    "8 Invoice Templates",
    "Get Invoice Payment via PayPal/Stripe",
    "4 Multi User Roles",
  ],
  [SubscriptionType.PREMIUM]: [
    "Unlimited Invoices",
    "50 Estimates",
    "10 Customers",
    "10 Businesses",
    "8 Invoice Templates",
    "Get Invoice Payment via PayPal/Stripe",
    "10 Multi User Roles",
  ],
} as const;
