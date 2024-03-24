import { CHEVRON_LEFT } from "../../../../assets/icons";
import { AppRoute } from "../../../../constants/routes.ts";
import { Text } from "../../../../ui-kit/typography/Text";
import { FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Controller, FormProvider, useForm } from "react-hook-form";

import { Divider, Flex, Group, Stack, Box } from "@mantine/core";

import { Button } from "../../../../ui-kit/interactive/Button";
import { InputWithVerticalLabel } from "../../../../ui-kit/interactive/InputWithVerticalLabel";
import * as Styled from "../styles.ts";

import * as z from "zod";
import { vendorFormSchema } from "./schema.ts";

type TForm = {
  isEdit?: boolean;
  isCreate?: boolean;
};

export const VendorsForm: FC<TForm> = ({ isEdit }) => {
  const form = useForm<z.infer<typeof vendorFormSchema>>({
    resolver: zodResolver(vendorFormSchema),
    mode: "onChange",
    defaultValues: { email: "", name: "", address: "", phone: "" },
  });
  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof vendorFormSchema>) => {
    console.log("values = ", values);
  };

  const goBack = () => {
    navigate(AppRoute.App.Purchases.VendorsRoot.path);
  };

  return (
    <FormProvider {...form}>
      <Box pl={24} pb={24}>
        <Flex gap={10} align="center" style={{ cursor: "pointer" }} onClick={goBack}>
          <CHEVRON_LEFT />
          <Text fw="700" size="18px">
            {isEdit ? "Edit Vendor" : "Add Vendor"}
          </Text>
        </Flex>
      </Box>

      <Styled.FormWrapper gap={40}>
        <Flex w="100%" h="100%" gap={32} p={24} direction="column">
          <Flex w="100%" gap={28} direction="column">
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <InputWithVerticalLabel
                  fullWidth
                  required
                  label="Vendor Name"
                  placeholder="Enter vendor name"
                  error={error?.message}
                  {...field}
                />
              )}
            />

            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <InputWithVerticalLabel
                  fullWidth
                  required
                  label="E-mail"
                  placeholder="Enter vendor email"
                  error={error?.message}
                  {...field}
                />
              )}
            />

            <Controller
              control={form.control}
              name="phone"
              render={({ field, fieldState: { error } }) => (
                <InputWithVerticalLabel
                  fullWidth
                  label="Phone"
                  placeholder="+1 (XXX) XXX-XXXX"
                  error={error?.message}
                  {...field}
                />
              )}
            />

            <Controller
              control={form.control}
              name="address"
              render={({ field, fieldState: { error } }) => (
                <InputWithVerticalLabel
                  fullWidth
                  label="Address"
                  placeholder="Enter street name, street address"
                  error={error?.message}
                  {...field}
                />
              )}
            />

            <Divider />
          </Flex>
        </Flex>

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
