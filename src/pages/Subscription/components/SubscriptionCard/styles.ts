import { styled, css } from "styled-components";

type TCardContainerProps = {
  selected?: boolean;
};

export const CardContainer = styled.li<TCardContainerProps>`
  max-width: 344px;
  list-style: none;
  padding: 24px 16px;
  border-radius: var(--rounded-s);
  background-color: var(--white);
  border: 2px solid var(--gray-400);
  cursor: pointer;
  position: relative;

  transition: border 0.5s ease-in-out;

  ${({ selected }) =>
    selected &&
    css`
      border: 2px solid var(--blue-700);
    `};

  &:hover {
    border: 2px solid var(--blue-700);
  }
`;

export const MostPopular = styled.div`
  background-color: var(--blue-700);
  width: 344.5px;
  color: var(--white);
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  padding: 12px 0;
  font-weight: 700;
  font-size: 14px;
  border-radius: 8px 8px 0px 0px;
  position: absolute;
  top: -42px;
  left: -2px;
`;
