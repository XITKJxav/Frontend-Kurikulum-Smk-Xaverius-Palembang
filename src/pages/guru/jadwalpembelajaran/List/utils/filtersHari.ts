interface PropsJam {
  onDay?: number | string;
  idRuanganKelas?: number | string;
  kdJamPembelajaran?: number | string;
}

export const FiltersHari = (props: PropsJam) => {
  const { onDay } = props;
  return `id_hari=${onDay}`;
};
