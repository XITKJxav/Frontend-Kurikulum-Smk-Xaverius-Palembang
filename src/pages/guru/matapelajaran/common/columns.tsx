import { Edit } from "@mui/icons-material";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { FormProvider } from "react-hook-form";
import { useState } from "react";
import { MataPelajaranModel } from "@api/matapelajaran/model";
import useUpdateMataPelajaranForm from "../Update/hook/useUpdateMataPelajaranForm";
import CardUpdateMataPelajaran from "../partials/CardUpdateMataPelajaran";

const mataPelajaranColumn = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedIdmataPelajaran, setSelectedIdmataPelajaran] = useState<
    string | null
  >(null);

  const { mataPelajaranUpdatereqForm } = useUpdateMataPelajaranForm();

  const handleOpenDialog = (kd_mataPelajaran: string) => {
    setSelectedIdmataPelajaran(kd_mataPelajaran);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedIdmataPelajaran(null);
    setIsDialogOpen(false);
  };

  const columns: ColumnDef<MataPelajaranModel>[] = [
    {
      accessorKey: "id_mata_pelajaran",
      header: "Id Mata Pelajaran",
    },
    {
      accessorKey: "nama",
      header: "Nama Mata Pelajaran",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: MataPelajaranModel } }) => (
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
      cell: ({ row }: { row: { original: MataPelajaranModel } }) =>
        format(new Date(row?.original?.created_at), "MMM dd, yyyy"),
      meta: { hideOnMobile: true },
    },
    {
      accessorKey: "update_at",
      header: "Update At",
      cell: ({ row }: { row: { original: MataPelajaranModel } }) =>
        format(new Date(row?.original?.updated_at), "MMM dd, yyyy"),
      meta: { hideOnMobile: true },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }: { row: { original: MataPelajaranModel } }) => (
        <>
          <button
            className="p-2 font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none"
            onClick={() => handleOpenDialog(row?.original?.id_mata_pelajaran)}
          >
            <Edit />
          </button>

          {isDialogOpen &&
            selectedIdmataPelajaran === row.original.id_mata_pelajaran && (
              <FormProvider {...mataPelajaranUpdatereqForm}>
                <CardUpdateMataPelajaran
                  isOpen={isDialogOpen}
                  id_mata_pelajaran={selectedIdmataPelajaran}
                  onClose={handleCloseDialog}
                />
              </FormProvider>
            )}
        </>
      ),
    },
  ];

  return columns;
};

export default mataPelajaranColumn;
