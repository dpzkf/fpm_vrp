import { useMemo } from "react";

import { Text, Logo, SvgIcon, Button } from "../../ui-kit";
import { Flex } from "@mantine/core";

import { useLocalStorage } from "@mantine/hooks";
import { useStorageCountdown } from "../../hooks/common/useStorageCountdown";
import { useNavigate } from "react-router-dom";

import * as Styled from "./styles";

import { AppRoute } from "../../constants/routes";
import { LocalStorageKey } from "../../constants/local-storage";

import { CHEVRON_LEFT } from "../../assets/icons";

export const EmailVerification = () => {
  const [registrationEmail] = useLocalStorage({
    key: LocalStorageKey.Auth.EmailVerification.Email,
  });

  const navigate = useNavigate();

  const { isCounting, isReady, startCountdown, time } = useStorageCountdown({
    name: LocalStorageKey.Countdown.Email,
  });

  const isLinkSentText: boolean = useMemo(() => isCounting && isReady, [isCounting, isReady]);

  const handleResend = () => {
    startCountdown();
  };

  const backToSignUp = () => {
    navigate(AppRoute.Auth.SignUp.Root.path);
  };

  return (
    <Styled.Wrapper direction="column" align="center" gap={32}>
      <Logo />
      <Flex gap="24px" direction="column" align="center">
        <Text size="28px" fw="bold">
          Email Verification
        </Text>
        <Text ta="center">
          We sent a verification link to{" "}
          <Text span fw="600">
            {registrationEmail}.
          </Text>{" "}
          Kindly click the link we've sent you to verify your email address.
        </Text>
      </Flex>
      <Flex gap="6px" align="center">
        <Text>Didn't get the email?</Text>
        <Button variant="text" disabled={isCounting} onClick={handleResend}>
          Send It Again
        </Button>
        {isLinkSentText && <Text>{time}</Text>}
      </Flex>
      <Flex gap={8} onClick={backToSignUp}>
        <SvgIcon color="transparent" component={CHEVRON_LEFT} />
        <Styled.Link to={AppRoute.Auth.SignUp.Root.path}>Back to Sign Up</Styled.Link>
      </Flex>
    </Styled.Wrapper>
  );
};
