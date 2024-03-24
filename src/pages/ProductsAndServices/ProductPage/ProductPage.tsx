import { Flex, Divider, Box } from "@mantine/core";
import { Button, Text } from "../../../ui-kit";
import { ProductForm } from "./Form";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";

import * as Styled from "./styles";

import { CHEVRON_LEFT } from "../../../assets/icons";
import { productFormSchema } from "./Form/schema";
import { EPageType } from "../../../constants";
import { AppRoute } from "../../../constants/routes";

type TProductPage = {
  type: EPageType;
};

export const ProductPage: React.FC<TProductPage> = ({ type }) => {
  const { productId } = useParams();

  const taxForm = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    mode: "onChange",
    defaultValues: {
      category: "",
      isAddForPurchases: false,
      isAddForSales: false,
      name: "",
      price: "",
      productDetails: "",
      quantity: "",
    },
  });

  const navigate = useNavigate();

  const onFormSubmit = (values: z.infer<typeof productFormSchema>) => {
    console.log("values = ", values, "productId = ", productId);
  };

  const handleSaveChanges = () => {
    taxForm.handleSubmit(onFormSubmit)();
  };

  const handleCancel = () => {
    taxForm.reset();
    navigate(AppRoute.App.ProductsAndServices.Root.path);
  };

  const goBack = () => {
    navigate(AppRoute.App.ProductsAndServices.Root.path);
  };

  return (
    <>
      <Box pl={24} pb={24}>
        <Flex gap={10} align="center" style={{ cursor: "pointer" }} onClick={goBack}>
          <CHEVRON_LEFT />
          <Text fw="700" size="18px">
            {type === EPageType.Edit ? "Edit Product" : "New Product"}
          </Text>
        </Flex>
      </Box>
      <Styled.Container>
        <ProductForm form={taxForm} />
        <Divider my={32} />
        <Flex pt={24} justify="flex-end" align="center" gap={16}>
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={!taxForm.formState.isValid} onClick={handleSaveChanges}>
            {type === EPageType.Edit ? "Save Changes" : "Create"}
          </Button>
        </Flex>
      </Styled.Container>
    </>
  );
};
