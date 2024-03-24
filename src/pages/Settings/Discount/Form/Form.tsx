import { AppRoute } from "../../../../constants/routes.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Flex, Group, Stack } from "@mantine/core";
import { Button } from "../../../../ui-kit/interactive/Button";
import { NumberInputWithVerticalLabel, SwitchWithVerticalLabel, Text } from "../../../../ui-kit";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import * as Styled from "../styles.ts";
import { discountFormSchema } from "./schema.ts";

export const Form = () => {
  const form = useForm<z.infer<typeof discountFormSchema>>({
    resolver: zodResolver(discountFormSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof discountFormSchema>) => {
    console.log("values = ", values);
  };

  const onCancelClick = () => {
    navigate(AppRoute.App.Dashboard.Root.path);
  };

  return (
    <Flex w="100%" h="100%" gap={32} p={24} direction="column">
      <Flex w="100%" gap={24} direction="column" maw={552}>
        <Controller
          control={form.control}
          name="isStandardOnSale"
          render={({ field, fieldState: { error } }) => (
            <SwitchWithVerticalLabel
              label={
                <Text size="18px" fw={700}>
                  Discount for Package Standard
                </Text>
              }
              error={error?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={form.control}
          name="standardMonthly"
          disabled={!form.watch("isStandardOnSale")}
          render={({ field, fieldState: { error } }) => (
            <NumberInputWithVerticalLabel
              fullWidth
              label="Monthly"
              placeholder="Enter discount"
              error={error?.message}
              rightSection={<Styled.TaxRightSection>%</Styled.TaxRightSection>}
              {...field}
            />
          )}
        />
        <Controller
          control={form.control}
          name="standardYearly"
          disabled={!form.watch("isStandardOnSale")}
          render={({ field, fieldState: { error } }) => (
            <NumberInputWithVerticalLabel
              fullWidth
              label="Yearly"
              placeholder="Enter discount"
              error={error?.message}
              rightSection={<Styled.TaxRightSection>%</Styled.TaxRightSection>}
              {...field}
            />
          )}
        />
        <Divider />
        <Controller
          control={form.control}
          name="isPremiumOnSale"
          render={({ field, fieldState: { error } }) => (
            <SwitchWithVerticalLabel
              label={
                <Text size="18px" fw={700}>
                  Discount for Package Premium
                </Text>
              }
              error={error?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={form.control}
          name="premiumMonthly"
          disabled={!form.watch("isPremiumOnSale")}
          render={({ field, fieldState: { error } }) => (
            <NumberInputWithVerticalLabel
              fullWidth
              label="Monthly"
              placeholder="Enter discount"
              error={error?.message}
              rightSection={<Styled.TaxRightSection>%</Styled.TaxRightSection>}
              {...field}
            />
          )}
        />
        <Controller
          control={form.control}
          name="premiumYearly"
          disabled={!form.watch("isPremiumOnSale")}
          render={({ field, fieldState: { error } }) => (
            <NumberInputWithVerticalLabel
              fullWidth
              label="Yearly"
              placeholder="Enter discount"
              error={error?.message}
              rightSection={<Styled.TaxRightSection>%</Styled.TaxRightSection>}
              {...field}
            />
          )}
        />
        <Divider />
        <Controller
          control={form.control}
          name="isGoldOnSale"
          render={({ field, fieldState: { error } }) => (
            <SwitchWithVerticalLabel
              label={
                <Text size="18px" fw={700}>
                  Discount for Package Gold
                </Text>
              }
              error={error?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={form.control}
          name="goldMonthly"
          disabled={!form.watch("isGoldOnSale")}
          render={({ field, fieldState: { error } }) => (
            <NumberInputWithVerticalLabel
              fullWidth
              label="Monthly"
              placeholder="Enter discount"
              error={error?.message}
              rightSection={<Styled.TaxRightSection>%</Styled.TaxRightSection>}
              {...field}
            />
          )}
        />
        <Controller
          control={form.control}
          name="goldYearly"
          disabled={!form.watch("isGoldOnSale")}
          render={({ field, fieldState: { error } }) => (
            <NumberInputWithVerticalLabel
              fullWidth
              label="Yearly"
              placeholder="Enter discount"
              error={error?.message}
              rightSection={<Styled.TaxRightSection>%</Styled.TaxRightSection>}
              {...field}
            />
          )}
        />
      </Flex>

      <Stack h="100%" w="100%" justify="end">
        <Divider w="100%" />
        <Group w="100%" justify="end" p={24}>
          <Button w="10%" miw={106} variant="secondary" onClick={onCancelClick} fullWidth>
            Cancel
          </Button>
          <Button
            w="10%"
            miw={106}
            fullWidth
            disabled={!form.formState.isDirty || !form.formState.isValid}
            onClick={form.handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </Group>
      </Stack>
    </Flex>
  );
};
