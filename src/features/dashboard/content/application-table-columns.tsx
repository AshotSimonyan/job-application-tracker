import Link from "next/link";
import {
  createColumnHelper,
} from "@tanstack/react-table";

import type { DashboardApplicationItem } from "@/features/dashboard/types";

const columnHelper = createColumnHelper<DashboardApplicationItem>();

export const applicationTableColumns = [
  columnHelper.accessor("title", {
    header: "Role",
    cell: ({ row }) => {
      return (
        <div>
          <p className="text-foreground font-semibold">{row.original.title}</p>
          <p className="text-muted mt-1 text-sm">{row.original.company}</p>
        </div>
      );
    },
  }),
  columnHelper.accessor("statusLabel", {
    header: "Status",
    cell: ({ getValue }) => {
      return (
        <span className="bg-brand/10 text-brand inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase">
          {getValue()}
        </span>
      );
    },
  }),
  columnHelper.accessor("location", {
    header: "Location",
    cell: ({ getValue }) => getValue() || "Not set",
  }),
  columnHelper.accessor("source", {
    header: "Source",
    cell: ({ getValue }) => getValue() || "Not set",
  }),
  columnHelper.accessor("appliedAtLabel", {
    header: "Applied",
    cell: ({ getValue }) => getValue() || "Not set",
  }),
  columnHelper.accessor("resumeName", {
    header: "Resume",
    cell: ({ getValue }) => getValue() || "No resume",
  }),
  columnHelper.accessor("url", {
    header: "Link",
    cell: ({ getValue }) => {
      const value = getValue();

      if (!value) {
        return <span className="text-muted">None</span>;
      }

      return (
        <Link
          href={value}
          target="_blank"
          rel="noreferrer"
          className="text-brand font-semibold"
        >
          Open
        </Link>
      );
    },
  }),
];
