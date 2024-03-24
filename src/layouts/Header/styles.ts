import { styled } from "styled-components";
import { Avatar as AvatarLib, Popover as PopoverLib } from "@mantine/core";

export const Header = styled.header`
  background-color: var(--app-layout-bg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: auto;
  padding-bottom: 24px;
`;

export const Avatar = styled(AvatarLib)`
  cursor: pointer;
`;

export const Popover = styled(PopoverLib.Dropdown)`
  padding: 16px;
  height: 178px;
  width: 264px;
  left: 1000px;
`;

export const MenuItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
`;
