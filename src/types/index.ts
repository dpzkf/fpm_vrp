import { ReactNode } from "react";

import { Feature, Geometry } from "@turf/helpers";

export enum LocationType {
  WAREHOUSE = "WAREHOUSE",
  DROP_OFF = "DROP_OFF",
}

export type TLocation = {
  id: string;
  coordinates: [number, number];
  name: string;
  type: LocationType;
  isFocused?: boolean;
};

export type TModal = {
  opened: boolean;
  close: () => void;
  children?: ReactNode;
  headerText?: string;
  buttonText?: string;
  handleButtonClick?: () => void;
};

export type TModalForm = {
  /**
   * Callback that is called when the form is submitted successfully.
   */
  onSubmitSuccess?: () => void;
  /**
   * Callback that is called when the form is submitted with an error.
   */
  onSubmitError?: (error: string) => void;
};

export type TResolvedCoordinates = {
  stops: Feature<Geometry>;
  stopNumber: number;
  vehicle: string;
};
