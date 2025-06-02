interface PropsJam {
  onDay?: number | string;
  idRuanganKelas?: number | string;
  kdJamPembelajaran?: number | string;
}

export const FiltersHari = (props: PropsJam) => {
  const { onDay, idRuanganKelas, kdJamPembelajaran } = props;
  return `id_hari=${onDay}`;
};
