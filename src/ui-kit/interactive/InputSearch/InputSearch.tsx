import { IconSearch } from "@tabler/icons-react";
import { Input as InputLib } from "@mantine/core";
import { ChangeEvent, forwardRef } from "react";

import * as Styled from "./styles";

type TInputSearchProps = {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const InputSearch = forwardRef<HTMLInputElement, TInputSearchProps>((props, reference) => {
  const { handleChange, value } = props;

  return (
    <Styled.Wrapper>
      <InputLib.Wrapper>
        <InputLib
          ref={reference}
          value={value}
          onChange={handleChange}
          leftSection={<IconSearch width="20px" height="20px" />}
          placeholder="Search"
        />
      </InputLib.Wrapper>
    </Styled.Wrapper>
  );
});
