interface Props {
  onPage?: number;
  onOrder?: boolean;
  onSearch?: string;
}

export const Filters = (props: Props) => {
  const { onPage, onOrder, onSearch } = props;

  let params = "";

  if (onPage) {
    params += `page=${onPage ?? 0}`;
  }

  if (onOrder != undefined) {
    params += `&orderBy=${onOrder}`;
  }

  if (onSearch) {
    params += `&search=${onSearch}`;
  }

  return params;
};
