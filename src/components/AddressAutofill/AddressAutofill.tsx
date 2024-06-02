import { forwardRef, useState } from "react";

import { MAPB0X_TOKEN } from "@app/api.ts";

import { Geocoder } from "@mapbox/search-js-react";
import { Feature } from "@turf/helpers";

type TAddressAutofill = {
  onRetrieve: (res: Feature) => void;
};

export const AddressAutofill = forwardRef<HTMLInputElement, TAddressAutofill>((props, reference) => {
  const [inputValue, setInputValue] = useState("");
  return (
    //@ts-ignore
    <Geocoder
      {...props}
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
