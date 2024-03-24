import { Button, SvgIcon, Text } from "../../../../ui-kit";
// helpers
import { SubscriptionType } from "../../../../constants/subscription";
// types
import type React from "react";
import { TSubscriptionType } from "../../../../types";
// styles
import { Flex } from "@mantine/core";
import * as Styled from "./styles";

import { CHECK_ICON } from "../../../../assets/icons";

type TSubscriptionCardProperties = {
  /**
   * The subscription plan type.
   */
  type: TSubscriptionType;
  /**
   * The subscription plan action button text.
   */
  // buttonLabel: string;
  /**
   * Whether the subscription plan action button should be disabled.
   * @default false
   */
  // disableActionButton?: boolean;
  /**
   * Whether the subscription plan should show "Contact Sales" button.
   * @default false
   */
  // contactSales?: boolean;
  /**
   * The subscription plan description.
   */
  // description: string;
  /**
   * The subscription plan features.
   */
  // features: TSubscriptionFeature[];
  /**
   * The subscription plan name.
   */
  // name: string;
  /**
   * The subscription plan price.
   */
  // price: string;
  /**
   * The subscription period selected by the user.
   */
  // selectedPeriod: TSubscriptionPeriod;
  /**
   * Whether the subscription plan is selected or not.
   * @default false
   */
  selected?: boolean;
  /**
   * The subscription plan action button text when the plan is selected.
   */
  // selectedButtonLabel?: string;
  /**
   * The callback to handle the click on the subscription plan card.
   */
  onPlanSelectClick?: (planType: TSubscriptionType) => void;
  /**
   * The callback to handle the click on the "Choose Plan" button.
   */
  // onChoosePlanClick: (planType: TSubscriptionType) => void;
  /**
   * The callback to handle the click on the "Contact Sales" button.
   */
  // onContactSalesClick?: () => void;
};

export const SubscriptionCard: React.FC<TSubscriptionCardProperties> = (
  props
) => {
  const { selected = false, onPlanSelectClick, type } = props;

  return (
    <>
      <Styled.CardContainer
        selected={selected}
        onClick={() => onPlanSelectClick?.(type)}
      >
        {type === SubscriptionType.STANDARD && (
          <Styled.MostPopular>Most Popular</Styled.MostPopular>
        )}
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
          <Button>Choose Plan</Button>
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
    </>
  );
};
