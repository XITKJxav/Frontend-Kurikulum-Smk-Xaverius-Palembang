interface PropsJam {
  onDay?: number | string;
  idRuanganKelas?: number | string;
  kdJamPembelajaran?: number | string;
}

export const FiltersHari = (props: PropsJam) => {
  const { onDay, idRuanganKelas, kdJamPembelajaran } = props;
  return `id_hari=${onDay || 1}&id_ruangan_kelas=${
    idRuanganKelas || 1
  }&kd_jam_pembelajaran=${kdJamPembelajaran || 1}`;
};
