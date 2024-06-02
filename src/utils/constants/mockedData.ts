import { TShipments, TVehicles } from "@app/modules";

import { v4 as uuidv4 } from "uuid";

import { LocationType, TLocation } from "../../types";

export const MOCKED_LOCATIONS: TLocation[] = [
  {
    name: "Перша Дачна Вулиця 80",
    coordinates: [35.0369429788974, 48.428788936916646],
    id: uuidv4(),
    type: LocationType.WAREHOUSE,
  },
  {
    name: "Сєрова Вулиця 2",
    coordinates: [35.03710623364512, 48.46818956311154],
    type: LocationType.DROP_OFF,
    id: uuidv4(),
  },
  {
    name: "location_1",
    coordinates: [35.0702, 48.452277],
    type: LocationType.DROP_OFF,
    id: uuidv4(),
  },
];

export const MOCKED_SHIPMENTS: TShipments[] = [
  {
    id: uuidv4(),
    name: "0",
    from: "Перша Дачна Вулиця 80",
    to: "Сєрова Вулиця 2",
    size: { boxes: 1 },
    dropoff_times: [
      {
        earliest: "2024-06-03T06:10:00.000Z",
        latest: "2024-06-03T07:00:00.000Z",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "1",
    from: "Перша Дачна Вулиця 80",
    to: "location_1",
    size: { boxes: 1 },
    dropoff_times: [
      {
        earliest: "2024-06-03T05:00:00.000Z",
        latest: "2024-06-03T05:30:00.000Z",
      },
    ],
  },
];

export const MOCKED_VEHICLES: TVehicles[] = [
  {
    id: uuidv4(),
    name: "0",
    capacities: { boxes: 1 },
    earliest_start: "2024-06-03T05:00:00.000Z",
    latest_end: "2024-06-03T09:00:00.000Z",
  },
  {
    id: uuidv4(),
    name: "1",
    capacities: { boxes: 1 },
    earliest_start: "2024-06-03T06:00:00.000Z",
    latest_end: "2024-06-03T07:10:00.000Z",
  },
];
