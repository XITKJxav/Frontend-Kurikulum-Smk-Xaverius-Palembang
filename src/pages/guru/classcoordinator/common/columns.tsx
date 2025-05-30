import { Edit } from "@mui/icons-material";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { ClassCoordinatorModel } from "@api/classcoordinator/model";
import useUpdateClassCoordinatorForm from "../Update/hook/useUpdateClassCoordinatorForm";
import CardUpdateClassCoordinator from "../partials/CardUpdateClassCoordinator";

const ClassCoordinatorColumn = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedIdClassCoordinator, setSelectedIdclassCoordinator] =
    useState<string>();
  const { classCoordinatorUpdatereqForm } = useUpdateClassCoordinatorForm();

  const onOpen = (id?: string) => {
    id && setSelectedIdclassCoordinator(id);
    setIsDialogOpen(!isDialogOpen);
  };

  const columns: ColumnDef<ClassCoordinatorModel>[] = [
    {
      accessorKey: "kd_siswa",
      header: "kd Siswa",
    },
    {
      accessorKey: "name",
      header: "Nama Lengkap",
    },
    {
      accessorKey: "ruangan_kelas.nama_ruangan",
      header: "Nama Ruangan",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: ClassCoordinatorModel } }) => (
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
      cell: ({ row }: { row: { original: ClassCoordinatorModel } }) =>
        format(new Date(row?.original?.created_at), "MMM dd, yyyy"),
      meta: { hideOnMobile: true },
    },
    {
      accessorKey: "update_at",
      header: "Update At",
      cell: ({ row }: { row: { original: ClassCoordinatorModel } }) =>
        format(new Date(row?.original?.updated_at), "MMM dd, yyyy"),
      meta: { hideOnMobile: true },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }: { row: { original: ClassCoordinatorModel } }) => (
        <>
          <button
            type="button"
            className="p-2 font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none"
            onClick={() => onOpen(row.original.kd_siswa)}
          >
            <Edit />
          </button>
          {isDialogOpen &&
            selectedIdClassCoordinator === row.original.kd_siswa && (
              <FormProvider {...classCoordinatorUpdatereqForm}>
                <CardUpdateClassCoordinator
                  isOpen={isDialogOpen}
                  idClassCoordinator={selectedIdClassCoordinator}
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

export default ClassCoordinatorColumn;
