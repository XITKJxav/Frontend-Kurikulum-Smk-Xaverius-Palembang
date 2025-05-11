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

export type ClassRoomModel = {
  id: number;
  nama_ruangan: string;
  kd_jurusan: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export type ClassCoordinatorModel = {
  kd_kepengurusan_kelas: string;
  name: string;
  email: string;
  no_telp: string;
  id_ruang_kelas: bigint;
  ruangan_kelas: ClassRoomModel;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export type ClassCoordinatorSigninResponseModel = {
  status: boolean;
  status_code: number;
  data: SignInClassCoordinatorDataModel[];
};

export type SignInClassCoordinatorDataModel = {
  kd_pengurus_kelas: string;
  name: string;
  id_ruang_kelas: string;
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
  id_ruang_kelas: number;
  no_telp: string;
  status: boolean;
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
