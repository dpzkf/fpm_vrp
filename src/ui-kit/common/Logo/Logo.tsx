import { TITLE_LOGO_ICO } from "@assets/icons";

import { SvgIcon } from "../SvgIcon";

export const Logo = () => {
  return (
    <div style={{ width: "200px" }}>
      <SvgIcon component={TITLE_LOGO_ICO} />
    </div>
  );
};
