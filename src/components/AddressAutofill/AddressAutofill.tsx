import { forwardRef, useState } from "react";

import { MAPB0X_TOKEN } from "@app/api.ts";

import { Geocoder } from "@mapbox/search-js-react";
import { Feature } from "@turf/helpers";

type TAddressAutofill = {
  onRetrieve: (res: Feature) => void;
};

const theme = {
  variables: {
    borderRadius: "4.57px",
    border: "1px solid #ced4da",
    boxShadow: "none",
    color: "#000",
  },
};

export const AddressAutofill = forwardRef<HTMLInputElement, TAddressAutofill>((props, reference) => {
  const [inputValue, setInputValue] = useState("");
  return (
    //@ts-ignore
    <Geocoder
      {...props}
      theme={theme}
      ref={reference}
      accessToken={MAPB0X_TOKEN}
      options={{
        language: "uk",
        country: "ua",
      }}
      value={inputValue}
      placeholder="Введіть адресу, щоб додати точку"
      onChange={(d) => {
        setInputValue(d);
      }}
    />
  );
});
