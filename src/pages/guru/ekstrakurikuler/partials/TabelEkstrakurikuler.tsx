import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { LoadingDialog } from "@components/Dialog";
import { DataTable } from "@components/Table";
import { useCallback, useEffect, useState } from "react";
import ekstrakurikulerColumn from "../common/columns";
import { useEkstrakurikulerpageContext } from "../context";
import useEkstrakurikuler from "../List/hook/useEkstrakurikuler";
import { FiltersEkstrakurikuler } from "../List/utils/filtersEkstrakurikuler";

export type Filters = {
  page: number;
  search: string;
  orderBy: boolean;
};

const TabelEkstrakurikuler = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const { fetchEkstrakurikulerRequest, fetchDayRequest, fetchClassRoom } =
    useEkstrakurikuler();
  const { state, setState } = useEkstrakurikulerpageContext();
  const { ekstrakurikulerRequest, ekstrakurikulerLoading, filters } = state;
  const { deleteEkstrakurikulerRequest } = useEkstrakurikuler();
  const columns = ekstrakurikulerColumn(deleteEkstrakurikulerRequest);

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
    fetchEkstrakurikulerRequest(
      FiltersEkstrakurikuler({
        onPage: filters.page,
        onOrder: filters.orderBy,
        onSearch: search,
      })
    );
    fetchClassRoom();
    fetchDayRequest();
  }, []);

  useEffect(() => {
    fetchData();
  }, [search, filters.page, filters.orderBy]);

  const onClose = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <>
      {ekstrakurikulerLoading && (
        <LoadingDialog open={ekstrakurikulerLoading} onClose={onClose} />
      )}
      <AppearFadeIn trigger direction="bottom" delay={0.8}>
        <DataTable
          onFilter={handleFilter}
          order={filters.orderBy}
          handleChangeSearch={onSearch}
          onSearch={true}
          columns={columns}
          pageSize={ekstrakurikulerRequest?.last_page}
          data={ekstrakurikulerRequest?.data}
        />
      </AppearFadeIn>
    </>
  );
};
export default TabelEkstrakurikuler;
