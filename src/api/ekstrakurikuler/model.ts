export type EkstrakurikulerResponseModel = {
  total: number;
  current_page: number;
  last_page: number;
  data: EkstrakurikulerModel[];
  first_page_url?: string;
  from?: number;
  next_page_url?: string | null;
  path: string;
  per_page: number;
  prev_page_url?: string | null;
  to?: number;
};
export type EkstrakurikulerModel = {
  id: number;
  id_hari: number;
  hari: {
    nama: string;
  };
  jam_mulai_ekstra: string;
  jam_mulai_selesai: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
};

export type CreateEkstrakurikulerRequestModel = {
  id_hari: number;
  jam_mulai_ekstra: string;
  jam_mulai_selesai: string;
  deskripsi: string;
};
