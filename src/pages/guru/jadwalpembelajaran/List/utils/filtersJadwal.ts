interface PropsJadwal {
  kdGuru: string;
  kdKelas: string;
}

export const FiltersJadwal = (props: PropsJadwal) => {
  const { kdGuru, kdKelas } = props;
  return `kd_guru=${kdGuru}&kd_kelas=${kdKelas}`;
};
