import { Flex, Radio } from "@mantine/core";
import { InputWithVerticalLabel, RadioGroupWithVerticalLabel } from "../../../../ui-kit";

import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";

import type * as z from "zod";
import { categoryFormSchema } from "./schema";

import * as Styled from "../styles";

import { ECategoryType } from "../../../../constants";

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
  form: UseFormReturn<z.infer<typeof categoryFormSchema>>;
};

export const AddCategoryForm: React.FC<TTaxFormProps> = (props) => {
  const { form } = props;

  return (
    <Styled.Form>
      <Flex w="100%" gap={28} direction="column">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel
              placeholder="Enter category name"
              fullWidth
              required
              label="Category Name"
              {...field}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="type"
          render={({ field, fieldState: { error } }) => (
            <RadioGroupWithVerticalLabel label="Category Type" error={error?.message} {...field}>
              <Radio value={ECategoryType.Income} label="Income" />
              <Radio value={ECategoryType.Expense} label="Expense" />
            </RadioGroupWithVerticalLabel>
          )}
        />
      </Flex>
    </Styled.Form>
  );
};
