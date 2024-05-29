import { FC } from "react";

import { ActionIcon, Button } from "@mantine/core";
import { Divider, Flex, Group } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";

import { IconX } from "@tabler/icons-react";

import { Text } from "../../../index.ts";
import * as Styled from "../styles.ts";

type TDeleteModal = {
  modalBody: string;
  title: string;
  onConfirm: () => void;
};

export const DeleteModal: FC<ContextModalProps<TDeleteModal>> = ({ id, context, innerProps }) => {
  const handleConfirm = () => {
    innerProps.onConfirm();
    context.closeModal(id);
  };
  return (
    <Styled.StyledModal>
      <Group className="modal-header" justify="space-between">
        <Text className="modal-title">{innerProps?.title}</Text>
        <ActionIcon className="close" variant="transparent" onClick={() => context.closeModal(id)}>
          <IconX />
        </ActionIcon>
      </Group>
      <Divider />
      <Flex className="modal-body">{innerProps.modalBody}</Flex>
      <Divider />
      <Group gap={16} className="modal-footer" justify="end">
        <Button variant="secondary" miw={60} onClick={() => context.closeModal(id)}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} miw={120}>
          Yes, Delete
        </Button>
      </Group>
    </Styled.StyledModal>
  );
};
