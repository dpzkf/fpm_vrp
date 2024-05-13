import { TRetrieveRoutingProblemResponse } from "../types.ts";

export const isRetrieveRoutingProblemResponseWithStatus = (response?: TRetrieveRoutingProblemResponse) => {
  if (!response) return true;
  return "status" in response;
};
