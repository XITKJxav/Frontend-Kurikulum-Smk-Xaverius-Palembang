import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { LoadingDialog } from "@components/Dialog";
import { DataTable } from "@components/Table";
import { useCallback, useEffect, useState } from "react";
import KaryawanColumn from "../common/columns";
import { useAgendaUpacarapageContext } from "../context";
import useAgendaUpacara from "../List/hook/useAgendaUpacara";
import { FiltersAgendaUpacara } from "../List/utils/filtersAgendaUpacara";

export type Filters = {
  page: number;
  search: string;
  orderBy: boolean;
};

const TabelMataPelajaran = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const { fetchAgendaUpacara, fetchStatusAgendaUpacara } = useAgendaUpacara();
  const { state, setState } = useAgendaUpacarapageContext();
  const { agendaUpacaraRequest, agendaUpacaraLoading, filters } = state;
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
    fetchAgendaUpacara(
      FiltersAgendaUpacara({
        onPage: filters.page,
        onOrder: filters.orderBy,
        onSearch: search,
      })
    );
    fetchStatusAgendaUpacara();
  }, []);

  useEffect(() => {
    fetchData();
  }, [search, filters.page, filters.orderBy]);

  const onClose = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <>
      {agendaUpacaraLoading && (
        <LoadingDialog open={agendaUpacaraLoading} onClose={onClose} />
      )}
      <AppearFadeIn trigger direction="bottom" delay={0.8}>
        <DataTable
          onFilter={handleFilter}
          order={filters.orderBy}
          handleChangeSearch={onSearch}
          onSearch={true}
          columns={columns}
          pageSize={agendaUpacaraRequest?.last_page}
          data={agendaUpacaraRequest?.data}
        />
      </AppearFadeIn>
    </>
  );
};
export default TabelMataPelajaran;
