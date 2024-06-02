import { Controller, useFormContext } from "react-hook-form";

import { TextInput } from "@mantine/core";

export const LocationForm = () => {
  const form = useFormContext();
  return (
    <Controller
      control={form.control}
      name="name"
      render={({ field, fieldState: { error } }) => (
        <TextInput required label="Назва Вулиці" placeholder="Введіть назву вулиці" error={error?.message} {...field} />
      )}
    />
  );
};
