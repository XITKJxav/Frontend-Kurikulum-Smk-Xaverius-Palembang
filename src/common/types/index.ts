import { JSX } from "@emotion/react/jsx-runtime";

export type FilterParams = {
  params: Record<string, string | number>; // Lebih ringkas dari [key: string]: string | number
};

export type APIResponse<T = void> = {
  status: boolean;
  status_code: number;
  message?: string;
  errors?: APIFieldError[];
  data: T;
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
};

export type PaginationType = {
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
};

export type APIFieldError = {
  field: string;
  message: string;
};

export type AppType =
  | "home"
  | "penugasan"
  | "jadwal"
  | "manage jurusan"
  | "setting";
export type AppTypeUser = "home" | "schedule";

export type AppList = {
  displayName: string;
  icon: JSX.Element;
  appName: AppTypeUser;
};
