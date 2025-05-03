import { ClassRoomModel } from "@api/classroom/model";
import { Edit } from "@mui/icons-material";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import useUpdateClassRoomForm from "../Update/hook/useUpdateClassRoomForm";
import CardUpdateClassRoom from "../partials/CardUpdateClassRoom";

const ClassRoomColumn = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // State for dialog visibility
  const [selectedIdRuangan, setSelectedIdRuangan] = useState<number>();
  const { classRoomUpdatereqForm } = useUpdateClassRoomForm();

  const onOpen = (id?: number) => {
    id && setSelectedIdRuangan(id);
    setIsDialogOpen(!isDialogOpen);
  };

  const columns: ColumnDef<ClassRoomModel>[] = [
    {
      accessorKey: "id",
      header: "id Ruangan",
    },
    {
      accessorKey: "nama_ruangan",
      header: "Nama Ruangan",
    },
    {
      accessorKey: "jurusan.nama_jurusan",
      header: "Nama Jurusan",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: ClassRoomModel } }) => (
        <span
          className={`px-2 py-1 rounded-full text-white text-xs ${
            !row.original.status ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {!row.original.status ? "Disable" : "Active"}
        </span>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }: { row: { original: ClassRoomModel } }) =>
        format(new Date(row?.original?.created_at), "MMM dd, yyyy"),
      meta: { hideOnMobile: true },
    },
    {
      accessorKey: "update_at",
      header: "Update At",
      cell: ({ row }: { row: { original: ClassRoomModel } }) =>
        format(new Date(row?.original?.updated_at), "MMM dd, yyyy"),
      meta: { hideOnMobile: true },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }: { row: { original: ClassRoomModel } }) => (
        <>
          <button
            className="p-2 font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none"
            onClick={() => onOpen(row.original.id)}
          >
            <Edit />
          </button>
          {isDialogOpen && selectedIdRuangan === row.original.id && (
            <FormProvider {...classRoomUpdatereqForm}>
              <CardUpdateClassRoom
                isOpen={isDialogOpen}
                idClassRoom={selectedIdRuangan}
                onClose={onOpen}
              />
            </FormProvider>
          )}
        </>
      ),
    },
  ];

  return columns;
};

export default ClassRoomColumn;
