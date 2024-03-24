import { useAppSelector } from "../../../app/hooks.ts";
import { useGetMeQuery } from "../../../app/modules/me/meApi.ts";
import { getMySelector, isAuthorized } from "../../../app/modules/me/meSelector.ts";

export const useAuth = () => {
  const { isLoading } = useGetMeQuery({});
  const isLoggedIn = useAppSelector(isAuthorized);
  const myData = useAppSelector(getMySelector);

  return { isLoggedIn, myData, isLoading };
};
