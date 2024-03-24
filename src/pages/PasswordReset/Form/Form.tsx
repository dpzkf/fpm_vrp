import { Flex } from "@mantine/core";
import { InputPassword, Button } from "../../../ui-kit";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type * as z from "zod";
import { passwordResetSchema } from "./schema";

type TResetPasswordFormProps = {
  /**
   * Callback that is called when the form is submitted successfully.
   */
  onSubmitSuccess?: () => void;
  /**
   * Callback that is called when the form is submitted with an error.
   */
  onSubmitError?: (error: string) => void;
};

export const ResetPasswordForm: React.FC<TResetPasswordFormProps> = () => {
  const form = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    mode: "onChange",
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof passwordResetSchema>) => {
    console.log("values = ", values);
  };

  return (
    <>
      <Flex w="100%" gap={28} direction="column">
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputPassword fullWidth label="Password" {...field} error={error?.message} />
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputPassword fullWidth label="Password" {...field} error={error?.message} />
          )}
        />
      </Flex>
      <Button w="100%" disabled={!form.formState.isValid} fullWidth onClick={form.handleSubmit(onSubmit)}>
        Reset and Log In
      </Button>
    </>
  );
};
