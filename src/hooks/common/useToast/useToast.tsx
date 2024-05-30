import { toast, ToastOptions } from "react-toastify";

import { ActionIcon } from "@mantine/core";

import { TOAST_CLOSE_ICO, TOAST_ERROR_ICO } from "@assets/icons";

import { EToastIds } from "./utils.ts";

export const useToast = () => {
  const options: ToastOptions = {
    pauseOnHover: true,
    closeOnClick: true,
    icon: false,
    closeButton: (
      <ActionIcon variant="transparent">
        <TOAST_CLOSE_ICO />
      </ActionIcon>
    ),
    theme: "colored",
  };

  const toastSuccess = (message?: string) => {
    toast.success(message || "Зміни збережено", { ...options, toastId: EToastIds.SuccessToast });
  };
  const toastError = (message?: string) => {
    toast.error(message || "Помилка", { ...options, toastId: EToastIds.ErrorToast, icon: TOAST_ERROR_ICO });
  };
  const toastInfo = (message: string) => {
    toast.info(message, options);
  };
  const toastWarning = (message: string) => {
    toast.warning(message, options);
  };

  const toastPromise = (promise: Promise<void>) => {
    toast.promise(promise, {
      pending: "Pending",
      success: {
        ...options,
        toastId: EToastIds.SuccessToast,
        render() {
          return "Завершено";
        },
        data: undefined,
      },
      error: {
        ...options,
        toastId: EToastIds.ErrorToast,
        icon: TOAST_ERROR_ICO,
        render() {
          return "Помилка";
        },
      },
    });
  };

  return { toastInfo, toastError, toastSuccess, toastWarning, toastPromise };
};
