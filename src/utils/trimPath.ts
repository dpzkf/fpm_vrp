import { EDIT_PATHNAME_REGEX } from "../constants/regex.ts";

export const trimPath = (originalPath: string) => {
  return originalPath.replace(EDIT_PATHNAME_REGEX, "/$1/edit");
};
