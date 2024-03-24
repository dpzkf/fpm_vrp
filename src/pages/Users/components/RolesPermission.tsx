import { EAccess } from "../../../app/modules/users/types.ts";
import { ERole } from "../../../constants/userRoles.ts";
import { Checkbox, Stack, Text } from "@mantine/core";
import { FC } from "react";

import { Controller, useFormContext } from "react-hook-form";

type TRolesPermission = {
  role: ERole;
};

export const RolesPermission: FC<TRolesPermission> = ({ role }) => {
  const form = useFormContext();

  if (role === ERole.Admin) {
    return (
      <Text size="14px" c="var(--gray-700)">
        Have full access to all features.
      </Text>
    );
  }

  return (
    <Stack gap={12}>
      <Controller
        name="permissionsConfiguration.CUSTOMERS"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <Checkbox
            style={{ alignSelf: "flex-start" }}
            label={
              <Text size="14px" fw={500} c="var(--gray-700)">
                Access to Customers
              </Text>
            }
            ref={field.ref}
            checked={EAccess.Access === field.value}
            onChange={(event) => {
              const value = event.target.checked ? EAccess.Access : EAccess.NoAccess;
              field.onChange(value);
            }}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="permissionsConfiguration.PRODUCTS"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <Checkbox
            style={{ alignSelf: "flex-start" }}
            label={
              <Text size="14px" fw={500} c="var(--gray-700)">
                Access to Products
              </Text>
            }
            ref={field.ref}
            checked={EAccess.Access === field.value}
            onChange={(event) => {
              const value = event.target.checked ? EAccess.Access : EAccess.NoAccess;
              field.onChange(value);
            }}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="permissionsConfiguration.ESTIMATES"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <Checkbox
            style={{ alignSelf: "flex-start" }}
            label={
              <Text size="14px" fw={500} c="var(--gray-700)">
                Access to Estimates
              </Text>
            }
            ref={field.ref}
            checked={EAccess.Access === field.value}
            onChange={(event) => {
              const value = event.target.checked ? EAccess.Access : EAccess.NoAccess;
              field.onChange(value);
            }}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="permissionsConfiguration.INVOICES"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <Checkbox
            style={{ alignSelf: "flex-start" }}
            label={
              <Text size="14px" fw={500} c="var(--gray-700)">
                Access to Invoices
              </Text>
            }
            ref={field.ref}
            checked={EAccess.Access === field.value}
            onChange={(event) => {
              const value = event.target.checked ? EAccess.Access : EAccess.NoAccess;
              field.onChange(value);
            }}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="permissionsConfiguration.EXPENSES"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <Checkbox
            style={{ alignSelf: "flex-start" }}
            label={
              <Text size="14px" fw={500} c="var(--gray-700)">
                Access to Expenses
              </Text>
            }
            ref={field.ref}
            checked={EAccess.Access === field.value}
            onChange={(event) => {
              const value = event.target.checked ? EAccess.Access : EAccess.NoAccess;
              field.onChange(value);
            }}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="permissionsConfiguration.BILLS"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <Checkbox
            style={{ alignSelf: "flex-start" }}
            label={
              <Text size="14px" fw={500} c="var(--gray-700)">
                Access to Bills
              </Text>
            }
            ref={field.ref}
            checked={EAccess.Access === field.value}
            onChange={(event) => {
              const value = event.target.checked ? EAccess.Access : EAccess.NoAccess;
              field.onChange(value);
            }}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="permissionsConfiguration.REPORTS"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <Checkbox
            style={{ alignSelf: "flex-start" }}
            label={
              <Text size="14px" fw={500} c="var(--gray-700)">
                Access to Reports
              </Text>
            }
            ref={field.ref}
            checked={EAccess.Access === field.value}
            onChange={(event) => {
              const value = event.target.checked ? EAccess.Access : EAccess.NoAccess;
              field.onChange(value);
            }}
            error={error?.message}
          />
        )}
      />
    </Stack>
  );
};
