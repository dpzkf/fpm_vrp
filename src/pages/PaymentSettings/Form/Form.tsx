import { AppRoute } from "../../../constants/routes.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Grid, Group, Stack } from "@mantine/core";
import { Button, InputWithVerticalLabel, Text, SwitchWithVerticalLabel } from "../../../ui-kit";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import * as Styled from "../styles.ts";
import { paymentSettingsSchema } from "./schema.ts";

export const Form = () => {
  const form = useForm<z.infer<typeof paymentSettingsSchema>>({
    resolver: zodResolver(paymentSettingsSchema),
    mode: "onChange",
    defaultValues: { isStripeEnabled: false, isPaypalEnabled: false },
  });
  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof paymentSettingsSchema>) => {
    console.log("values = ", values);
  };

  const onCancelClick = () => {
    navigate(AppRoute.App.Dashboard.Root.path);
  };

  return (
    <Styled.Wrapper gap={24}>
      <Stack p={24} gap={24}>
        <Grid>
          <Grid.Col span={6}>
            <Stack gap={24} maw={552}>
              <Controller
                control={form.control}
                name="isStripeEnabled"
                render={({ field, fieldState: { error } }) => (
                  <SwitchWithVerticalLabel
                    label={
                      <Text size="18px" fw={700}>
                        Stripe Payment
                      </Text>
                    }
                    error={error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="publishKey"
                disabled={!form.watch("isStripeEnabled")}
                render={({ field, fieldState: { error } }) => (
                  <InputWithVerticalLabel
                    fullWidth
                    required
                    label="Publish Key"
                    placeholder="Enter key"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="secretKey"
                disabled={!form.watch("isStripeEnabled")}
                render={({ field, fieldState: { error } }) => (
                  <InputWithVerticalLabel
                    fullWidth
                    required
                    label="Secret Key"
                    placeholder="Enter key"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
            </Stack>
          </Grid.Col>
        </Grid>
        <Divider />
        <Grid>
          <Grid.Col span={6}>
            <Stack gap={24} maw={552}>
              <Controller
                control={form.control}
                name="isPaypalEnabled"
                render={({ field, fieldState: { error } }) => (
                  <SwitchWithVerticalLabel
                    label={
                      <Text size="18px" fw={700}>
                        PayPal Payment
                      </Text>
                    }
                    error={error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="paypalMode"
                disabled={!form.watch("isPaypalEnabled")}
                render={({ field, fieldState: { error } }) => (
                  <InputWithVerticalLabel
                    fullWidth
                    required
                    label="PayPal Mode"
                    placeholder="Select mode"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="paypalAccount"
                disabled={!form.watch("isPaypalEnabled")}
                render={({ field, fieldState: { error } }) => (
                  <InputWithVerticalLabel
                    fullWidth
                    required
                    label="PayPal Merchant Account*"
                    placeholder="Enter account"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>

      <Stack h="100%" w="100%" justify="end">
        <Divider />
        <Group w="100%" justify="end" p={24}>
          <Button w="10%" miw={106} variant="secondary" fullWidth onClick={onCancelClick}>
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
    </Styled.Wrapper>
  );
};
