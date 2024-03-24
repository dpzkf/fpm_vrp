import { useEffect, useMemo, useState } from "react";

import { Flex, Divider } from "@mantine/core";
import { Avatar, FileButton } from "@mantine/core";
import { PasswordForm } from "./Forms/PasswordForm";
import { GeneralInformationForm } from "./Forms/GeneralInformationForm";
import { Button } from "../../ui-kit";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetMeQuery, useEditMeMutation } from "../../app/modules/me/meApi";

import type * as z from "zod";
import { TEditMePayload } from "../../app/modules/me/types";

import { generalInformationSchema } from "./Forms/GeneralInformationForm/schema";
import { changePasswordSchema } from "./Forms/PasswordForm/schema";

import * as Styled from "./styles";

import { PLUS_ICO } from "../../assets/icons";

export const AccountProfile = () => {
  const { data: me } = useGetMeQuery(null);
  const [editMe] = useEditMeMutation();
  const [imgFile, setImageFile] = useState<string | null>(null);

  const defaultValuesGeneral: TEditMePayload = useMemo(
    () => ({
      address: me?.address ?? "",
      city: me?.city ?? "",
      fullName: me?.fullName ?? "",
      email: me?.email ?? "",
      state: me?.state ?? "",
      postcode: me?.postcode ?? "",
    }),
    [me],
  );

  const generalInfoForm = useForm<z.infer<typeof generalInformationSchema>>({
    resolver: zodResolver(generalInformationSchema),
    mode: "onChange",
    defaultValues: defaultValuesGeneral,
  });

  const passwordForm = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onGeneralInfoFormSubmit = (values: z.infer<typeof generalInformationSchema>) => {
    console.log("values = ", values);
    editMe({ body: values });
  };

  const onPasswordFormSubmit = (values: z.infer<typeof changePasswordSchema>) => {
    console.log("values = ", values);
  };

  const handleSaveChanges = () => {
    passwordForm.handleSubmit(onPasswordFormSubmit)();
    generalInfoForm.handleSubmit(onGeneralInfoFormSubmit)();
  };

  const handleCancel = () => {
    passwordForm.reset();
    generalInfoForm.reset();
    setImageFile("");
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageFile(imageUrl);
    }
  };

  useEffect(() => {
    generalInfoForm.reset(defaultValuesGeneral);
  }, [me]);

  return (
    <Styled.Container>
      <Flex gap={16} align="center">
        <Avatar w={72} h={72} src={imgFile}>
          MD
        </Avatar>
        <FileButton onChange={handleFileChange} accept="image/png,image/jpeg">
          {(props) => (
            <Button variant="text" leftSection={<PLUS_ICO />} {...props}>
              Upload image
            </Button>
          )}
        </FileButton>
      </Flex>
      <Divider my={32} />
      <GeneralInformationForm form={generalInfoForm} />
      <Divider my={32} />
      <PasswordForm form={passwordForm} />
      <Divider my={32} />
      <Flex p={24} justify="flex-end" align="center" gap={16}>
        <Button variant="text" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </Flex>
    </Styled.Container>
  );
};
