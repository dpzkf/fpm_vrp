import { Text, Logo } from "../../ui-kit";
import { Flex } from "@mantine/core";
import { SignUpForm } from "./Form";

import { useNavigate } from "react-router-dom";
// import { useRegisterMutation } from "@app/modules/auth/authApi";

import * as Styled from "./styles";

import { AppRoute } from "../../constants/routes";

export const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate(AppRoute.Auth.EmailVerification.Root.path, { replace: true });
  };

  return (
    <Styled.Wrapper direction="column" align="center" gap={32}>
      <Logo />
      <Flex gap={8} direction="column" align="center">
        <Text size="28px" fw="bold">
          Create Your Account
        </Text>
        <h2>Please provide your name and email</h2>
      </Flex>
      <SignUpForm onSubmitSuccess={handleSignUp} />
      <Flex gap="6px" align="center">
        <Text>Already have an account?</Text>
        <Styled.Link to={AppRoute.Auth.SignIn.Root.path}>Sign In</Styled.Link>
      </Flex>
    </Styled.Wrapper>
  );
};
