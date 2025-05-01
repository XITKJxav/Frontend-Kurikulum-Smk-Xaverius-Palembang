export type ClassCoordinatorResponseModel = {
  total: number;
  current_page: number;
  last_page: number;
  data: ClassCoordinatorModel[];
  first_page_url?: string;
  from?: number;
  next_page_url?: string | null;
  path: string;
  per_page: number;
  prev_page_url?: string | null;
  to?: number;
};

export type ClassCoordinatorModel = {
  kd_kepengurusan_kelas: string;
  name: string;
  id_ruang_kelas: bigint;
  access_token: string;
  refresh_token: string;
};

export type CreateClassCoordinatorModel = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  id_ruang_kelas: number;
  no_telp: string;
};

export type UpdateClassCoordinatorModel = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  id_ruang_kelas: number;
  no_telp: string;
};

export type LoginClassCoordinatorModel = {
  email: string;
  password: string;
};

export type SendVerificationCodeModel = {
  email: string;
};

export type resetPasswordModel = {
  email: string;
  otp: string;
};
