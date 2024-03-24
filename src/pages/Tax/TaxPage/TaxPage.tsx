import { Flex, Divider, Box } from "@mantine/core";
import { Button, Text } from "../../../ui-kit";
import { TaxForm } from "./Form";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTaxMutation, useGetTaxQuery, useEditTaxMutation } from "../../../app/modules/taxes/taxesApi";

import type * as z from "zod";

import * as Styled from "./styles";

import { CHEVRON_LEFT } from "../../../assets/icons";
import { taxFormSchema } from "./Form/schema";
import { AppRoute } from "../../../constants/routes";
import { EPageType } from "../../../constants";
import { TEditTaxPayload } from "../../../app/modules/taxes/types";
import { useEffect, useMemo } from "react";

type TTaxPage = {
  type: EPageType;
};

export const TaxPage: React.FC<TTaxPage> = ({ type }) => {
  const { taxId } = useParams();
  const { data: taxData } = useGetTaxQuery({ id: taxId ?? "" }, { skip: !taxId });
  const [createTax] = useCreateTaxMutation();
  const [editTax] = useEditTaxMutation();

  const defaultValues: TEditTaxPayload = useMemo(
    () => ({
      name: taxData?.name ?? "",
      rate: taxData?.rate ?? 0,
      details: taxData?.details ?? "",
      taxNumber: taxData?.taxNumber ?? "",
      isNameShownInInvoice: taxData?.isNameShownInInvoice ?? false,
    }),
    [taxData],
  );

  const taxForm = useForm<z.infer<typeof taxFormSchema>>({
    resolver: zodResolver(taxFormSchema),
    mode: "onChange",
    defaultValues,
  });

  const navigate = useNavigate();

  const onFormSubmit = (values: z.infer<typeof taxFormSchema>) => {
    console.log("values = ", values, "taxId = ", taxId);
    if (type === EPageType.Edit && taxId) {
      editTax({ id: taxId, body: values })
        .unwrap()
        .then(() => {
          navigate(AppRoute.App.Tax.Root.path);
        });
    } else {
      createTax({ body: values })
        .unwrap()
        .then(() => {
          navigate(AppRoute.App.Tax.Root.path);
        });
    }
  };

  const handleSaveChanges = () => {
    taxForm.handleSubmit(onFormSubmit)();
  };

  const handleCancel = () => {
    taxForm.reset();
  };

  const goBack = () => {
    navigate(AppRoute.App.Tax.Root.path);
  };

  useEffect(() => {
    taxForm.reset(defaultValues);
  }, [defaultValues]);

  return (
    <>
      <Box pl={24} pb={24}>
        <Flex gap={10} align="center" style={{ cursor: "pointer" }} onClick={goBack}>
          <CHEVRON_LEFT />
          <Text fw="700" size="18px">
            {type === EPageType.Edit ? "Edit Tax" : "New Tax"}
          </Text>
        </Flex>
      </Box>
      <Styled.Container>
        <TaxForm form={taxForm} />
        <Divider my={32} />
        <Flex pt={24} justify="flex-end" align="center" gap={16}>
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={!taxForm.formState.isValid} onClick={handleSaveChanges}>
            Create
          </Button>
        </Flex>
      </Styled.Container>
    </>
  );
};
