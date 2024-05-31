import { FC } from "react";

import { Stack } from "@mantine/core";

import { Text } from "@ui/typography";

import { TRetrieveRoutingProblem } from "@app/modules";

import { SolutionTable } from "./components";

type TSolution = {
  solution?: TRetrieveRoutingProblem;
};

export const Solution: FC<TSolution> = ({ solution }) => {
  return (
    <Stack gap={16}>
      <Text fw={500}>Рішення</Text>
      <SolutionTable solution={solution} />
    </Stack>
  );
};
