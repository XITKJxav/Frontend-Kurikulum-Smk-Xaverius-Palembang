import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Button,
} from "@mui/material";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { SearchBar } from "@components/Input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  pageSize: number;
  onSearch: boolean;
  order?: boolean;
  onOrder?: (order: boolean) => void;
  onChangePage: (page: number) => void;
  handleChangeSearch: (trem: string) => void;
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const {
    columns,
    data,
    page,
    pageSize,
    onSearch,
    order,
    onOrder,
    onChangePage,
    handleChangeSearch,
  } = props;

  const table = useReactTable({
    data: data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  return (
    <div>
      <div className="flex flex-wrap gap-6 justify-end mb-4">
        {onOrder && (
          <button
            onClick={() => onOrder(!order)}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition-all duration-300 focus:outline-none"
          >
            {order ? "asc" : "desc "}
          </button>
        )}

        {onSearch && (
          <SearchBar
            className="w-[25%]"
            placeholder="search..."
            onChange={handleChangeSearch}
          />
        )}
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.column.getCanSort() ? (
                      <TableSortLabel
                        active={header.column.getIsSorted() !== false}
                        direction={
                          header.column.getIsSorted() === "desc"
                            ? "desc"
                            : "asc"
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableSortLabel>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-between items-center mt-4">
        <Button
          variant="contained"
          color="primary"
          disabled={page <= 1}
          onClick={() => onChangePage(page - 1)}
        >
          Previous
        </Button>

        <span>
          Page {page} of {pageSize}
        </span>

        <Button
          variant="contained"
          color="primary"
          disabled={page >= pageSize}
          onClick={() => onChangePage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
