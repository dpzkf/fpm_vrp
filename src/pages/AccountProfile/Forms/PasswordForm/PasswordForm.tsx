import { Box, Flex } from "@mantine/core";
import { InputPassword, Button } from "../../../../ui-kit";

import { Controller } from "react-hook-form";
import { useToggle } from "@mantine/hooks";

import type { UseFormReturn } from "react-hook-form";

import type * as z from "zod";
import { changePasswordSchema } from "./schema";

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
  form: UseFormReturn<z.infer<typeof changePasswordSchema>>;
};

export const PasswordForm: React.FC<TSignInFormProps> = (props) => {
  const { form } = props;
  const [isPasswordChanging, toggle] = useToggle();

  const toggleChangePassword = () => {
    form.reset();
    toggle();
  };

  return (
    <Box maw="552px">
      {isPasswordChanging ? (
        <Flex w="100%" gap={28} direction="column">
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState: { error } }) => (
              <InputPassword fullWidth label="Enter current password" {...field} error={error?.message} />
            )}
          />
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState: { error } }) => (
              <InputPassword fullWidth label="Enter new password" {...field} error={error?.message} />
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState: { error } }) => (
              <InputPassword fullWidth label="Confirm new password" {...field} error={error?.message} />
            )}
          />
        </Flex>
      ) : (
        <InputPassword fullWidth label="Password" value="********" disabled />
      )}
      <Button variant="text" onClick={toggleChangePassword} mt={28}>
        {isPasswordChanging ? "Cancel" : "Change password"}
      </Button>
    </Box>
  );
};
