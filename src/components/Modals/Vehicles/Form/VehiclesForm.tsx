import { Controller, useFormContext } from "react-hook-form";

import { NumberInput } from "@mantine/core";
import { TimeInput } from "@mantine/dates";

export const VehiclesForm = () => {
  const form = useFormContext();
  return (
    <>
      <Controller
        name="capacity"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <NumberInput
            label="Місткість"
            error={error?.message}
            min={1}
            max={100}
            allowNegative={false}
            {...field}
            placeholder="Обрати кількість товарів(можно залишити невизначенним)"
          />
        )}
      />
      <Controller
        name="earliest_start"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <TimeInput
            label="Початок роботи"
            maxTime={form.watch("latest_end")}
            error={error?.message}
            {...field}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />
      <Controller
        name="latest_end"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <TimeInput
            label="Кінець роботи"
            minTime={form.watch("earliest_start")}
            error={error?.message}
            {...field}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />
    </>
  );
};
