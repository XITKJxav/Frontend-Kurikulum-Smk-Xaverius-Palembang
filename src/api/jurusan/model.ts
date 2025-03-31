export type JurusanResponse = {
  total: number;
  current_page: number;
  last_page: number;
  data: JurusanModel[];
  first_page_url?: string;
  from?: number;
  next_page_url?: string | null;
  path: string;
  per_page: number;
  prev_page_url?: string | null;
  to?: number;
};

export type JurusanModel = {
  kd_jurusan: string;
  nama_jurusan: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export type JurusanCreateModel = {
  nama_jurusan: string;
};

export type JurusanUpdateModel = {
  status: boolean;
};
