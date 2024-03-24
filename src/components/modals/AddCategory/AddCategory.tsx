import { FC, useEffect, useMemo } from "react";

import { ActionIcon, Divider, Flex } from "@mantine/core";
import { Button, Text } from "../../../ui-kit";
import { AddCategoryForm } from "./Form/AddCategoryForm";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useEditCategoryMutation,
} from "../../../app/modules/categories/categoriesApi";

import type * as z from "zod";
import { ContextModalProps } from "@mantine/modals";

import { categoryFormSchema } from "./Form/schema";
import { ECategoryType, EPageType } from "../../../constants";
import { TEditCategoryPayload } from "../../../app/modules/categories/types";

import * as Styled from "./styles";
import { IconX } from "@tabler/icons-react";

type TCategoryModalProps = {
  type: EPageType;
  categoryId?: string;
};

export const AddCategory: FC<ContextModalProps<TCategoryModalProps>> = ({ id, context, innerProps }) => {
  const [createCategory] = useCreateCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
  const { data: categoryData } = useGetCategoryQuery(
    { id: innerProps?.categoryId || "" },
    { skip: !innerProps.categoryId },
  );

  const defaultValues: TEditCategoryPayload = useMemo(
    () => ({
      name: categoryData?.name ?? "",
      type: categoryData?.type ?? ECategoryType.Income,
    }),
    [categoryData],
  );

  const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    mode: "onChange",
    defaultValues,
  });
  const onFormSubmit = (values: z.infer<typeof categoryFormSchema>) => {
    if (innerProps.type === EPageType.Edit && innerProps.categoryId) {
      editCategory({ id: innerProps.categoryId, body: values });
    } else {
      createCategory({ body: values });
    }
    context.closeModal(id);
  };

  const handleAddCategory = () => {
    categoryForm.handleSubmit(onFormSubmit)();
  };

  useEffect(() => {
    categoryForm.reset(defaultValues);
  }, [defaultValues]);

  return (
    <Styled.Modal>
      <Flex p={16} className="modal-header" justify="space-between">
        <Text fw="600" size="22px">
          {innerProps.type === EPageType.New ? "Add Category" : "Edit Category"}
        </Text>
        <ActionIcon className="close" variant="transparent" onClick={() => context.closeModal(id)}>
          <IconX color="black" />
        </ActionIcon>
      </Flex>
      <Divider />
      <AddCategoryForm form={categoryForm} />
      <Divider />
      <Flex p={16} justify="flex-end" align="center" gap={16} style={{ borderTop: "1px solid var(--modal-border)" }}>
        <Button variant="text">Cancel</Button>
        <Button disabled={!categoryForm.formState.isValid} onClick={handleAddCategory}>
          {innerProps.type === EPageType.New ? "Add Category" : "Save Changes"}
        </Button>
      </Flex>
    </Styled.Modal>
  );
};
