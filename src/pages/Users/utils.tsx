import { ELLIPSE } from "../../assets/icons";
import { ERole } from "../../constants/userRoles";
import { SvgIcon } from "../../ui-kit/common/SvgIcon";
import { ReactNode } from "react";
import * as Styled from "./styles.ts";

export const getUserRole = (role: ERole) => {
  const map: Record<ERole, ReactNode> = {
    [ERole.Admin]: (
      <Styled.RoleWrapper gap={4} color="var(--role-green)">
        <SvgIcon component={ELLIPSE} /> Admin
      </Styled.RoleWrapper>
    ),
    [ERole.Editor]: (
      <Styled.RoleWrapper gap={4} color="var(--role-yellow)">
        <SvgIcon component={ELLIPSE} /> Editor
      </Styled.RoleWrapper>
    ),
    [ERole.Viewer]: (
      <Styled.RoleWrapper gap={4} color="var(--role-blue)">
        <SvgIcon component={ELLIPSE} /> Viewer
      </Styled.RoleWrapper>
    ),
  };

  return map[role];
};
