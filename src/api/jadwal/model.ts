import { MataPelajaranModel } from "@api/HealthOption/model";
import { KaryawanModel } from "@api/karyawan/model";

export type RegulerTimeModel = {
  type: string;
  id_jam: number;
  jam_ke: number;
  jam_mulai: string;
  jam_selesai: string;
};

export type JamUpacaraModel = {
  jadwal: RegulerTimeModel[];
  ada_upacara: boolean;
  durasi_asli: number;
  tanggal_upacara: string;
  id_hari: number;
};

export type DayModel = {
  id: number;
  nama: string;
};

export type JadwalItem = {
  id_hari: number;
  kd_jam_pembelajaran: number;
  id_mata_pelajaran?: string | null;
  id_pengajar?: string | null;
  kd_guru_piket?: string | null;
};

export type JadwalItemModel = {
  id_hari: number;
  id_ruangan_kelas: number;
  kd_jam_pembelajaran: number;
  id_mata_pelajaran?: string | null;
  id_pengajar?: string | null;
  kd_guru_piket?: string | null;
};

export type CreateJadwalModel = {
  id_ruangan_kelas: number;
};

export type JadwalModel = {
  id_mata_pelajaran: string;
  id_pengajar: string;
  id_ruangan_kelas: number;
  kd_jam_pembelajaran: number;
  id_hari: number;
  mata_pelajaran: MataPelajaranModel;
  pengajar: KaryawanModel;
  guru_piket: KaryawanModel;
  kd_guru_piket: string;
  created_at: string;
  updated_at: string;
};

export type JadwalUpdateModel = {
  id_ruangan_kelas: number;
  id_hari: number;
  kd_jam_pembelajaran: number;
  id_mata_pelajaran: string;
  id_pengajar: string;
  kd_guru_piket: string;
};

export type UpdateTahunAjaranModel = {
  tahun_ajaran_awal: string;
  tahun_ajaran_akhir: string;
};
