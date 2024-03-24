import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  ${reset}
  html, body {
    font-family: var(-font-family-main);
    box-sizing: border-box;
    height: 100%;
    font: var(--font-m);
    color: var(--primary-text-color);
  }
  .app{
    font: var(--font-m);
    background-color: var(--white);
    min-height: 100vh;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
  }
  a{
    color: var(--primary-text-color);
  }
`;
