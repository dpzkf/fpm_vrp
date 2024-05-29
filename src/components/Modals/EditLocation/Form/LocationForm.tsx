import { Controller, useFormContext } from "react-hook-form";

import { InputWithVerticalLabel } from "@ui/interactive";

export const LocationForm = () => {
  const form = useFormContext();
  return (
    <Controller
      control={form.control}
      name="name"
      render={({ field, fieldState: { error } }) => (
        <InputWithVerticalLabel
          fullWidth
          required
          label="User Name"
          placeholder="Enter user name"
          error={error?.message}
          {...field}
        />
      )}
    />
  );
};
