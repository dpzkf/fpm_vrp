import { FC, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Button, Flex } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";

import { useToast } from "@hooks/common/useToast";

import { TVehicles } from "@app/modules";

import { zodResolver } from "@hookform/resolvers/zod";
import uniqueId from "lodash.uniqueid";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { Modal } from "../styles.ts";
import { VehiclesForm, vehiclesFormSchema } from "./Form";
import { formatData } from "./utils";

type TVehiclesModal = {
  vehicleId?: string;
  vehicles: TVehicles[];
  update?: (id: string, vehicle: Partial<TVehicles>) => void;
  create?: (shipment: TVehicles) => void;
};

export const VehiclesModal: FC<ContextModalProps<TVehiclesModal>> = ({ id, context, innerProps }) => {
  const { vehicles, update, create, vehicleId } = innerProps;
  const vehicle = useMemo(() => (vehicleId ? vehicles.find(({ id }) => vehicleId === id) : undefined), [vehicleId]);
  const defaultValues = useMemo(
    () => ({
      capacity: vehicle?.capacities?.boxes || 0,
    }),
    [vehicle],
  );
  const { toastSuccess } = useToast();
  const vehicleForm = useForm<z.infer<typeof vehiclesFormSchema>>({
    resolver: zodResolver(vehiclesFormSchema),
    mode: "onChange",
    defaultValues,
  });

  const isDisabled = useMemo(() => {
    return vehicleForm.formState.isValid && vehicleForm.formState.isDirty;
  }, [vehicleForm.formState.isValid, vehicleForm.formState.isDirty]);

  useEffect(() => {
    vehicleForm.reset(defaultValues);
  }, [defaultValues]);

  const onFormSubmit = (values: z.infer<typeof vehiclesFormSchema>) => {
    if (!vehicleId) {
      return create?.({
        ...formatData(values),
        id: uuidv4(),
        name: uniqueId(),
      });
    }
    update?.(vehicleId, formatData(values));
  };

  const handleSubmit = () => {
    vehicleForm.handleSubmit(onFormSubmit)();
    toastSuccess();
    context.closeModal(id);
  };

  return (
    <Modal>
      <FormProvider {...vehicleForm}>
        <VehiclesForm />
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
