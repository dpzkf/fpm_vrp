import { Text, Logo } from "../../ui-kit";
import { Flex } from "@mantine/core";
import { SignInForm } from "./Form";

import * as Styled from "./styles";

import { AppRoute } from "../../constants/routes";

export const SignIn = () => {
  return (
    <Styled.Wrapper direction="column" align="center" gap={32}>
      <Logo />
      <Text size="28px" fw="bold">
        Sign In to iBusinessFunding
      </Text>
      <SignInForm />
      <Flex gap="6px" align="center">
        <Text>Don't have an account?</Text>
        <Styled.Link to={AppRoute.Auth.SignUp.Root.path}>Sign Up</Styled.Link>
      </Flex>
    </Styled.Wrapper>
  );
};
