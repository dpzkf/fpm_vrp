import { ContextModalProps } from "@mantine/modals";
import { DeleteModal, ConfirmModal } from "../ui-kit";
import { AddCategory } from "../components/modals";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MODAL_CONFIG: Record<string, React.FC<ContextModalProps<any>>> = {
  confirmDeleteModal: DeleteModal,
  confirmModal: ConfirmModal,
  addCategory: AddCategory,
};

export const MODAL_PROPS = {
  size: "auto",
  radius: "var(--rounded-s)",
  withCloseButton: false,
  padding: 0,
  centered: true,
  withinPortal: false,
};
