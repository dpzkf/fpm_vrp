import { Flex } from "@mantine/core";
import { Checkbox, InputWithVerticalLabel } from "../../../../ui-kit";

import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";

import type * as z from "zod";
import { taxFormSchema } from "./schema";

import * as Styled from "../styles";

type TTaxFormProps = {
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
  form: UseFormReturn<z.infer<typeof taxFormSchema>>;
};

export const TaxForm: React.FC<TTaxFormProps> = (props) => {
  const { form } = props;

  return (
    <Styled.Form>
      <Flex w="100%" gap={28} direction="column">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel required fullWidth label="Tax Name" {...field} error={error?.message} />
          )}
        />
        <Controller
          name="rate"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel
              fullWidth
              required
              type="number"
              label="Tax Rate"
              {...field}
              rightSection={<Styled.TaxRightSection>%</Styled.TaxRightSection>}
              error={error?.message}
              onChange={(event) => {
                const value = event.target.value !== "" ? parseInt(event.target.value) : undefined;
                field.onChange(value);
              }}
            />
          )}
        />
        <Controller
          name="taxNumber"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel fullWidth type="number" label="Tax Number / ID" {...field} error={error?.message} />
          )}
        />
        <Controller
          name="details"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel fullWidth label="Tax Details" {...field} error={error?.message} />
          )}
        />
        <Controller
          name="isNameShownInInvoice"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Checkbox
              label="Show the Tax name in invoices"
              onChange={field.onChange}
              checked={field.value}
              error={error?.message}
            />
          )}
        />
      </Flex>
    </Styled.Form>
  );
};
