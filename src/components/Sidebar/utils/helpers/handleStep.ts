import { ActiveTabs } from "../constants.ts";

export const handleNextStep = (step: ActiveTabs) => {
  switch (step) {
    case ActiveTabs.LOCATIONS_WAREHOUSES:
      return ActiveTabs.LOCATIONS_DROP_OFFS;
    case ActiveTabs.LOCATIONS_DROP_OFFS:
      return ActiveTabs.SHIPMENTS;
    case ActiveTabs.SHIPMENTS:
      return ActiveTabs.VEHICLES;
    case ActiveTabs.VEHICLES:
      return ActiveTabs.SOLUTION;
    default:
      return ActiveTabs.LOCATIONS_WAREHOUSES;
  }
};

export const handlePreviousStep = (step: ActiveTabs) => {
  switch (step) {
    case ActiveTabs.LOCATIONS_DROP_OFFS:
      return ActiveTabs.LOCATIONS_WAREHOUSES;
    case ActiveTabs.SHIPMENTS:
      return ActiveTabs.LOCATIONS_DROP_OFFS;
    case ActiveTabs.VEHICLES:
      return ActiveTabs.SHIPMENTS;
    case ActiveTabs.SOLUTION:
      return ActiveTabs.VEHICLES;
    default:
      return ActiveTabs.LOCATIONS_WAREHOUSES;
  }
};
