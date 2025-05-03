import { useCallback, useEffect, useState } from "react";
import { useClassCoordinatorPageContext } from "../context";
import ClassCoordinatorColumn from "../common/columns";
import { Filters } from "../LIst/utils/Filters";
import { LoadingDialog } from "@components/Dialog";
import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { DataTable } from "@components/Table";
import useGetClassCoordinator from "../LIst/hook/useGetClassCoordinator";

const TabelClassCoordinator = () => {
  const [search, setSearch] = useState<string>("");
  const { fetchClassCoordinator, fetchClassRoom } = useGetClassCoordinator();
  const { state, setState } = useClassCoordinatorPageContext();

  const {
    classCoordinatorRequest,
    classCoordinatorLoading,
    filtersClassCoordinator,
  } = state;

  const columns = ClassCoordinatorColumn();

  const handleSearch = useCallback((term: string) => {
    setSearch(term);
  }, []);

  const handleFilter = useCallback(
    (onOrder: boolean, onPage: number) => {
      setState((prev) => ({
        ...prev,
        filtersClassCoordinator: {
          ...prev.filtersClassCoordinator,
          page: onPage,
          orderBy: onOrder,
        },
      }));
    },
    [setState]
  );

  useEffect(() => {
    fetchClassCoordinator(
      Filters({
        onPage: filtersClassCoordinator.page,
        onOrder: filtersClassCoordinator.orderBy,
        onSearch: search,
      })
    );
  }, [search, filtersClassCoordinator.page, filtersClassCoordinator.orderBy]);

  useEffect(() => {
    fetchClassRoom();
  }, []);

  return (
    <>
      {classCoordinatorLoading && (
        <LoadingDialog open={classCoordinatorLoading} onClose={() => {}} />
      )}
      <AppearFadeIn trigger direction="bottom" delay={0.8}>
        <DataTable
          onFilter={handleFilter}
          order={filtersClassCoordinator.orderBy}
          handleChangeSearch={handleSearch}
          onSearch={true}
          columns={columns}
          pageSize={classCoordinatorRequest?.last_page}
          data={classCoordinatorRequest?.data}
        />
      </AppearFadeIn>
    </>
  );
};

export default TabelClassCoordinator;
