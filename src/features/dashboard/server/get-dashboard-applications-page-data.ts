import { createServerSupabaseClient } from "@/lib/supabase/server";
import { readSearchParam } from "@/features/auth/utils";
import {
  getApplicationsSortDirection,
  getApplicationsSortField,
} from "@/features/dashboard/applications.utils";
import { getApplicationStatusLabel } from "@/features/dashboard/utils";

import type {
  ApplicationStatus,
  DashboardApplicationItem,
  DashboardApplicationsPageData,
  DashboardApplicationsSearchParams,
} from "@/features/dashboard/types";

const pageSize = 10;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const formatDate = (value: string) => {
  return dateFormatter.format(new Date(value));
};

const getUpdatedLabel = (
  appliedAt: string | null,
  updatedAt: string,
  createdAt: string,
) => {
  if (appliedAt) {
    return `Applied ${formatDate(appliedAt)}`;
  }

  return `Updated ${formatDate(updatedAt || createdAt)}`;
};

const getSearchValue = (searchParams: DashboardApplicationsSearchParams) => {
  return readSearchParam(searchParams.q)?.trim() ?? "";
};

const getPageValue = (searchParams: DashboardApplicationsSearchParams) => {
  const rawPage = Number.parseInt(readSearchParam(searchParams.page) ?? "1", 10);

  if (Number.isNaN(rawPage) || rawPage < 1) {
    return 1;
  }

  return rawPage;
};

const buildApplications = (
  applications: {
    id: string;
    title: string;
    company: string;
    location: string | null;
    source: string | null;
    url: string | null;
    status: ApplicationStatus;
    notes: string | null;
    resume_id: string | null;
    applied_at: string | null;
    created_at: string;
    updated_at: string;
  }[],
  resumeMap: Map<string, string>,
): DashboardApplicationItem[] => {
  return applications.map((application) => ({
    id: application.id,
    title: application.title,
    company: application.company,
    location: application.location,
    source: application.source,
    url: application.url,
    status: application.status,
    statusLabel: getApplicationStatusLabel(application.status),
    notes: application.notes,
    resumeId: application.resume_id,
    resumeName: application.resume_id
      ? (resumeMap.get(application.resume_id) ?? null)
      : null,
    appliedAt: application.applied_at,
    appliedAtLabel: application.applied_at
      ? formatDate(application.applied_at)
      : null,
    createdAt: application.created_at,
    updatedAt: application.updated_at,
    updatedLabel: getUpdatedLabel(
      application.applied_at,
      application.updated_at,
      application.created_at,
    ),
  }));
};

export const getDashboardApplicationsPageData = async (
  searchParams: DashboardApplicationsSearchParams,
): Promise<DashboardApplicationsPageData> => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      applications: [],
      page: 1,
      pageSize,
      search: "",
      totalApplications: 0,
      totalPages: 1,
      sortBy: "updated_at",
      sortDirection: "desc",
    };
  }

  const search = getSearchValue(searchParams);
  const requestedPage = getPageValue(searchParams);
  const sortBy = getApplicationsSortField(searchParams);
  const sortDirection = getApplicationsSortDirection(searchParams);
  const rangeFrom = (requestedPage - 1) * pageSize;
  const rangeTo = rangeFrom + pageSize - 1;

  let countQuery = supabase
    .from("job_applications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  let dataQuery = supabase
    .from("job_applications")
    .select(
      "id, title, company, location, source, url, status, notes, resume_id, applied_at, created_at, updated_at",
    )
    .eq("user_id", user.id)
    .order(sortBy, {
      ascending: sortDirection === "asc",
      nullsFirst: false,
    });

  if (search) {
    const normalized = search.replaceAll(",", " ");
    const filter = `title.ilike.%${normalized}%,company.ilike.%${normalized}%,location.ilike.%${normalized}%,source.ilike.%${normalized}%`;

    countQuery = countQuery.or(filter);
    dataQuery = dataQuery.or(filter);
  }

  const [{ count }, { data: applicationRows }, { data: resumeRows }] = await Promise.all([
    countQuery,
    dataQuery.range(rangeFrom, rangeTo),
    supabase.from("resumes").select("id, name").eq("user_id", user.id),
  ]);

  const totalApplications = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalApplications / pageSize));
  const page = Math.min(requestedPage, totalPages);

  let rows = applicationRows ?? [];

  if (page !== requestedPage) {
    const { data } = await dataQuery.range(
      (page - 1) * pageSize,
      page * pageSize - 1,
    );

    rows = data ?? [];
  }

  const resumeMap = new Map((resumeRows ?? []).map((resume) => [resume.id, resume.name]));

  return {
    applications: buildApplications(rows, resumeMap),
    page,
    pageSize,
    search,
    totalApplications,
    totalPages,
    sortBy,
    sortDirection,
  };
};
