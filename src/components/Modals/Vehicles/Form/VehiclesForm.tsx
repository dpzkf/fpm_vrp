import { Controller, useFormContext } from "react-hook-form";

import { NumberInput } from "@mantine/core";

export const VehiclesForm = () => {
  const form = useFormContext();
  return (
    <>
      <Controller
        name="capacity"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <NumberInput
            {...field}
            required
            label="Місткість"
            error={error?.message}
            min={1}
            max={10}
            allowNegative={false}
            clampBehavior="strict"
            value={field.value}
            onChange={(value) => field.onChange(value as number)}
            placeholder="Введіть Місткість"
          />
        )}
      />
    </>
  );
};
