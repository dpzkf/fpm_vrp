import { trimPath } from "../../utils";
import { useMemo } from "react";

import { Text } from "../../ui-kit";
import { Popover, Flex, UnstyledButton } from "@mantine/core";

import { useLocation, useNavigate } from "react-router-dom";

import * as Styled from "./styles";
import { AppRoute } from "../../constants/routes";

import { TAppRouteItem } from "../../types";
import { LOGOUT, MY_ACCOUNT } from "../../assets/icons";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getMySelector } from "../../app/modules/me/meSelector";
import { logout } from "../../app/modules/me/meSlice";

export const Header = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const myData = useAppSelector(getMySelector);
  const onAvatarClick = () => {
    navigate(AppRoute.App.MyAccount.Root.path);
  };

  const { pathname } = location;

  const pageName: string = useMemo(
    () =>
      Object.values(AppRoute)
        .reduce<TAppRouteItem[]>(
          (accumulator, category) => [
            ...accumulator,
            ...Object.values(category).flatMap((page) => Object.values(page).map((route) => route)),
          ],
          [],
        )
        .find((route) => trimPath(route.path) === trimPath(pathname))?.name || "Unknown Page",
    [pathname],
  );
  return (
    <Styled.Header>
      <Text size="18px" fw={700}>
        {pageName}
      </Text>
      <Popover position="bottom" shadow="md" offset={{ mainAxis: 6, crossAxis: -110 }}>
        <Popover.Target>
          <Styled.Avatar src="" />
        </Popover.Target>
        <Styled.Popover>
          <Flex direction="column" align="flex-start">
            <Flex px={16} gap={12} mb={16} align="center">
              <Styled.Avatar src="" />
              <Flex direction="column" gap={8}>
                <Text fw="700">{myData?.fullName}</Text>
                <Text>{myData?.email}</Text>
              </Flex>
            </Flex>
            <Styled.MenuItem>
              <MY_ACCOUNT />
              <UnstyledButton onClick={onAvatarClick} fw={500} fz={14}>
                Account Profile
              </UnstyledButton>
            </Styled.MenuItem>
            <Styled.MenuItem>
              <LOGOUT />
              <UnstyledButton
                fw={500}
                c="var(--red)"
                fz={14}
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Log Out
              </UnstyledButton>
            </Styled.MenuItem>
          </Flex>
        </Styled.Popover>
      </Popover>
    </Styled.Header>
  );
};
