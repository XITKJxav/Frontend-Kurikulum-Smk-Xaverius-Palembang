import { useCallback, useEffect, useState } from "react";
import { useClassroompageContext } from "../context";
import useGetClassRoom from "../LIst/hook/useGetClassRoom";
import ClassRoomColumn from "../common/columns";
import { Filters } from "../LIst/utils/Filters";
import { LoadingDialog } from "@components/Dialog";
import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { DataTable } from "@components/Table";

const TabelClassCoordinator = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const { fetchClassRoom, fetchJurusan } = useGetClassRoom();
  const { state, setState } = useClassroompageContext();
  const { classroomRequest, classroomLoading, filtersClassRoom } = state;

  const onSearch = useCallback((term: string) => {
    setSearch(term);
  }, []);

  const handleFilter = useCallback(
    (onOrder: boolean, onPage: number) => {
      setState((prev) => ({
        ...prev,
        filtersClassRoom: {
          page: onPage,
          orderBy: onOrder,
        },
      }));
    },
    [setState]
  );

  const onClose = useCallback(() => {
    setIsOpen(!isOpen);
  }, []);

  const columns = ClassRoomColumn();

  useEffect(() => {
    fetchClassRoom(
      Filters({
        onPage: filtersClassRoom.page,
        onOrder: filtersClassRoom.orderBy,
        onSearch: search,
      })
    );
  }, [search, filtersClassRoom?.page, filtersClassRoom?.orderBy]);
  useEffect(() => {
    fetchJurusan(Filters({}));
  }, []);
  return (
    <>
      {classroomLoading && (
        <LoadingDialog open={classroomLoading} onClose={onClose} />
      )}
      <AppearFadeIn trigger direction="bottom" delay={0.8}>
        <DataTable
          onFilter={handleFilter}
          order={filtersClassRoom.orderBy}
          handleChangeSearch={onSearch}
          onSearch={true}
          columns={columns}
          pageSize={classroomRequest?.last_page}
          data={classroomRequest?.data}
        />
      </AppearFadeIn>
    </>
  );
};

export default TabelClassCoordinator;
