import { FC, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Button, Flex } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";

import { useToast } from "@hooks/common/useToast";

import { TShipments } from "@app/modules";

import { zodResolver } from "@hookform/resolvers/zod";
import { formatISOStringToTime } from "@utils/helpers";
import uniqueId from "lodash.uniqueid";
import { z } from "zod";

import { Modal } from "../styles.ts";
import { ShipmentsForm, shipmentsFormSchema } from "./Form";
import { formatData } from "./utils";

type TShipmentsModal = {
  shipmentId?: string;
  shipments: TShipments[];
  warehouseLocations: string[];
  dropOffLocations: string[];
  update?: (id: string, location: Partial<TShipments>) => void;
  create?: (shipment: TShipments) => void;
};

export const ShipmentsModal: FC<ContextModalProps<TShipmentsModal>> = ({ id, context, innerProps }) => {
  const { shipments, update, create, shipmentId, warehouseLocations, dropOffLocations } = innerProps;
  const shipment = useMemo(
    () => (shipmentId ? shipments.find(({ id }) => shipmentId === id) : undefined),
    [shipmentId],
  );
  const defaultValues = useMemo(
    () => ({
      from: shipment?.from || "",
      to: shipment?.to || "",
      size: shipment?.size?.boxes || "",
      earliest: shipment?.dropoff_times?.[0].earliest ? formatISOStringToTime(shipment.dropoff_times[0].earliest) : "",
      latest: shipment?.dropoff_times?.[0].latest ? formatISOStringToTime(shipment.dropoff_times[0].latest) : "",
    }),
    [shipment],
  );
  const { toastSuccess } = useToast();
  const shipmentForm = useForm<z.infer<typeof shipmentsFormSchema>>({
    resolver: zodResolver(shipmentsFormSchema),
    mode: "onChange",
    defaultValues,
  });

  const isDisabled = useMemo(() => {
    return shipmentForm.formState.isValid && shipmentForm.formState.isDirty;
  }, [shipmentForm.formState.isValid, shipmentForm.formState.isDirty]);

  useEffect(() => {
    shipmentForm.reset(defaultValues);
  }, [defaultValues]);

  const onFormSubmit = (values: z.infer<typeof shipmentsFormSchema>) => {
    if (!shipmentId) {
      return create?.({ id: uniqueId("shipment_"), name: String(shipments.length), ...formatData(values) });
    }
    update?.(shipmentId, formatData(values));
  };

  const handleSubmit = () => {
    shipmentForm.handleSubmit(onFormSubmit)();
    toastSuccess();
    context.closeModal(id);
  };

  return (
    <Modal>
      <FormProvider {...shipmentForm}>
        <ShipmentsForm dropOffLocations={dropOffLocations} warehouseLocations={warehouseLocations} />
      </FormProvider>
      <Flex justify="flex-end" align="center" gap={16}>
        <Button variant="outline" onClick={() => context.closeModal(id)}>
          Відмінити
        </Button>
        <Button disabled={!isDisabled} onClick={handleSubmit}>
          Зберегті
        </Button>
      </Flex>
    </Modal>
  );
};
