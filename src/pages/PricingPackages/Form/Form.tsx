import { CHEVRON_LEFT } from "../../../assets/icons";
import { AppRoute } from "../../../constants/routes.ts";

import { EChoice } from "../../../constants/Choice.ts";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Divider, Grid, Group, Radio, Stack, Flex, Box } from "@mantine/core";

import { Button } from "../../../ui-kit/interactive/Button";

import { InputWithVerticalLabel } from "../../../ui-kit/interactive/InputWithVerticalLabel";
import { NumberInputWithVerticalLabel } from "../../../ui-kit/interactive/NumberInputWithVerticalLabel";
import { RadioGroupWithVerticalLabel } from "../../../ui-kit/interactive/RadioGroupWithVerticalLabel";
import { Text } from "../../../ui-kit/typography/Text";
import { Checkbox } from "../../../ui-kit/interactive/Checkbox";
import * as Styled from "../styles.ts";

import * as z from "zod";
import { packageSchema } from "./schema.ts";

export const PackageForm = () => {
  const form = useForm<z.infer<typeof packageSchema>>({
    resolver: zodResolver(packageSchema),
    mode: "onChange",
    defaultValues: {
      firstFeatureName: "Invoices",
      secondFeatureName: "Estimates",
      thirdFeatureName: "Customers",
      fourthFeatureName: "Invoice templates",
      fifthFeatureName: "Get Invoice Payment Online",
      sixthFeatureName: "Multi User Roles",
    },
  });
  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof packageSchema>) => {
    console.log("values = ", values);
  };

  const goBack = () => {
    navigate(AppRoute.App.PricingPackages.Root.path);
  };

  return (
    <FormProvider {...form}>
      <Box pl={24} pb={24}>
        <Flex gap={10} align="center" style={{ cursor: "pointer" }} onClick={goBack}>
          <CHEVRON_LEFT />
          <Text fw="700" size="18px">
            Edit Pricing Packages
          </Text>
        </Flex>
      </Box>

      <Styled.FormWrapper gap={48}>
        <Stack w="100%" gap={32} p={24}>
          <Stack gap={16}>
            <Text size="16px" fw={700}>
              General information
            </Text>
            <Stack gap={28}>
              <Controller
                control={form.control}
                name="packageName"
                render={({ field, fieldState: { error } }) => (
                  <InputWithVerticalLabel
                    fullWidth
                    required
                    label="Package Name"
                    placeholder="Enter package name"
                    error={error?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                control={form.control}
                name="monthlyPrice"
                render={({ field, fieldState: { error } }) => (
                  <NumberInputWithVerticalLabel
                    fullWidth
                    required
                    label="Monthly Price"
                    placeholder="Enter monthly price"
                    error={error?.message}
                    rightSection={<Styled.TaxRightSection>$</Styled.TaxRightSection>}
                    {...field}
                  />
                )}
              />

              <Controller
                control={form.control}
                name="yearlyPrice"
                render={({ field, fieldState: { error } }) => (
                  <NumberInputWithVerticalLabel
                    fullWidth
                    required
                    label="Yearly Price"
                    placeholder="Enter yearly price"
                    error={error?.message}
                    rightSection={<Styled.TaxRightSection>$</Styled.TaxRightSection>}
                    {...field}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState: { error } }) => (
                  <InputWithVerticalLabel
                    fullWidth
                    required
                    label="Descriptions"
                    placeholder="Enter descriptions"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
            </Stack>
          </Stack>
          <Divider />
          <Stack gap={48}>
            <Stack gap={24}>
              <Text size="24px" fw={700}>
                Subscription Features
              </Text>
              <Stack gap={24}>
                <Controller
                  control={form.control}
                  name="firstFeatureName"
                  render={({ field, fieldState: { error } }) => (
                    <InputWithVerticalLabel
                      fullWidth
                      required
                      label="Features Name"
                      placeholder="Enter Features name"
                      error={error?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name="firstFeatureMonthlyLimit"
                  render={({ field, fieldState: { error } }) => (
                    <NumberInputWithVerticalLabel
                      fullWidth
                      required
                      label="Monthly Limit"
                      placeholder="Enter Monthly limit"
                      error={error?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name="firstFeatureYearlyLimit"
                  render={({ field, fieldState: { error } }) => (
                    <NumberInputWithVerticalLabel
                      fullWidth
                      required
                      label="Yearly Limit"
                      placeholder="Enter Yearly limit"
                      error={error?.message}
                      {...field}
                    />
                  )}
                />
              </Stack>
            </Stack>
            <Stack gap={24}>
              <Controller
                control={form.control}
                name="secondFeatureName"
                render={({ field, fieldState: { error } }) => (
                  <InputWithVerticalLabel
                    fullWidth
                    required
                    label="Features Name"
                    placeholder="Enter Features name"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="secondFeatureMonthlyLimit"
                render={({ field, fieldState: { error } }) => (
                  <NumberInputWithVerticalLabel
                    fullWidth
                    required
                    label="Monthly Limit"
                    placeholder="Enter Monthly limit"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="secondFeatureYearlyLimit"
                render={({ field, fieldState: { error } }) => (
                  <NumberInputWithVerticalLabel
                    fullWidth
                    required
                    label="Yearly Limit"
                    placeholder="Enter Yearly limit"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
            </Stack>
            <Stack gap={24}>
              <Controller
                control={form.control}
                name="thirdFeatureName"
                render={({ field, fieldState: { error } }) => (
                  <InputWithVerticalLabel
                    fullWidth
                    required
                    label="Features Name"
                    placeholder="Enter Features name"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="thirdFeatureMonthlyLimit"
                render={({ field, fieldState: { error } }) => (
                  <NumberInputWithVerticalLabel
                    fullWidth
                    required
                    label="Monthly Limit"
                    placeholder="Enter Monthly limit"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="thirdFeatureYearlyLimit"
                render={({ field, fieldState: { error } }) => (
                  <NumberInputWithVerticalLabel
                    fullWidth
                    required
                    label="Yearly Limit"
                    placeholder="Enter Yearly limit"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
            </Stack>
            <Stack gap={24}>
              <Controller
                control={form.control}
                name="fourthFeatureName"
                render={({ field, fieldState: { error } }) => (
                  <InputWithVerticalLabel
                    fullWidth
                    required
                    label="Features Name"
                    placeholder="Enter Features name"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
              <Stack gap={12}>
                <Controller
                  control={form.control}
                  name="fourthFeatureMonthlyLimit"
                  render={({ field, fieldState: { error } }) => (
                    <NumberInputWithVerticalLabel
                      fullWidth
                      required
                      label="Monthly Limit"
                      placeholder="Enter Monthly limit"
                      error={error?.message}
                      {...field}
                    />
                  )}
                />
                <Grid>
                  <Grid.Col span={4} />
                  <Grid.Col span={8}>
                    <Controller
                      name="fourthIsFeatureMonthlyLimit"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <Checkbox
                          style={{ alignSelf: "flex-start" }}
                          label={
                            <Text size="14px" fw={500} c="var(--gray-700)">
                              Unlimited amount
                            </Text>
                          }
                          ref={field.ref}
                          checked={field.value}
                          onChange={field.onChange}
                          error={error?.message}
                        />
                      )}
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
              <Stack gap={12}>
                <Controller
                  control={form.control}
                  name="fourthFeatureYearlyLimit"
                  render={({ field, fieldState: { error } }) => (
                    <NumberInputWithVerticalLabel
                      fullWidth
                      required
                      label="Yearly Limit"
                      placeholder="Enter Yearly limit"
                      error={error?.message}
                      {...field}
                    />
                  )}
                />
                <Grid>
                  <Grid.Col span={4} />
                  <Grid.Col span={8}>
                    <Controller
                      name="fourthIsFeatureYearlyLimit"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <Checkbox
                          style={{ alignSelf: "flex-start" }}
                          label={
                            <Text size="14px" fw={500} c="var(--gray-700)">
                              Unlimited amount
                            </Text>
                          }
                          ref={field.ref}
                          checked={field.value}
                          onChange={field.onChange}
                          error={error?.message}
                        />
                      )}
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Stack>
            <Stack gap={24}>
              <Controller
                control={form.control}
                name="fifthFeatureName"
                render={({ field, fieldState: { error } }) => (
                  <InputWithVerticalLabel
                    fullWidth
                    required
                    label="Features Name"
                    placeholder="Enter Features name"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="fifthIsFeatureMonthlyLimit"
                render={({ field, fieldState: { error } }) => (
                  <RadioGroupWithVerticalLabel required label="Monthly Limit" error={error?.message} {...field}>
                    <Radio value={EChoice.Yes} label="Yes" />
                    <Radio value={EChoice.No} label="No" />
                  </RadioGroupWithVerticalLabel>
                )}
              />
              <Controller
                control={form.control}
                name="fifthIsFeatureYearlyLimit"
                render={({ field, fieldState: { error } }) => (
                  <RadioGroupWithVerticalLabel required label="Monthly Limit" error={error?.message} {...field}>
                    <Radio value={EChoice.Yes} label="Yes" />
                    <Radio value={EChoice.No} label="No" />
                  </RadioGroupWithVerticalLabel>
                )}
              />
            </Stack>
            <Stack gap={24}>
              <Controller
                control={form.control}
                name="sixthFeatureName"
                render={({ field, fieldState: { error } }) => (
                  <InputWithVerticalLabel
                    fullWidth
                    required
                    label="Features Name"
                    placeholder="Enter Features name"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="sixthFeatureMonthlyLimit"
                render={({ field, fieldState: { error } }) => (
                  <NumberInputWithVerticalLabel
                    fullWidth
                    required
                    label="Monthly Limit"
                    placeholder="Enter Monthly limit"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="sixthFeatureYearlyLimit"
                render={({ field, fieldState: { error } }) => (
                  <NumberInputWithVerticalLabel
                    fullWidth
                    required
                    label="Yearly Limit"
                    placeholder="Enter Yearly limit"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
            </Stack>
          </Stack>
        </Stack>

        <Stack h="100%" w="100%" justify="end">
          <Divider w="100%" />
          <Group w="100%" justify="end" p={24}>
            <Button w="10%" miw={106} variant="secondary" fullWidth onClick={goBack}>
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
      </Styled.FormWrapper>
    </FormProvider>
  );
};
