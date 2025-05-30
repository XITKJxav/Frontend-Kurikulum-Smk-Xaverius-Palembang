interface Props {
  onDay?: number | string;
}

export const FiltersJadwal = (props: Props) => {
  const { onDay } = props;
  return `id_hari=${onDay || 1}`;
};
