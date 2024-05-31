import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { NumberInput, Select } from "@mantine/core";
import { TimeInput } from "@mantine/dates";

type TShipmentsForm = {
  warehouseLocations: string[];
  dropOffLocations: string[];
};

export const ShipmentsForm: FC<TShipmentsForm> = ({ warehouseLocations, dropOffLocations }) => {
  const form = useFormContext();
  return (
    <>
      <Controller
        name="from"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <Select
            required
            label="Звідки"
            allowDeselect={false}
            data={warehouseLocations}
            error={error?.message}
            {...field}
            onChange={(value) => {
              field.onChange(value);
            }}
            placeholder="Обрати звідки"
            value={String(field.value)}
          />
        )}
      />
      <Controller
        name="to"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <Select
            required
            label="Куди"
            allowDeselect={false}
            data={dropOffLocations}
            error={error?.message}
            {...field}
            onChange={(value) => {
              field.onChange(value);
            }}
            placeholder="Обрати куди"
            value={String(field.value)}
          />
        )}
      />
      <Controller
        name="size"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <NumberInput
            label="Кількість товарів"
            error={error?.message}
            min={1}
            max={10}
            allowNegative={false}
            {...field}
            placeholder="Обрати кількість товарів(можно залишити невизначенним)"
          />
        )}
      />
      <Controller
        name="earliest"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <TimeInput
            label="З"
            maxTime={form.watch("latest")}
            error={error?.message}
            {...field}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />
      <Controller
        name="latest"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <TimeInput
            label="До"
            minTime={form.watch("earliest")}
            error={error?.message}
            {...field}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />
    </>
  );
};
