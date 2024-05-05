import { forwardRef, Ref } from "react";

import * as Styled from "./styles";

type SvgIconProps = React.SVGAttributes<SVGElement> & {
  children?: React.ReactNode;
  component?: "svg" | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  titleAccess?: string;
  viewBox?: string;
  inheritViewBox?: boolean;
};

const SvgIconBase = (
  { children, component = "svg", viewBox = "0 0 24 24", inheritViewBox = true, titleAccess, ...svgProps }: SvgIconProps,
  ref: Ref<SVGSVGElement>,
) => {
  return (
    <Styled.SvgIconRoot
      as={component}
      focusable="false"
      aria-hidden={titleAccess ? undefined : true}
      role={titleAccess ? "img" : undefined}
      ref={ref}
      {...(inheritViewBox ? {} : { viewBox })}
      {...svgProps}
    >
      {children}
      {titleAccess ? <title>{titleAccess}</title> : null}
    </Styled.SvgIconRoot>
  );
};

export const SvgIcon = forwardRef(SvgIconBase);
