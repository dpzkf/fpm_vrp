import { ReactNode } from "react";

import { SvgIcon } from "../../../ui-kit";

import * as Styled from "../styles";

import { ELLIPSE } from "../../../assets/icons";

import { ECategoryType } from "../../../constants";

export const getCategoryType = (type: ECategoryType) => {
  const map: Record<ECategoryType, ReactNode> = {
    [ECategoryType.Income]: (
      <Styled.TypeWrapper gap={4} color="var(--role-green)">
        <SvgIcon component={ELLIPSE} /> Income
      </Styled.TypeWrapper>
    ),
    [ECategoryType.Expense]: (
      <Styled.TypeWrapper gap={4} color="var(--red)">
        <SvgIcon component={ELLIPSE} /> Expense
      </Styled.TypeWrapper>
    ),
    [ECategoryType.AllType]: undefined,
  };

  return map[type];
};
