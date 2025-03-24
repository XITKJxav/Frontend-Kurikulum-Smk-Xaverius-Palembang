import { JSX } from "@emotion/react/jsx-runtime";

export type FilterParams = {
  params: {
    [key: string]: string | number;
  };
};

export type APIResponse<T = void> = {
  status: boolean;
  status_code: number;
  message: string;
  errors: APIFieldError[];
  data: T;
  pagination?: PaginationType;
} | null;

export type CommonOptions = {
  value: number | string;
  label: string;
};

export type FilterType = {
  key: string;
  label: string;
  options: CommonOptions[];
};

export type FetchCallback<T> = {
  onSuccess: (data: T) => void;
  onError: (errMessage: string) => void;
  onFullfilled?: () => void;
};

export type PaginationType = {
  page: number;
  limit: number;
  total_items: number;
  total_pages: number;
};

export type APIFieldError = {
  field: string;
  message: string;
};

export type AppType = "home" | "penugasan" | "jadwal" | "logout" | "setting";
export type AppTypeUser = "home" | "schedule";

export type AppList = {
  displayName: string;
  icon: JSX.Element;
  appName: AppTypeUser;
};
