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
  pageSize: number;
  onSearch: boolean;
  order?: boolean;
  onFilter?: (onOrder: boolean, onPage: number) => void;
  handleChangeSearch: (term: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize,
  onSearch,
  order = true,
  onFilter,
  handleChangeSearch,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState<number>(1);
  const [orderState, setOrderState] = useState<boolean>(order);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  const handleToggleOrder = () => {
    const newOrder = !orderState;
    setOrderState(newOrder);
    setPage(1);
    onFilter?.(newOrder, 1);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
    onFilter?.(orderState, newPage);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-end gap-6 mb-4">
        {onFilter && (
          <button
            onClick={handleToggleOrder}
            className="px-4 py-2 text-sm font-semibold text-white transition-all duration-300 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 focus:outline-none"
          >
            {orderState ? "asc" : "desc"}
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

      <div className="flex items-center justify-between mt-4">
        <Button
          variant="contained"
          color="primary"
          disabled={page <= 1}
          onClick={() => handleChangePage(page - 1)}
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
          onClick={() => handleChangePage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
