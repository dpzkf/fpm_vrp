import { Stack } from "@mantine/core";
import { Button } from "../../../../ui-kit/interactive/Button";
import { Text } from "../../../../ui-kit/typography/Text";
import { FC } from "react";

type TEmptyState = {
  handleButtonClick: () => void;
};

export const EmptyState: FC<TEmptyState> = ({ handleButtonClick }) => {
  return (
    <Stack py={64}>
      <Stack gap={24} justify="center" align="center">
        <Stack gap={12}>
          <Text size="16px" fw={600} ta="center">
            Business is no fun without people.
          </Text>
          <Text size="14px" c="var(--gray-700)" ta="center">
            Create and manage your contacts, all in one place.
          </Text>
        </Stack>
        <Button onClick={handleButtonClick} maw={160}>
          Start to Create
        </Button>
      </Stack>
    </Stack>
  );
};
