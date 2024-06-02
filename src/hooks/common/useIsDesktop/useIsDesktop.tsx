import { em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const useIsDesktop = () => {
  return useMediaQuery(`(min-width: ${em(1024)})`);
};
