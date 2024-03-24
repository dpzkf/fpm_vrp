import { styled } from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  border-radius: var(--rounded-xs);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  color: var(--text-dark-gray);

  &.active {
    color: var(--white);
    background: var(--primary-color);
    font-weight: 600;
  }
  & svg {
    color: var(--text-dark-gray);
    fill: var(--white);
  }
  &.active svg {
    color: var(--white);
    fill: var(--white);
    stroke: var(--white);
  }

  &.active svg.chevron-ico {
    color: var(white);
    fill: transparent;
  }

  & svg.opened {
    transform: rotateX(180deg);
  }
`;

export const InternalLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-left: 2px solid var(--primary-color);
  margin-left: 32px;
  margin-top: 12px;
`;

export const InternalLink = styled(NavLink)`
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 8px 12px;

  &.active {
    color: var(--primary-color);
    font-weight: 700;
  }
`;
