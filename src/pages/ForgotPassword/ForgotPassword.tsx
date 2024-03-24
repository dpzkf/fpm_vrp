import { useMemo } from "react";
//components
import { Input, Button, Text, Logo, SvgIcon } from "../../ui-kit";
import { Flex } from "@mantine/core";
//hooks
import { useToggle, useLocalStorage } from "@mantine/hooks";
import { useStorageCountdown } from "../../hooks/common/useStorageCountdown";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//styles
import * as Styled from "./styles";
//constants
import { AppRoute } from "../../constants/routes";
import { LocalStorageKey } from "../../constants/local-storage";
import { forgotPasswordFormSchema } from "./schema";

import type * as z from "zod";

import { CHEVRON_LEFT } from "../../assets/icons";

export const ForgotPassword = () => {
  const [resetPasswordEmail, setResetPasswordEmail] = useLocalStorage<string | null>({
    key: LocalStorageKey.Auth.ResetPassword.Email,
    defaultValue: null,
  });

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();

  const [isFormSubmitted, toggleFormSubmitted] = useToggle();

  const { isCounting, isReady, startCountdown, time } = useStorageCountdown({
    name: LocalStorageKey.Countdown.ResetPassword,
  });

  const isLinkSentText: boolean = useMemo(
    () => isFormSubmitted || (isCounting && isReady),
    [isFormSubmitted, isCounting, isReady],
  );

  const formSubmitHandler = () => {
    setResetPasswordEmail("emailexample.gmail.com");
    toggleFormSubmitted();
  };

  const sendEmailAgainClickHandler = () => {
    if (!resetPasswordEmail) {
      return;
    }

    startCountdown();
  };

  const backToSignIn = () => {
    navigate(AppRoute.Auth.SignIn.Root.path);
  };

  return (
    <Styled.Wrapper direction="column" align="center" gap={32}>
      <Logo />
      <Flex gap={8} direction="column" align="center">
        <Text size="28px" fw="bold">
          Forgot Your Password?
        </Text>
        {isLinkSentText ? (
          <Text ta="center">
            We sent a link to{" "}
            <Text span fw="600">
              emailexample.gmail.com.
            </Text>{" "}
            Kindly follow that link to reset your password.
          </Text>
        ) : (
          <Text ta="center">
            Ensure your email address is typed-correctly and we’ll send you an email with instructions to reset it.
          </Text>
        )}
      </Flex>
      {isLinkSentText ? (
        <Flex gap="6px" align="center">
          <Text>Didn't get the email?</Text>
          <Button variant="text" disabled={isCounting} onClick={sendEmailAgainClickHandler}>
            Send It Again
          </Button>
          {isCounting && <Text>{time}</Text>}
        </Flex>
      ) : (
        <>
          <Controller
            name="email"
            control={forgotPasswordForm.control}
            render={({ field, fieldState: { error } }) => (
              <Input fullWidth label="Email" {...field} error={error?.message} />
            )}
          />

          <Button disabled={!forgotPasswordForm.formState.isValid} w="100%" fullWidth onClick={formSubmitHandler}>
            Reset Password
          </Button>
        </>
      )}
      <Flex gap={8} onClick={backToSignIn}>
        <SvgIcon color="transparent" component={CHEVRON_LEFT} />
        <Styled.Link to={AppRoute.Auth.SignIn.Root.path}>Back to Sign In</Styled.Link>
      </Flex>
    </Styled.Wrapper>
  );
};
