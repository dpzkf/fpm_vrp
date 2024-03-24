import React, { useCallback, useMemo } from "react";

import { SvgIcon, Text } from "../../../../ui-kit";
import { Collapse, Flex } from "@mantine/core";
import { NavLink } from "react-router-dom";

import { useDisclosure, useClickOutside } from "@mantine/hooks";
import { useLocation } from "react-router-dom";

import * as Styled from "./styles";

import { CHEVRON_DOWN_ICO } from "../../../../assets/icons";

export type TMenuItemProps = {
  /**
   * The ico for the menu item if it needed
   *
   */
  icon?: React.FunctionComponent;
  /**
   * The name of menu item
   *
   */
  name: string;
  /**
   * Url to the page
   *
   */
  url?: string;
  /**
   * Array of internal links
   *
   */
  internalLinks?: { url: string; name: string }[];
};

export const MenuItem: React.FC<TMenuItemProps> = (props) => {
  const { name, url, internalLinks, icon } = props;
  const location = useLocation();

  const [opened, { toggle, close }] = useDisclosure(false);
  const reference = useClickOutside(() => close());

  const matchCurrentUrl = useCallback(
    (url: string) => {
      const formatedUrl = url.toLocaleLowerCase().trim();
      return location.pathname.toLocaleLowerCase().trim().includes(formatedUrl);
    },
    [location.pathname, name]
  );

  const withInternal = useMemo(() => !!internalLinks?.length, [internalLinks]);

  if (withInternal) {
    return (
      <div ref={reference}>
        <Styled.Container
          onClick={toggle}
          className={matchCurrentUrl(name) ? "active" : ""}
        >
          <Flex gap={12}>
            <SvgIcon component={icon} />
            <Text fw="700">{name}</Text>
          </Flex>
          <SvgIcon
            className={`chevron-ico ${
              (opened || matchCurrentUrl(name)) && "opened"
            }`}
            component={CHEVRON_DOWN_ICO}
          />
        </Styled.Container>
        {withInternal && (
          <Collapse in={opened || matchCurrentUrl(name)}>
            <Styled.InternalLinksContainer>
              {internalLinks?.map((link) => (
                <Styled.InternalLink key={link.url} to={link.url}>
                  {link.name}
                </Styled.InternalLink>
              ))}
            </Styled.InternalLinksContainer>
          </Collapse>
        )}
      </div>
    );
  }

  return (
    <Styled.Container as={NavLink} to={url ?? "/"}>
      <SvgIcon component={icon} />
      <Text fw="700">{name}</Text>
    </Styled.Container>
  );
};
