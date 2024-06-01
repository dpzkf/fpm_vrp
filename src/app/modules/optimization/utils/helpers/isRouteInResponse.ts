import { ESubmitRoutingProblemStatus, TRetrieveRoutingProblemResponse, TSubmitRoutingProblem } from "../types.ts";

type TResponse = TRetrieveRoutingProblemResponse | TSubmitRoutingProblem;

const isResponseWithStatus = (response: TResponse): response is TSubmitRoutingProblem => {
  return "status" in response;
};

export const isRetrieveRoutingProblemUnsolvable = (
  response?: TRetrieveRoutingProblemResponse | TSubmitRoutingProblem,
) => {
  if (!response) return false;
  if (!isResponseWithStatus(response)) return false;

  return response.status === ESubmitRoutingProblemStatus.UNSOLVABLE;
};

export const isRetrieveRoutingProblemResponseWithStatus = (response?: TRetrieveRoutingProblemResponse) => {
  if (!response) return true;
  return "status" in response;
};
