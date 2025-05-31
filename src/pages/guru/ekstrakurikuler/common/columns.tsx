import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { EkstrakurikulerModel } from "@api/ekstrakurikuler/model";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";

const ekstrakurikulerColumn = (
  onDelete: (id: number) => void
): ColumnDef<EkstrakurikulerModel>[] => {
  return [
    {
      accessorKey: "id",
      header: "Id Ekstrakurikuler",
    },
    {
      accessorKey: "hari.nama",
      header: "Hari",
    },
    {
      accessorKey: "jam_mulai_ekstra",
      header: "Jam Mulai",
    },
    {
      accessorKey: "jam_mulai_selesai",
      header: "Jam Selesai",
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
        <div className="flex items-center gap-2 justify-center">
          <button
            className="p-2 font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none"
            onClick={() => {}}
          >
            <Edit />
          </button>
          <button
            onClick={() => onDelete(row.original.id)}
            className="text-sm bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600 transition duration-200"
            title="Hapus"
          >
            <DeleteIcon fontSize="small" />
          </button>
        </div>
      ),
    },
  ];
};

export default ekstrakurikulerColumn;
