import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { LoadingDialog } from "@components/Dialog";
import { DataTable } from "@components/Table";
import { useCallback, useEffect, useState } from "react";
import { useMataPelajaranpageContext } from "../context";
import KaryawanColumn from "../common/columns";
import useMataPelajaran from "../List/hook/useMataPelajaran";
import { FiltersMataPelajaran } from "../List/utils/filtersMataPelajaran";

export type Filters = {
  page: number;
  search: string;
  orderBy: boolean;
};

const TabelMataPelajaran = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const { fetchMataPelajaran } = useMataPelajaran();
  const { state, setState } = useMataPelajaranpageContext();
  const { mataPelajaranRequest, mataPelajaranLoading, filters } = state;
  const columns = KaryawanColumn();

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
  const fetchData = useCallback(() => {
    fetchMataPelajaran(
      FiltersMataPelajaran({
        onPage: filters.page,
        onOrder: filters.orderBy,
        onSearch: search,
      })
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, [search, filters.page, filters.orderBy]);

  const onClose = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <>
      {mataPelajaranLoading && (
        <LoadingDialog open={mataPelajaranLoading} onClose={onClose} />
      )}
      <AppearFadeIn trigger direction="bottom" delay={0.8}>
        <DataTable
          onFilter={handleFilter}
          order={filters.orderBy}
          handleChangeSearch={onSearch}
          onSearch={true}
          columns={columns}
          pageSize={mataPelajaranRequest?.last_page}
          data={mataPelajaranRequest?.data}
        />
      </AppearFadeIn>
    </>
  );
};
export default TabelMataPelajaran;
