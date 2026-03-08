"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { applicationTableColumns } from "@/features/dashboard/content/application-table-columns";

import type { DashboardApplicationsViewProps } from "@/features/dashboard/types";

export const ApplicationsTable = ({
  applications,
}: DashboardApplicationsViewProps) => {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: applications,
    columns: applicationTableColumns,
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
                  className="text-muted border-line border-b px-4 py-3 text-left text-xs font-semibold tracking-[0.22em] uppercase"
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
                  className="text-foreground border-line border-b px-4 py-4 align-top text-sm"
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
