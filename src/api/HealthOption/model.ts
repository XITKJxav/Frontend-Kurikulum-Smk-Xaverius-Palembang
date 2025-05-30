export type ClassRoomOptionModel = {
  id: number;
  nama_ruangan: string;
};

export type JurusanOptionModel = {
  kd_jurusan: string;
  nama_jurusan: string;
};

export type KaryawanOptionModel = {
  kd_karyawan: string;
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
export type RoleOptionModel = {
  id_role: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type StatusAgendaUpacaraOptionsModel = {
  id_status_upacara: string;
  nama: string;
  created_at: string;
  updated_at: string;
};

export type MataPelajaranModel = {
  id_mata_pelajaran: string;
  nama: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};
