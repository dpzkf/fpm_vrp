import { FC } from "react";

import { Stack } from "@mantine/core";

import { Text } from "@ui/typography";

import { TRetrieveRoutingProblem } from "@app/modules";

import { SolutionTable } from "./components";
import * as Styled from "../../styles.ts";

type TSolution = {
  solution?: TRetrieveRoutingProblem;
};

export const Solution: FC<TSolution> = ({ solution }) => {
  return (
    <Stack gap={16}>
      <Styled.HintWrapper>
        <Text c="var(--primary-color)">Вирішене завдання</Text>
      </Styled.HintWrapper>
      <Text fw={500}>Рішення</Text>
      <SolutionTable solution={solution} />
    </Stack>
  );
};
