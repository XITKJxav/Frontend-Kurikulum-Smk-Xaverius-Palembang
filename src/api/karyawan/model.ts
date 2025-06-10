export type KaryawanResponseRequestModel = {
  total: number;
  current_page: number;
  last_page: number;
  data: KaryawanModel[];
  first_page_url?: string;
  from?: number;
  next_page_url?: string | null;
  path: string;
  per_page: number;
  prev_page_url?: string | null;
  to?: number;
};

export type KaryawanModel = {
  kd_karyawan: string;
  niy: string;
  name: string;
  email: string;
  no_telp: string;
  status: string;
  password: string;
  id_role: string;
  role: RoleModel[];
  created_at: string;
  updated_at: string;
};

export type RoleModel = {
  id_role: string;
  name: string;
};

export type UpdateKaryawanRequestModel = {
  niy: string;
  name: string;
  email: string;
  no_telp: string;
  status: boolean;
  password: string;
  id_role: string;
};

export type CreateKaryawanRequestModel = {
  niy: string;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  no_telp: string;
  id_role: string;
};
