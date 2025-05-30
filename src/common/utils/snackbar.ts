import { APIResponse } from "@types";
import { enqueueSnackbar } from "notistack";

export function errMessage(err: APIResponse<object>): string {
  if (err?.message) {
    return err.message;
  }
  return "Internal Server Error";
}

const commonSnackbarStyle = {
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
  color: "rgba(255, 255, 255, 0.9)",
};

export const snackbar = {
  error: (message: string) => {
    enqueueSnackbar(message, {
      variant: "error",
      style: {
        backgroundColor: "rgba(255, 0, 0, 0.4)",
        border: "1px solid rgba(255, 0, 0, 0.9)",
        ...commonSnackbarStyle,
      },
    });
  },
  success: (message: string) => {
    enqueueSnackbar(message, {
      variant: "success",
      style: {
        backgroundColor: "rgba(0, 255, 0, 0.4)",
        border: "1px solid rgba(0, 255, 0, 0.5)",
        ...commonSnackbarStyle,
      },
    });
  },
  info: (message: string) => {
    enqueueSnackbar(message, {
      variant: "info",
      style: {
        backgroundColor: "rgba(0, 251, 255, 0.4)",
        border: "1px solid rgba(0, 251, 255, 0.5)",
        ...commonSnackbarStyle,
      },
    });
  },
  warning: (message: string) => {
    enqueueSnackbar(message, {
      variant: "warning",
      style: {
        backgroundColor: "rgba(255, 255, 0, 0.4)",
        border: "1px solid rgba(255, 255, 0, 0.5)",
        ...commonSnackbarStyle,
      },
    });
  },
};
