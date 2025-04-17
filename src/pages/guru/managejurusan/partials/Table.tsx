import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { LoadingDialog } from "@components/Dialog";
import { DataTable } from "@components/Table";
import { useCallback, useEffect, useState } from "react";
import Jurusancolumns from "../common/columns";
import { usejurusanpageContext } from "../context";
import useManageJurusan from "../List/hook/useManageJurusan";
import { FiltersJurusan } from "../List/utils/filtersJurusan";

export type Filters = {
  page: number;
  search: string;
  orderBy: boolean;
};

const TableJurusan = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const { fetchJurusan } = useManageJurusan();
  const { state, setState } = usejurusanpageContext();
  const { jurusanRequest, manageJurusanLoading, filters } = state;
  const columns = Jurusancolumns();

  const onSearch = useCallback((trem: string) => {
    setSearch(trem);
  }, []);

  const handleFilter = useCallback((onOrder: boolean, onPage: number) => {
    setState((prev) => ({
      ...prev,
      filters: {
        page: onPage,
        orderBy: onOrder,
      },
    }));
  }, []);

  useEffect(() => {
    fetchJurusan(
      FiltersJurusan({
        onPage: filters.page,
        onOrder: filters.orderBy,
        onSearch: search,
      })
    );
  }, [search, filters.page, filters.orderBy]);

  const onClose = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <>
      {manageJurusanLoading && (
        <LoadingDialog open={manageJurusanLoading} onClose={onClose} />
      )}
      <AppearFadeIn trigger direction="bottom" delay={0.8}>
        <DataTable
          onFilter={handleFilter}
          order={filters.orderBy}
          handleChangeSearch={onSearch}
          onSearch={true}
          columns={columns}
          pageSize={jurusanRequest?.last_page}
          data={jurusanRequest.data}
        />
      </AppearFadeIn>
    </>
  );
};
export default TableJurusan;
