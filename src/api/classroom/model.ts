import { JurusanModel } from "@api/jurusan/model";

export type ClassRoomReponseModel = {
  total: number;
  current_page: number;
  last_page: number;
  data: ClassRoomModel[];
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
  jurusan: JurusanModel;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export type ClassRoomCreateModel = {
  nomor_ruangan: string;
  kd_jurusan: string;
};

export type ClassRoomUpdateModel = {
  nomor_ruangan: string;
  kd_jurusan: string;
  status: boolean;
};
