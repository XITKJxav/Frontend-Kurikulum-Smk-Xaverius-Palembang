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
  color: "#ffffff",
  fontWeight: 600,
};

export const snackbar = {
  error: (message: string) => {
    enqueueSnackbar(message, {
      variant: "error",
      style: {
        backgroundColor: "#e53935",
        border: "1px solid #b71c1c",
        ...commonSnackbarStyle,
      },
    });
  },
  success: (message: string) => {
    enqueueSnackbar(message, {
      variant: "success",
      style: {
        backgroundColor: "#43a047",
        border: "1px solid #1b5e20",
        ...commonSnackbarStyle,
      },
    });
  },
  info: (message: string) => {
    enqueueSnackbar(message, {
      variant: "info",
      style: {
        backgroundColor: "#039be5",
        border: "1px solid #01579b",
        ...commonSnackbarStyle,
      },
    });
  },
  warning: (message: string) => {
    enqueueSnackbar(message, {
      variant: "warning",
      style: {
        backgroundColor: "#fdd835",
        border: "1px solid #f9a825",
        color: "#000000",
        fontWeight: 600,
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
      },
    });
  },
};
