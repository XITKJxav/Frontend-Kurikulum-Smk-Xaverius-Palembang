interface PropsJadwal {
  kdGuru: string;
  kdKelas: string;
  day: number;
}

export const FiltersJadwal = (props: PropsJadwal) => {
  const { kdGuru, kdKelas, day } = props;
  return `kd_guru=${kdGuru}&kd_kelas=${kdKelas}&id_hari=${day}`;
};
