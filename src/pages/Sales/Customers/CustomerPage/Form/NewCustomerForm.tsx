import { Flex } from "@mantine/core";
import { Checkbox, InputWithVerticalLabel } from "../../../../../ui-kit";

import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";

import { useToggle } from "@mantine/hooks";

import type * as z from "zod";
import { newCustomerFormSchema } from "./schema";

import * as Styled from "../styles";

type TNewCustomerFormProps = {
  /**
   * Callback that is called when the form is submitted successfully.
   */
  onSubmitSuccess?: () => void;
  /**
   * Callback that is called when the form is submitted with an error.
   */
  onSubmitError?: (error: string) => void;
  /**
   * form object with resolver
   */
  form: UseFormReturn<z.infer<typeof newCustomerFormSchema>>;
};

export const NewCustomerForm: React.FC<TNewCustomerFormProps> = (props) => {
  const { form } = props;
  const [isAddressSame, toggleAddress] = useToggle([true, false]);

  return (
    <Styled.Form>
      <Flex w="100%" gap={28} direction="column">
        <Controller
          name="customerName"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel required fullWidth label="Customer Name" {...field} error={error?.message} />
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel fullWidth label="E-mail" {...field} error={error?.message} />
          )}
        />
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel fullWidth label="Phone" {...field} error={error?.message} />
          )}
        />
        <Controller
          name="businessNumber"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel fullWidth label="Business Number" {...field} error={error?.message} />
          )}
        />
        <Controller
          name="tax"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel
              rightSection={<Styled.TaxRightSection>%</Styled.TaxRightSection>}
              fullWidth
              label="Tax/VAT"
              {...field}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel fullWidth label="Address" {...field} error={error?.message} />
          )}
        />
        <Checkbox
          checked={isAddressSame}
          label="Address the same as Billing and Shipping"
          onChange={() => toggleAddress()}
        />
        {!isAddressSame && (
          <>
            <Controller
              name="billingAddress"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <InputWithVerticalLabel fullWidth label="Billing Address" {...field} error={error?.message} />
              )}
            />
            <Controller
              name="shippingAddress"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <InputWithVerticalLabel fullWidth label="Shipping Address" {...field} error={error?.message} />
              )}
            />
          </>
        )}
      </Flex>
    </Styled.Form>
  );
};
