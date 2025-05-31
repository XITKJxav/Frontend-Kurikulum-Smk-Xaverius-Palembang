interface PropsJadwal {
  kdGuruPiket: string;
  kdKelas: string;
}

export const FiltersJadwal = (props: PropsJadwal) => {
  const { kdGuruPiket, kdKelas } = props;
  return `kd_piket=${kdGuruPiket}&kd_kelas=${kdKelas}`;
};
