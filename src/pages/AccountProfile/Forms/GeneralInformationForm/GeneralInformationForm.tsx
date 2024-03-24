import { Flex, Box } from "@mantine/core";
import { Text, InputWithVerticalLabel } from "../../../../ui-kit";

import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";

import type * as z from "zod";
import { generalInformationSchema } from "./schema";

type TSignInFormProps = {
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
  form: UseFormReturn<z.infer<typeof generalInformationSchema>>;
};

export const GeneralInformationForm: React.FC<TSignInFormProps> = (props) => {
  const { form } = props;

  return (
    <Box maw="552px">
      <Flex w="100%" gap={28} direction="column">
        <Text></Text>
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel required fullWidth label="Full Name" {...field} error={error?.message} />
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel required fullWidth label="E-mail" {...field} error={error?.message} />
          )}
        />
        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel fullWidth label="Address" {...field} error={error?.message} />
          )}
        />
        <Controller
          name="city"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel fullWidth label="City" {...field} error={error?.message} />
          )}
        />
        <Controller
          name="state"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel fullWidth label="State" {...field} error={error?.message} />
          )}
        />
        <Controller
          name="postcode"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputWithVerticalLabel fullWidth label="Postcode" {...field} error={error?.message} />
          )}
        />
      </Flex>
    </Box>
  );
};
