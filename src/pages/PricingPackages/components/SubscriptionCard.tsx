import { AppRoute } from "../../../constants/routes.ts";

import { useNavigate } from "react-router-dom";

import { IconEdit } from "@tabler/icons-react";
import { SvgIcon } from "../../../ui-kit/common/SvgIcon";
import { Button } from "../../../ui-kit/interactive/Button";
import { Switch } from "../../../ui-kit/interactive/Switch";
import { Text } from "../../../ui-kit/typography/Text";
import { CHECK_ICON } from "../../../assets/icons";
import { Flex, Group, Stack } from "@mantine/core";
import * as Styled from "../styles.ts";

export const SubscriptionCard = () => {
  const navigate = useNavigate();
  return (
    <Stack gap={16} maw={344}>
      <Group align="center" justify="space-between">
        <Text size="12px" fw={600}>
          Show to Users
        </Text>
        <Switch />
      </Group>
      <Styled.CardContainer>
        <Flex direction="column" gap="20px">
          <Flex direction="column" gap="8px">
            <Text size="28px" fw="700">
              Basic
            </Text>
            <Text size="14px" fw="500">
              Perfect choice for those getting started with efficient invoicing.
            </Text>
          </Flex>
          <Flex direction="column" align="center">
            <Text fw="700" size="44px" color="var(--blue-700)">
              $35
            </Text>
            <Text fw="600">/month</Text>
          </Flex>
          <Flex direction="column" gap="24px">
            <Flex gap="8px">
              <SvgIcon component={CHECK_ICON} />
              <Text>Unlimited Invoices</Text>
            </Flex>
            <Flex gap="8px">
              <SvgIcon component={CHECK_ICON} />
              <Text>Unlimited Invoices</Text>
            </Flex>
            <Flex gap="8px">
              <SvgIcon component={CHECK_ICON} />
              <Text>Unlimited Invoices</Text>
            </Flex>
            <Flex gap="8px">
              <SvgIcon component={CHECK_ICON} />
              <Text>Unlimited Invoices</Text>
            </Flex>
            <Flex gap="8px">
              <SvgIcon component={CHECK_ICON} />
              <Text>Unlimited Invoices</Text>
            </Flex>
            <Flex gap="8px">
              <SvgIcon component={CHECK_ICON} />
              <Text>Unlimited Invoices</Text>
            </Flex>
          </Flex>
        </Flex>
      </Styled.CardContainer>
      <Button leftSection={<IconEdit />} onClick={() => navigate(AppRoute.App.PricingPackages.Edit.makePath(1))}>
        Edit information
      </Button>
    </Stack>
  );
};
