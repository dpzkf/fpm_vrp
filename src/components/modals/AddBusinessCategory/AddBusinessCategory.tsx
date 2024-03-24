import { EPageType } from "../../../constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Box, Divider, Group, Modal } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

import { Button, Text } from "../../../ui-kit";
import { FC } from "react";

import { useForm } from "react-hook-form";
import { TModal } from "../../../types";
import type * as z from "zod";

import * as Styles from "../styles";
import { AddBusinessCategoryForm } from "./Form";

import { businessCategoryFormSchema } from "./Form/schema.ts";

type TAddBusinessCategoryModalProps = TModal & {
  type: EPageType;
  categoryId?: string;
};

export const AddBusinessCategory: FC<TAddBusinessCategoryModalProps> = (props) => {
  const { close, opened, type } = props;
  const businessCategoryForm = useForm<z.infer<typeof businessCategoryFormSchema>>({
    resolver: zodResolver(businessCategoryFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const onFormSubmit = (values: z.infer<typeof businessCategoryFormSchema>) => {
    console.log("values = ", values);
    close();
  };

  const handleAddCategory = () => {
    businessCategoryForm.handleSubmit(onFormSubmit)();
  };
  return (
    <Styles.StyledModal size="auto" opened={opened} onClose={close} withCloseButton={false} centered={true}>
      <Modal.Body>
        <Group className="modal-header" justify="space-between">
          <Text className="modal-title">
            {type === EPageType.New ? "Add Business Category" : "Edit Business Category"}
          </Text>
          <ActionIcon className="close" variant="transparent" onClick={close}>
            <IconX />
          </ActionIcon>
        </Group>
        <Divider />
        <Box className="modal-body">
          <AddBusinessCategoryForm form={businessCategoryForm} />
        </Box>
        <Divider />
        <Group gap={16} className="modal-footer" justify="end">
          <Button variant="secondary" miw={60} onClick={close}>
            Cancel
          </Button>
          <Button disabled={!businessCategoryForm.formState.isValid} onClick={handleAddCategory}>
            {type === EPageType.New ? "Add Category" : "Save Changes"}
          </Button>
        </Group>
      </Modal.Body>
    </Styles.StyledModal>
  );
};
