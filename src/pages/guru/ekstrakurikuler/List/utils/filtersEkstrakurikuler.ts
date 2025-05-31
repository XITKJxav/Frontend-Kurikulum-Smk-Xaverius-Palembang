interface Props {
  onPage: number;
  onOrder: boolean;
  onSearch?: string;
}

export const FiltersEkstrakurikuler = (props: Props) => {
  const { onPage, onOrder, onSearch } = props;
  return `?page=${onPage} & orderBy=${onOrder} & search=${onSearch}`;
};
