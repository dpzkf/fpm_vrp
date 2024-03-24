import { ActionIcon } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { IconX } from "@tabler/icons-react";
import { FC } from "react";
import { Divider, Flex, Group } from "@mantine/core";
import { Button, Text } from "../../../index.ts";
import * as Styled from "../styles.ts";

type TConfirmModal = {
  modalBody: string;
  title: string;
};

export const ConfirmModal: FC<ContextModalProps<TConfirmModal>> = ({ id, context, innerProps }) => {
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
        <Button miw={120}>Yes, Continue</Button>
      </Group>
    </Styled.StyledModal>
  );
};
