import { ESubmitRoutingProblemStatus, TRetrieveRoutingProblemResponse, TSubmitRoutingProblem } from "../types.ts";

type TResponse = TRetrieveRoutingProblemResponse | TSubmitRoutingProblem;

const isResponseWithCode = (response: TResponse): response is TSubmitRoutingProblem => {
  return "code" in response;
};

export const isRetrieveRoutingProblemUnsolvable = (
  response?: TRetrieveRoutingProblemResponse | TSubmitRoutingProblem,
) => {
  if (!response) return false;
  if (!isResponseWithCode(response)) return false;

  return response.code === ESubmitRoutingProblemStatus.UNSOLVABLE;
};

export const isRetrieveRoutingProblemResponseWithStatus = (response?: TRetrieveRoutingProblemResponse) => {
  if (!response) return true;
  return "status" in response;
};
