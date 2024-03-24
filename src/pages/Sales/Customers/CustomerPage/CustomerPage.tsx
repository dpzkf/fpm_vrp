import { Flex, Divider } from "@mantine/core";
import { Button, Text } from "../../../../ui-kit";
import { NewCustomerForm } from "./Form";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";

import * as Styled from "./styles";

import { CHEVRON_LEFT } from "../../../../assets/icons";
import { newCustomerFormSchema } from "./Form/schema";
import { AppRoute } from "../../../../constants/routes";
import { EPageType } from "../../../../constants";

type TCustomerPage = {
  type: EPageType;
};

export const CustomerPage: React.FC<TCustomerPage> = ({ type }) => {
  const { customerId } = useParams();

  const newCustomerForm = useForm<z.infer<typeof newCustomerFormSchema>>({
    resolver: zodResolver(newCustomerFormSchema),
    mode: "onChange",
    defaultValues: {
      address: "",
      billingAddress: "",
      businessNumber: "",
      customerName: "",
      email: "",
      phone: "",
      shippingAddress: "",
    },
  });

  const navigate = useNavigate();

  const onFormSubmit = (values: z.infer<typeof newCustomerFormSchema>) => {
    console.log("values = ", values, "customerId = ", customerId);
  };

  const handleSaveChanges = () => {
    newCustomerForm.handleSubmit(onFormSubmit)();
  };

  const handleCancel = () => {
    newCustomerForm.reset();
  };

  const goBack = () => {
    navigate(AppRoute.App.Sales.Customers.path);
  };

  return (
    <>
      <Flex pl={24} pb={24} gap={10} align="center" style={{ cursor: "pointer" }} onClick={goBack}>
        <CHEVRON_LEFT />
        <Text fw="700" size="18px">
          {type === EPageType.Edit ? "Edit Customer" : "Add Customer"}
        </Text>
      </Flex>
      <Styled.Container>
        <NewCustomerForm form={newCustomerForm} />
        <Divider my={32} />
        <Flex pt={24} justify="flex-end" align="center" gap={16}>
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={!newCustomerForm.formState.isValid} onClick={handleSaveChanges}>
            Create
          </Button>
        </Flex>
      </Styled.Container>
    </>
  );
};
