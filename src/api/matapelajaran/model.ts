export type MataPelajaranResponseRequestModel = {
  total: number;
  current_page: number;
  last_page: number;
  data: MataPelajaranModel[];
  first_page_url?: string;
  from?: number;
  next_page_url?: string | null;
  path: string;
  per_page: number;
  prev_page_url?: string | null;
};

export type MataPelajaranModel = {
  id_mata_pelajaran: string;
  nama: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateMataPelajaranRequestModel = {
  nama: string;
};

export type UpdateMataPelajaranRequestModel = {
  nama: string;
  status: boolean;
};
