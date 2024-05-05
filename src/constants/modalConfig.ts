import { ContextModalProps } from "@mantine/modals";

import { ConfirmModal, DeleteModal } from "../ui-kit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MODAL_CONFIG: Record<string, React.FC<ContextModalProps<any>>> = {
  confirmDeleteModal: DeleteModal,
  confirmModal: ConfirmModal,
};

export const MODAL_PROPS = {
  size: "auto",
  radius: "var(--rounded-s)",
  withCloseButton: false,
  padding: 0,
  centered: true,
  withinPortal: false,
};
