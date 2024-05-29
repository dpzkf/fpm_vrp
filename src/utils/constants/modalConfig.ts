import { ContextModalProps } from "@mantine/modals";

import { EditLocation } from "@components/Modals";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MODAL_CONFIG: Record<string, React.FC<ContextModalProps<any>>> = {
  editLocation: EditLocation,
};

export const MODAL_PROPS = {
  size: "clamp(620px, 70%, 650px)",
  centered: true,
  withinPortal: false,
};
