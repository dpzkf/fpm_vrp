import { Flex, Stack } from "@mantine/core";
import { InputWithVerticalLabel } from "../../../../ui-kit";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

import type * as z from "zod";
import { TModalForm } from "../../../../types";
import { businessCategoryFormSchema } from "./schema";

type TBusinessCategoryFormProps = TModalForm & {
  /**
   * form object with resolver
   */
  form: UseFormReturn<z.infer<typeof businessCategoryFormSchema>>;
};

export const AddBusinessCategoryForm: React.FC<TBusinessCategoryFormProps> = (props) => {
  const { form } = props;

  return (
    <Stack>
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
      </Flex>
    </Stack>
  );
};
