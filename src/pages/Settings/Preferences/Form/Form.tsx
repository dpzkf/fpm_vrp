import { Divider, Flex, Group, Stack } from "@mantine/core";
import { Button } from "../../../../ui-kit/interactive/Button";
import { SwitchWithVerticalLabel } from "../../../../ui-kit/interactive/SwitchWithVerticalLabel";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { preferencesFormSchema } from "./schema.ts";

export const Form = () => {
  const form = useForm<z.infer<typeof preferencesFormSchema>>({
    resolver: zodResolver(preferencesFormSchema),
    mode: "onChange",
    defaultValues: {
      deleteInvoice: false,
      discount: false,
      emailVerification: false,
      enablePayment: false,
      registrationSystem: false,
    },
  });

  const onSubmit = (values: z.infer<typeof preferencesFormSchema>) => {
    console.log("values = ", values);
  };
  return (
    <Flex w="100%" gap={24} direction="column" bg="var(--white)" style={{ borderRadius: "var(--rounded-s)" }}>
      <Flex w="100%" gap={32} p={24} direction="column">
        <Controller
          control={form.control}
          name="registrationSystem"
          render={({ field, fieldState: { error } }) => (
            <SwitchWithVerticalLabel
              label="Registration System"
              description="Enable to allow sign up users to your site."
              error={error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={form.control}
          name="emailVerification"
          render={({ field, fieldState: { error } }) => (
            <SwitchWithVerticalLabel
              label="Email Verification"
              description="Enable to allow email verification for registered users."
              error={error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={form.control}
          name="enablePayment"
          render={({ field, fieldState: { error } }) => (
            <SwitchWithVerticalLabel
              label="Enable Payment"
              description={
                <span>
                  Enable Payment = Your users need to complete their payment for access all features
                  <br />
                  Disable Payment = Your users will access all features without completing payments.
                </span>
              }
              error={error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={form.control}
          name="deleteInvoice"
          render={({ field, fieldState: { error } }) => (
            <SwitchWithVerticalLabel
              label="Delete Invoice"
              description="Enable to allow delete invoice in user business."
              error={error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={form.control}
          name="discount"
          render={({ field, fieldState: { error } }) => (
            <SwitchWithVerticalLabel
              label="Discount"
              description="Enable to active discount system."
              error={error?.message}
              {...field}
            />
          )}
        />
      </Flex>

      <Stack h="100%" w="100%" justify="end">
        <Divider w="100%" />
        <Group w="100%" justify="end" p={24}>
          <Button
            w="10%"
            miw={106}
            variant="secondary"
            fullWidth
            onClick={() => {
              form.reset();
            }}
          >
            Cancel
          </Button>
          <Button w="10%" miw={106} fullWidth disabled={!form.formState.isDirty} onClick={form.handleSubmit(onSubmit)}>
            Save changes
          </Button>
        </Group>
      </Stack>
    </Flex>
  );
};
