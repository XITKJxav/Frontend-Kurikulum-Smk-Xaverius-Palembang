interface Props {
  onPage: number;
  onOrder: boolean;
  onSearch?: string;
}
const FiltersAGendaUpacara = (props: Props) => {
  const { onPage, onOrder, onSearch } = props;
  return `?status=${onPage} & orderBy=${onOrder} & search=${onSearch}`;
};
