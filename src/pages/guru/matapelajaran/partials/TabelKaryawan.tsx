import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { LoadingDialog } from "@components/Dialog";
import { DataTable } from "@components/Table";
import { useCallback, useEffect, useState } from "react";
import { usekaryawanpageContext } from "../context";
import { FiltersKaryawan } from "../List/utils/filtersKaryawan";
import KaryawanColumn from "../common/columns";
import useKaryawan from "../List/hook/useKaryawan";

export type Filters = {
  page: number;
  search: string;
  orderBy: boolean;
};

const TabelKaryawan = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const { fetchKaryawan, fetchRole } = useKaryawan();
  const { state, setState } = usekaryawanpageContext();
  const { karyawanRequest, KaryawanLoading, filters } = state;
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
    fetchKaryawan(
      FiltersKaryawan({
        onPage: filters.page,
        onOrder: filters.orderBy,
        onSearch: search,
      })
    );
    fetchRole();
  }, []);

  useEffect(() => {
    fetchData();
  }, [search, filters.page, filters.orderBy]);

  const onClose = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <>
      {KaryawanLoading && (
        <LoadingDialog open={KaryawanLoading} onClose={onClose} />
      )}
      <AppearFadeIn trigger direction="bottom" delay={0.8}>
        <DataTable
          onFilter={handleFilter}
          order={filters.orderBy}
          handleChangeSearch={onSearch}
          onSearch={true}
          columns={columns}
          pageSize={karyawanRequest?.last_page}
          data={karyawanRequest.data}
        />
      </AppearFadeIn>
    </>
  );
};
export default TabelKaryawan;
