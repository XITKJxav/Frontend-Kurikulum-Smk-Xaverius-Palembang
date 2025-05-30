export type AgendaUpacaraResponseModel = {
  total: number;
  current_page: number;
  last_page: number;
  data: AgendaUpacaraModel[];
  first_page_url?: string;
  from?: number;
  next_page_url?: string | null;
  path: string;
  per_page: number;
  prev_page_url?: string | null;
  to?: number;
};

export type AgendaUpacaraModel = {
  kd_agendaupacara: string;
  tanggal_upacara: string;
  id_status_upacara: string;
  created_at: string;
  updated_at: string;
  status_agenda_upacara: StatusAgendaUpacaraModel;
};

export type StatusAgendaUpacaraModel = {
  id_status_upacara: string;
  nama: string;
  created_at: string;
  updated_at: string;
};

export type CreateAgendaUpacaraModel = {
  tanggal_upacara: string;
};

export type UpdateAgendaUpacaraModel = {
  id_status_upacara: string;
};
