import { FC } from "react";

import { ContextModalProps } from "@mantine/modals";

import { EditLocation, ShipmentsModal, VehiclesModal } from "@components/Modals";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MODAL_CONFIG: Record<string, FC<ContextModalProps<any>>> = {
  editLocation: EditLocation,
  shipmentsModal: ShipmentsModal,
  vehiclesModal: VehiclesModal,
};

export const MODAL_PROPS = {
  size: "clamp(300px, 70%, 480px)",
  title: "Редагування",
  centered: true,
  withinPortal: false,
};
