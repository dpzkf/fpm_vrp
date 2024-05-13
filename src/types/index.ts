import { ReactNode } from "react";

export type TAppRouteItem = {
  /**
   * Path to the page route.
   * @example '/signin'
   */
  path: string;
  /**
   * Name of the page route.
   * @example 'Sign In'
   */
  name: string;
  /**
   * Unique key of the page route.
   * @example 'signin'
   */
  key: string;
  /**
   *  function to construct the path to the page route.
   */
  makePath: (...arguments_: (number | string)[]) => string;
};

export type TAppRoutes = {
  App: {
    Dashboard: { Root: TAppRouteItem };
  };
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
