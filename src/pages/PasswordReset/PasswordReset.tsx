import { Text, Logo } from "../../ui-kit";
import { Flex } from "@mantine/core";
import { ResetPasswordForm } from "./Form";

import * as Styled from "./styles";

export const PasswordReset = () => {
  return (
    <Styled.Wrapper direction="column" align="center" gap={32}>
      <Logo />
      <Flex gap={8} direction="column" align="center">
        <Text size="28px" fw="bold">
          Create new password?
        </Text>
        <Text ta="center">Enter a new password for your account.</Text>
      </Flex>
      <ResetPasswordForm />
    </Styled.Wrapper>
  );
};
