import { useRegisterMutation } from "../../../app/modules/auth/authApi.ts";
import { AppRoute } from "../../../constants/routes.ts";
import { Flex } from "@mantine/core";
import { Input, InputPassword, Checkbox, Button, Text } from "../../../ui-kit";
import { Link, useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "@mantine/hooks";

import type * as z from "zod";
import { signUpFormSchema } from "./schema";

import { LocalStorageKey } from "../../../constants/local-storage";

type TSignUnFormProps = {
  /**
   * Callback that is called when the form is submitted successfully.
   */
  onSubmitSuccess?: () => void;
  /**
   * Callback that is called when the form is submitted with an error.
   */
  onSubmitError?: (error: string) => void;
};

export const SignUpForm: React.FC<TSignUnFormProps> = (props) => {
  const { onSubmitSuccess } = props;

  const navigate = useNavigate();

  const [_, setRegistrationEmail] = useLocalStorage<string | null>({
    key: LocalStorageKey.Auth.EmailVerification.Email,
    defaultValue: null,
  });

  const [registerUser] = useRegisterMutation();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    mode: "all",
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      termsAgree: false,
    },
  });

  const onSubmit = (values: z.infer<typeof signUpFormSchema>) => {
    registerUser(values)
      .unwrap()
      .then(() => navigate(AppRoute.App.Dashboard.Root.path, { replace: true }))
      .catch((error) => console.log(error.data));

    setRegistrationEmail(values.email);
    onSubmitSuccess?.();
  };

  return (
    <>
      <Flex w="100%" gap={28} direction="column">
        <Controller
          control={form.control}
          name="fullName"
          render={({ field, fieldState: { error } }) => (
            <Input fullWidth label="Full Name" {...field} error={error?.message} />
          )}
        />
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <Input fullWidth label="Email" {...field} error={error?.message} />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <InputPassword fullWidth label="Password" {...field} error={error?.message} />
          )}
        />
      </Flex>
      <Controller
        name="termsAgree"
        control={form.control}
        rules={{ required: "sdfsfd" }}
        render={({ field, fieldState: { error } }) => (
          <Checkbox
            style={{ alignSelf: "flex-start" }}
            label={
              <Text>
                I agree with <Link to="/">Terms of service</Link>
              </Text>
            }
            ref={field.ref}
            onChange={field.onChange}
            error={error?.message}
          />
        )}
      />
      <Button disabled={!form.formState.isValid} fullWidth onClick={form.handleSubmit(onSubmit)}>
        Continue
      </Button>
    </>
  );
};
