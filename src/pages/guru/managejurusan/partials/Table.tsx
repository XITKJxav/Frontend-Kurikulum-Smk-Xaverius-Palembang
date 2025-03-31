import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { LoadingDialog } from "@components/Dialog";
import { DataTable } from "@components/Table";
import { useCallback, useEffect, useState } from "react";
import Jurusancolumns from "../common/columns";
import { usejurusanpageContext } from "../context";
import useManageJurusan from "../hook/useManageJurusan";

export type Filters = {
  page: number;
  search: string;
  orderBy: boolean;
};

const TableJurusan = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    search: "",
    orderBy: true,
  });
  const { page, search, orderBy } = filters;
  const { fetchJurusan } = useManageJurusan();
  const { state, setState } = usejurusanpageContext();
  const { jurusanRequest, manageJurusanLoading } = state;
  const columns = Jurusancolumns();
  const onSearch = useCallback((trem: string) => {
    setFilters({ ...filters, search: trem });
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setFilters({ ...filters, page: newPage });
  }, []);

  const handleOrderBy = useCallback((order: boolean) => {
    setState((prev) => ({
      ...prev,
      filters: {
        orderBy: order,
      },
    }));
    setFilters({ ...filters, orderBy: order });
  }, []);

  useEffect(() => {
    fetchJurusan(`?page=${page}&search=${search}&desc=${orderBy}`);
  }, [search, page, orderBy]);

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
          onOrder={handleOrderBy}
          order={orderBy}
          handleChangeSearch={onSearch}
          onSearch={true}
          columns={columns}
          page={page}
          pageSize={jurusanRequest?.last_page}
          onChangePage={handlePageChange}
          data={jurusanRequest.data}
        />
      </AppearFadeIn>
    </>
  );
};
export default TableJurusan;
