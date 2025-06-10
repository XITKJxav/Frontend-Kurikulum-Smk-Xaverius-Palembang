import { ClassRoomModel } from "@api/classcoordinator/model";
import { DayModel } from "@api/jadwal/model";

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
  id_ruang_kelas: number;
  jam_mulai_ekstra: string;
  jam_mulai_selesai: string;
  hari: DayModel;
  ruangan_kelas: ClassRoomModel;
  deskripsi: string;
  created_at: string;
  updated_at: string;
};

export type CreateEkstrakurikulerRequestModel = {
  id_hari: number;
  id_ruangan_kelas: number;
  jam_mulai_ekstra: string;
  jam_mulai_selesai: string;
  deskripsi: string;
};

export type UpdateEkstrakurikulerRequestModel = {
  id_hari: number;
  id_ruangan_kelas: number;
  jam_mulai_ekstra: string;
  jam_mulai_selesai: string;
  deskripsi: string;
};
