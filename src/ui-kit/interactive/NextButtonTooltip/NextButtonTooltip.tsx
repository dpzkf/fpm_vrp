import { FC, PropsWithChildren } from "react";

import { Tooltip, TooltipProps } from "@mantine/core";

type TDisabledNextButtonTooltip = PropsWithChildren & Omit<TooltipProps, "label">;

export const NextButtonTooltip: FC<TDisabledNextButtonTooltip> = ({ disabled, children, ...restProps }) => {
  return (
    <Tooltip {...restProps} label="Треба додати хоча б одне поле" disabled={disabled}>
      {children}
    </Tooltip>
  );
};
