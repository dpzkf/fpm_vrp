import { useState } from "react";

import { Flex, Tabs } from "@mantine/core";
import { SubscriptionCard } from "./components/SubscriptionCard";
import { Text } from "../../ui-kit";

import { SubscriptionType } from "../../constants/subscription";

import { TSubscriptionType } from "../../types";

import * as Styled from "./styles";

export const Subscription = () => {
  // const [planPeriod, setPlanPeriod] = useState<TSubscriptionPeriod>(SubscriptionPeriod.MONTHLY);
  const [selectedPlan, setSelectedPlan] = useState<TSubscriptionType>(SubscriptionType.BASIC);

  return (
    <Flex direction="column" align="center" gap="72px">
      <Flex direction="column" gap="16px" maw={650} align="center">
        <Text fw="700" size="28px">
          Choose the Perfect Plan for You
        </Text>
        <Text ta="center">
          We've crafted subscription plans with your unique needs in mind—whether you're an individual, part of a
          growing team, or an established business.
        </Text>
      </Flex>
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
  );
};
