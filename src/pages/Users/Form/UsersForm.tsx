import { EAccess, TEditUserPayload } from "../../../app/modules/users/types.ts";
import { useCreateUserMutation, useEditUserMutation, useGetUserQuery } from "../../../app/modules/users/usersApi.ts";
import { CHEVRON_LEFT } from "../../../assets/icons";

import { AppRoute } from "../../../constants/routes.ts";

import { ERole } from "../../../constants/userRoles.ts";

import { zodResolver } from "@hookform/resolvers/zod";

import { Box, Divider, Flex, Group, Radio, Stack } from "@mantine/core";
import { Button } from "../../../ui-kit/interactive/Button";
import { InputWithVerticalLabel } from "../../../ui-kit/interactive/InputWithVerticalLabel";
import { RadioGroupWithVerticalLabel } from "../../../ui-kit/interactive/RadioGroupWithVerticalLabel";
import { Text } from "../../../ui-kit/typography/Text";
import { FC, useEffect, useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import * as z from "zod";
import { RolesPermission } from "../components";
import * as Styled from "../styles.ts";
import { userFormSchema } from "./schema.ts";

type TForm = {
  isEdit?: boolean;
  isCreate?: boolean;
};

export const UsersForm: FC<TForm> = ({ isEdit }) => {
  const { userId } = useParams();
  const { data: userData } = useGetUserQuery({ id: userId ?? "" }, { skip: !userId });
  const [createUser] = useCreateUserMutation();
  const [editUser] = useEditUserMutation();

  const defaultValues: TEditUserPayload = useMemo(
    () => ({
      fullName: userData?.fullName ?? "",
      email: userData?.email ?? "",
      role: userData?.email ?? ERole.Admin,
      permissionsTemplate: userData?.permissions.template ?? ERole.Admin,
      permissionsConfiguration: userData?.permissions.configuration ?? {
        CUSTOMERS: EAccess.Access,
        BILLS: EAccess.Access,
        ESTIMATES: EAccess.Access,
        INVOICES: EAccess.Access,
        PRODUCTS: EAccess.Access,
        REPORTS: EAccess.Access,
        EXPENSES: EAccess.Access,
      },
    }),
    [userData],
  );

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
    defaultValues,
  });
  const navigate = useNavigate();

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  const onSubmit = (values: z.infer<typeof userFormSchema>) => {
    console.log("values = ", values);
    if (isEdit && userId) {
      editUser({ id: userId, body: values })
        .unwrap()
        .then(() => {
          navigate(AppRoute.App.Users.Root.path);
        });
    } else {
      createUser({ body: values })
        .unwrap()
        .then(() => {
          navigate(AppRoute.App.Users.Root.path);
        });
    }
  };

  const goBack = () => {
    navigate(AppRoute.App.Users.Root.path);
  };

  return (
    <FormProvider {...form}>
      <Box pl={24} pb={24}>
        <Flex gap={10} align="center" style={{ cursor: "pointer" }} onClick={goBack}>
          <CHEVRON_LEFT />
          <Text fw="700" size="18px">
            {isEdit ? "Edit User" : "Add User"}
          </Text>
        </Flex>
      </Box>

      <Styled.FormWrapper w="100%" gap={40} direction="column">
        <Flex w="100%" h="100%" gap={32} p={24} direction="column">
          <Flex w="100%" gap={28} direction="column">
            <Controller
              control={form.control}
              name="fullName"
              render={({ field, fieldState: { error } }) => (
                <InputWithVerticalLabel
                  fullWidth
                  required
                  label="User Name"
                  placeholder="Enter user name"
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
                  placeholder="Enter e-mail"
                  error={error?.message}
                  {...field}
                />
              )}
            />

            <Controller
              control={form.control}
              name="permissionsTemplate"
              render={({ field, fieldState: { error } }) => (
                <RadioGroupWithVerticalLabel required label="User Role" error={error?.message} {...field}>
                  <Radio value={ERole.Admin} label="Admin" />
                  <Radio value={ERole.Editor} label="Editor" />
                  <Radio value={ERole.Viewer} label="Viewer" />
                </RadioGroupWithVerticalLabel>
              )}
            />

            <Divider />
          </Flex>
          <Stack gap={16} mih={250}>
            <Text size="16px" fw={600} c="var(--black)" tt="capitalize">
              {`${form.watch("permissionsTemplate")} Permissions`}
            </Text>

            <RolesPermission role={form.watch("permissionsTemplate")} />
          </Stack>
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
