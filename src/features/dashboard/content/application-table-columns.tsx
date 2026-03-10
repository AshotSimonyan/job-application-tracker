import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";

import { SortIcon } from "@/components/icons/sort-icon";
import {
  buildApplicationsPageHref,
  getNextSortDirection,
} from "@/features/dashboard/applications.utils";
import { ApplicationStatusBadge } from "@/features/dashboard/components/application-status-badge";
import { ApplicationTableRowActions } from "@/features/dashboard/components/application-table-row-actions";

import type {
  DashboardApplicationItem,
  DashboardApplicationsSortDirection,
  DashboardApplicationsSortField,
} from "@/features/dashboard/types";

const columnHelper = createColumnHelper<DashboardApplicationItem>();

const renderSortableHeader = ({
  label,
  field,
  search,
  sortBy,
  sortDirection,
}: {
  label: string;
  field: DashboardApplicationsSortField;
  search: string;
  sortBy: DashboardApplicationsSortField;
  sortDirection: DashboardApplicationsSortDirection;
}) => {
  const isActive = sortBy === field;
  const nextDirection = getNextSortDirection({
    currentField: sortBy,
    currentDirection: sortDirection,
    nextField: field,
  });

  return (
    <Link
      href={buildApplicationsPageHref({
        search,
        sortBy: field,
        sortDirection: nextDirection,
      })}
      className="text-muted hover:text-foreground inline-flex items-center gap-2"
    >
      <span>{label}</span>
      <SortIcon
        className={
          isActive
            ? "text-foreground h-3.5 w-3.5"
            : "text-muted/70 h-3.5 w-3.5"
        }
      />
    </Link>
  );
};

export const getApplicationTableColumns = ({
  returnTo,
  sortBy,
  sortDirection,
  search,
}: {
  returnTo: string;
  sortBy: DashboardApplicationsSortField;
  sortDirection: DashboardApplicationsSortDirection;
  search: string;
}) => {
  return [
    columnHelper.accessor("title", {
      header: () =>
        renderSortableHeader({
          label: "Role",
          field: "title",
          search,
          sortBy,
          sortDirection,
        }),
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
      header: () =>
        renderSortableHeader({
          label: "Status",
          field: "status",
          search,
          sortBy,
          sortDirection,
        }),
      cell: ({ row, getValue }) => {
        return (
          <ApplicationStatusBadge
            status={row.original.status}
            label={getValue()}
          />
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
      header: () =>
        renderSortableHeader({
          label: "Applied",
          field: "applied_at",
          search,
          sortBy,
          sortDirection,
        }),
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
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <ApplicationTableRowActions
            applicationId={row.original.id}
            returnTo={returnTo}
          />
        );
      },
    }),
  ];
};
