import { CHECKMARK, CHEVRON_LEFT } from "../../assets/icons";
import { AppRoute } from "../../constants/routes.ts";
import { SubscriptionType } from "../../constants/subscription.ts";
import { ActionIcon, Divider, Flex, Group, Stack, Tabs } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Text, Button, Checkbox } from "../../ui-kit";
import { IconTrash } from "@tabler/icons-react";
import { TSubscriptionType } from "../../types";
import { SubscriptionCard } from "../Subscription/components/SubscriptionCard";
import { PaymentStatus } from "./styles.ts";
import * as Styled from "./styles.ts";

export const BillingSubscription = () => {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState<TSubscriptionType>(SubscriptionType.BASIC);

  const goBack = () => {
    navigate(AppRoute.App.Dashboard.Root.path);
  };

  return (
    <Stack gap={24}>
      <Group pl={24} justify="space-between">
        <Flex gap={10} align="center" style={{ cursor: "pointer" }} onClick={goBack}>
          <CHEVRON_LEFT />
          <Text fw="700" size="18px">
            Billing & Subscriptions
          </Text>
        </Flex>
        <Button variant="outlined" onClick={() => navigate(AppRoute.App.BillingAndSubscriptions.PaymentInvoices.path)}>
          View Payment Invoices
        </Button>
      </Group>

      <Styled.Wrapper>
        <Stack gap={16}>
          <Group justify="space-between" align="center">
            <Text size="28px" fw={700} c="var(--text-secondary)">
              Standard Plan
            </Text>
            <ActionIcon
              color="var(--red)"
              variant="transparent"
              w="fit-content"
              onClick={() =>
                openContextModal({
                  modal: "confirmModal",
                  innerProps: {
                    title: "Are you sure you want to delete this subscription plan?",
                    modalBody:
                      "This action is irreversible and will permanently remove the subscription plan. Review the consequences before confirming.",
                  },
                })
              }
            >
              <Group align="center" gap={6}>
                <IconTrash />
                <Text fw={600}>Cancel Plan</Text>
              </Group>
            </ActionIcon>
          </Group>
          <Stack gap={12}>
            <Group gap={8}>
              <Text size="14px">Payment status:</Text>
              <PaymentStatus isVerified>
                <CHECKMARK />
                <Text size="14px" fw={600}>
                  Verified
                </Text>
              </PaymentStatus>
            </Group>
            <Checkbox label="Set Up automatic payments." size="sm" />
          </Stack>
          <Divider />
          <Group gap={80}>
            <Stack gap={11}>
              <Text size="16px" c="var(--text-secondary)">
                Price
              </Text>
            </Stack>
            <Stack gap={11}>
              <Text size="16px" c="var(--text-secondary)">
                Billing Frequency
              </Text>
            </Stack>
            <Stack gap={11}>
              <Text size="16px" c="var(--text-secondary)">
                Next Billing
              </Text>
            </Stack>
          </Group>
        </Stack>
      </Styled.Wrapper>
      <Styled.Wrapper>
        <Flex direction="column" align="center" gap={72}>
          <Styled.Tabs keepMounted={false} defaultValue="month">
            <Tabs.List>
              <Tabs.Tab value="month">Monthly</Tabs.Tab>
              <Tabs.Tab value="year">Yearly </Tabs.Tab>
            </Tabs.List>
          </Styled.Tabs>
          <Flex gap="24px">
            <SubscriptionCard
              onPlanSelectClick={setSelectedPlan}
              type={SubscriptionType.BASIC}
              selected={selectedPlan === SubscriptionType.BASIC}
            />
            <SubscriptionCard
              onPlanSelectClick={setSelectedPlan}
              type={SubscriptionType.STANDARD}
              selected={selectedPlan === SubscriptionType.STANDARD}
            />
            <SubscriptionCard
              onPlanSelectClick={setSelectedPlan}
              type={SubscriptionType.PREMIUM}
              selected={selectedPlan === SubscriptionType.PREMIUM}
            />
          </Flex>
        </Flex>
      </Styled.Wrapper>
    </Stack>
  );
};
