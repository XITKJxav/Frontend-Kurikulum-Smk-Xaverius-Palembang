import { JurusanModel } from "@api/jurusan/model";
import { Edit } from "@mui/icons-material";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import CardUpdateProgramJurusan from "../partials/CardUpdateProgramJurusan";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import useUpdateJurusanForm from "../Update/hook/useUpdateProgramJurusanForm";

const JurusanColumn = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedKdJurusan, setSelectedKdJurusan] = useState<string | null>(
    null
  );

  const { jurusanUpdatereqForm } = useUpdateJurusanForm();

  const handleOpenDialog = (kd_jurusan: string) => {
    setSelectedKdJurusan(kd_jurusan);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedKdJurusan(null);
    setIsDialogOpen(false);
  };

  const columns: ColumnDef<JurusanModel>[] = [
    {
      accessorKey: "kd_jurusan",
      header: "Kd Jurusan",
    },
    {
      accessorKey: "nama_jurusan",
      header: "Nama Jurusan",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: JurusanModel } }) => (
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
      cell: ({ row }: { row: { original: JurusanModel } }) =>
        format(new Date(row?.original?.created_at), "MMM dd, yyyy"),
      meta: { hideOnMobile: true },
    },
    {
      accessorKey: "update_at",
      header: "Update At",
      cell: ({ row }: { row: { original: JurusanModel } }) =>
        format(new Date(row?.original?.updated_at), "MMM dd, yyyy"),
      meta: { hideOnMobile: true },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }: { row: { original: JurusanModel } }) => (
        <>
          <button
            className="bg-yellow-500 text-white font-semibold p-2 rounded-lg hover:bg-yellow-600 focus:outline-none"
            onClick={() => handleOpenDialog(row.original.kd_jurusan)}
          >
            <Edit />
          </button>

          {isDialogOpen && selectedKdJurusan === row.original.kd_jurusan && (
            <FormProvider {...jurusanUpdatereqForm}>
              <CardUpdateProgramJurusan
                isOpen={isDialogOpen}
                kd_jurusan={selectedKdJurusan}
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

export default JurusanColumn;
