import { Stack } from "@mantine/core";
import { Text } from "../../ui-kit/typography/Text";

import { Form } from "./Form";

export const PaymentsSettings = () => {
  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <Text size="18px" fw={700}>
          Payment
        </Text>
        <Text size="16px">Connect your bank to fetch all your transactions</Text>
      </Stack>
      <Form />
    </Stack>
  );
};
