import { readSearchParam } from "@/features/auth/utils";

import type {
  DashboardApplicationsSearchParams,
  DashboardApplicationsSortDirection,
  DashboardApplicationsSortField,
} from "@/features/dashboard/types";

const sortableFields: DashboardApplicationsSortField[] = [
  "updated_at",
  "title",
  "company",
  "status",
  "applied_at",
];

export const getApplicationsSortField = (
  searchParams: DashboardApplicationsSearchParams,
): DashboardApplicationsSortField => {
  const value = readSearchParam(searchParams.sort);

  if (value && sortableFields.includes(value as DashboardApplicationsSortField)) {
    return value as DashboardApplicationsSortField;
  }

  return "updated_at";
};

export const getApplicationsSortDirection = (
  searchParams: DashboardApplicationsSearchParams,
): DashboardApplicationsSortDirection => {
  const value = readSearchParam(searchParams.dir);

  return value === "asc" ? "asc" : "desc";
};

export const buildApplicationsPageHref = ({
  page = 1,
  search = "",
  sortBy,
  sortDirection,
}: {
  page?: number;
  search?: string;
  sortBy: DashboardApplicationsSortField;
  sortDirection: DashboardApplicationsSortDirection;
}) => {
  const searchParams = new URLSearchParams();

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  if (search) {
    searchParams.set("q", search);
  }

  if (sortBy !== "updated_at") {
    searchParams.set("sort", sortBy);
  }

  if (sortDirection !== "desc") {
    searchParams.set("dir", sortDirection);
  }

  const queryString = searchParams.toString();

  return queryString
    ? `/dashboard/applications?${queryString}`
    : "/dashboard/applications";
};

export const getNextSortDirection = ({
  currentField,
  currentDirection,
  nextField,
}: {
  currentField: DashboardApplicationsSortField;
  currentDirection: DashboardApplicationsSortDirection;
  nextField: DashboardApplicationsSortField;
}) => {
  if (currentField !== nextField) {
    return "asc" as const;
  }

  return currentDirection === "asc" ? "desc" : "asc";
};
