import { Flex, Text } from "@mantine/core";
import { Checkbox, InputWithVerticalLabel, Textarea, Selectbox } from "../../../../ui-kit";

import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";

import type * as z from "zod";
import { productFormSchema } from "./schema";

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
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
};

export const ProductForm: React.FC<TTaxFormProps> = (props) => {
  const { form } = props;

  return (
    <Styled.Form>
      <Flex w="100%" gap={28} direction="column">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel
              placeholder="Enter product name"
              required
              fullWidth
              label="Product Name"
              {...field}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="price"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel
              placeholder="Enter product price"
              fullWidth
              required
              type="number"
              label="Price"
              {...field}
              rightSection={<Styled.TaxRightSection>$</Styled.TaxRightSection>}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="quantity"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel
              placeholder="Enter product quantity"
              fullWidth
              type="number"
              label="Quantity"
              {...field}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="category"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Selectbox
              data={["category 1", "category 2", "category 3", "category 4"]}
              label="Category"
              placeholder="Select or add category"
              {...field}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="productDetails"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Textarea placeholder="Type here..." label="Product Details" {...field} error={error?.message} />
          )}
        />
        <Controller
          name="isAddForSales"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Checkbox
              label={
                <Text size="16px" fw={500}>
                  Add product for Sales
                </Text>
              }
              ref={field.ref}
              onChange={field.onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="isAddForPurchases"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Checkbox
              label={
                <Text size="16px" fw={500}>
                  Add product for Purchases
                </Text>
              }
              ref={field.ref}
              onChange={field.onChange}
              error={error?.message}
            />
          )}
        />
      </Flex>
    </Styled.Form>
  );
};
