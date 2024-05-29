import { FC, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Button, Flex } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";

import { useToast } from "@hooks/common/useToast";

import { zodResolver } from "@hookform/resolvers/zod";
import { TLocation } from "types";
import { z } from "zod";

import { Modal } from "../styles.ts";
import { LocationForm, locationFormSchema } from "./Form";

type TEditLocation = {
  locationId: string;
  locations: TLocation[];
  updateLocation: (id: string, location: Partial<TLocation>) => void;
};

export const EditLocation: FC<ContextModalProps<TEditLocation>> = ({ id, context, innerProps }) => {
  const { updateLocation, locations, locationId } = innerProps;
  const location = locations.find(({ id }) => locationId === id);
  const defaultValues: Partial<TLocation> = useMemo(
    () => ({
      name: location?.name ?? "",
    }),
    [locationId],
  );
  const { toastSuccess } = useToast();
  const locationForm = useForm<z.infer<typeof locationFormSchema>>({
    resolver: zodResolver(locationFormSchema),
    mode: "onChange",
    defaultValues,
  });

  const isDisabled = useMemo(() => {
    return locationForm.formState.isValid && locationForm.formState.isDirty;
  }, [locationForm.formState.isValid, locationForm.formState.isDirty]);

  useEffect(() => {
    locationForm.reset(defaultValues);
  }, [defaultValues]);

  const onFormSubmit = (values: z.infer<typeof locationFormSchema>) => {
    updateLocation(innerProps.locationId, { name: values.name });
  };

  const handleUpdateLocation = () => {
    locationForm.handleSubmit(onFormSubmit)();
    toastSuccess("Vendor added successfully");
    context.closeModal(id);
  };

  return (
    <Modal>
      <FormProvider {...locationForm}>
        <LocationForm />
      </FormProvider>
      <Flex justify="flex-end" align="center" gap={16}>
        <Button variant="outline" onClick={() => context.closeModal(id)}>
          Cancel
        </Button>
        <Button disabled={!isDisabled} onClick={handleUpdateLocation}>
          Save Changes
        </Button>
      </Flex>
    </Modal>
  );
};
