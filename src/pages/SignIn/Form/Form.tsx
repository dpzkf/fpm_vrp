import { Flex } from "@mantine/core";
import { Input, InputPassword, Checkbox, Button, Text } from "../../../ui-kit";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type * as z from "zod";
import { useLoginMutation } from "../../../app/modules/auth/authApi.ts";
import { signInFormSchema } from "./schema";
import { useNavigate } from "react-router-dom";

import * as Styled from "../styles";

import { AppRoute } from "../../../constants/routes";

type TSignInFormProps = {
  /**
   * Callback that is called when the form is submitted successfully.
   */
  onSubmitSuccess?: () => void;
  /**
   * Callback that is called when the form is submitted with an error.
   */
  onSubmitError?: (error: string) => void;
};

export const SignInForm: React.FC<TSignInFormProps> = () => {
  const [loginUser] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signInFormSchema>) => {
    // console.log("values = ", values);
    loginUser(values)
      .unwrap()
      .then(() => navigate(AppRoute.App.Dashboard.Root.path, { replace: true }))
      .catch((error) => console.log(error.data));
  };

  return (
    <>
      <Flex w="100%" gap={28} direction="column">
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
      <Flex justify="space-between" align="center" w="100%">
        <Checkbox label={<Text>Remember Me</Text>} />
        <Styled.Link to={AppRoute.Auth.ForgotPassword.Root.path}>Forgot Your Password?</Styled.Link>
      </Flex>
      <Button disabled={!form.formState.isValid} w="100%" fullWidth onClick={form.handleSubmit(onSubmit)}>
        Sign In
      </Button>
    </>
  );
};
