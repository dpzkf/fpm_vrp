export const LocalStorageKey = {
  Auth: {
    ResetPassword: {
      Email: "ib:auth:email",
    },
    EmailVerification: {
      Email: "ib:auth:verify:email",
    },
  },
  Countdown: {
    ResetPassword: "ib:countdown:reset-password",
    Email: "ib:countdown:email",
  },
} as const;
