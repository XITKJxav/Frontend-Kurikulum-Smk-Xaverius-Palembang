import { Edit } from "@mui/icons-material";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { FormProvider } from "react-hook-form";
import { useState } from "react";
import { AgendaUpacaraModel } from "@api/agendaupacara/model";
import useUpdateAgendaUpacaraForm from "../Update/hook/useUpdateAgendaUpacaraForm";
import CardUpdateMataPelajaran from "../partials/CardUpdateAgendaUpacara";

const agendaUpacaraColumn = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedIdAgendaUpacara, setSelectedIdAgendaUpacara] = useState<
    string | null
  >(null);

  const { agendaUpacaraUpdatereqForm } = useUpdateAgendaUpacaraForm();

  const statusColor = (status: string) => {
    const baseClass = "px-2 py-1 rounded-full text-white text-xs";

    switch (status) {
      case "Completed":
        return <span className={`${baseClass} bg-green-500`}>Complated</span>;
      case "Pending":
        return <span className={`${baseClass} bg-yellow-300`}>Pending</span>;
      case "Cancelled":
        return <span className={`${baseClass} bg-red-500`}>Cancelled</span>;
      default:
        return <span className={`${baseClass} bg-gray-400`}>{status}</span>;
    }
  };

  const handleOpenDialog = (kd_agendaupacara: string) => {
    setSelectedIdAgendaUpacara(kd_agendaupacara);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedIdAgendaUpacara(null);
    setIsDialogOpen(false);
  };

  const columns: ColumnDef<AgendaUpacaraModel>[] = [
    {
      accessorKey: "kd_agendaupacara",
      header: "Id Agenda Upacara",
    },
    {
      accessorKey: "tanggal_upacara",
      header: "Tanggal Upacara",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => statusColor(row.original.status_agenda_upacara?.nama),
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) =>
        format(new Date(row.original.created_at), "MMM dd, yyyy"),
      meta: { hideOnMobile: true },
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ row }) =>
        format(new Date(row.original.updated_at), "MMM dd, yyyy"),
      meta: { hideOnMobile: true },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <>
          <button
            className="p-2 font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none"
            onClick={() => handleOpenDialog(row.original.kd_agendaupacara)}
          >
            <Edit />
          </button>

          {isDialogOpen &&
            selectedIdAgendaUpacara === row.original.kd_agendaupacara && (
              <FormProvider {...agendaUpacaraUpdatereqForm}>
                <CardUpdateMataPelajaran
                  isOpen={isDialogOpen}
                  kd_agendaupacara={selectedIdAgendaUpacara}
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

export default agendaUpacaraColumn;
