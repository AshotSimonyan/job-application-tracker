"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { getApplicationTableColumns } from "@/features/dashboard/content/application-table-columns";

import type {
  DashboardApplicationItem,
  DashboardApplicationsSortDirection,
  DashboardApplicationsSortField,
} from "@/features/dashboard/types";

type ApplicationsTableProps = {
  applications: DashboardApplicationItem[];
  returnTo: string;
  sortBy: DashboardApplicationsSortField;
  sortDirection: DashboardApplicationsSortDirection;
  search: string;
};

export const ApplicationsTable = ({
  applications,
  returnTo,
  sortBy,
  sortDirection,
  search,
}: ApplicationsTableProps) => {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: applications,
    columns: getApplicationTableColumns({
      returnTo,
      sortBy,
      sortDirection,
      search,
    }),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-muted border-line border-b px-3 py-2.5 text-left text-[11px] font-semibold tracking-[0.2em] uppercase"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="text-foreground border-line border-b px-3 py-3 align-top text-sm"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
