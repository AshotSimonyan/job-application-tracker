import Link from "next/link";

import { buildApplicationsPageHref } from "@/features/dashboard/applications.utils";
import { ApplicationsTable } from "@/features/dashboard/components/applications-table";

import type { DashboardApplicationsViewProps } from "@/features/dashboard/types";

export const DashboardApplicationsView = ({
  applications,
  page,
  pageSize,
  search,
  totalApplications,
  totalPages,
  sortBy,
  sortDirection,
}: DashboardApplicationsViewProps) => {
  const currentPageHref = buildApplicationsPageHref({
    page,
    search,
    sortBy,
    sortDirection,
  });
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;
  const rangeStart = totalApplications === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalApplications);

  return (
    <section className="border-line bg-surface rounded-[1.5rem] border p-5 shadow-[0_24px_72px_-64px_rgba(8,22,47,0.28)] sm:p-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-brand text-xs font-semibold tracking-[0.26em] uppercase">
              Applications
            </p>
            <h1 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.04em]">
              Application tracker
            </h1>
          </div>

          <Link
            href="/dashboard/applications/new"
            className="bg-panel text-panel-foreground inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold transition-opacity hover:opacity-90"
          >
            New application
          </Link>
        </div>

        <div className="w-full max-w-xl">
          <form
            action="/dashboard/applications"
            method="get"
            className="flex w-full gap-3"
          >
            <input type="hidden" name="sort" value={sortBy} />
            <input type="hidden" name="dir" value={sortDirection} />
            <input
              type="search"
              name="q"
              defaultValue={search}
              placeholder="Search roles or companies"
              className="border-line bg-surface-alt text-foreground placeholder:text-muted/70 focus:border-brand h-11 min-w-0 flex-1 rounded-xl border px-3.5 text-sm transition-colors outline-none"
            />
            <button
              type="submit"
              className="bg-panel text-panel-foreground inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold transition-opacity hover:opacity-90"
            >
              Search
            </button>
            {search ? (
              <Link
                href={buildApplicationsPageHref({
                  search: "",
                  sortBy,
                  sortDirection,
                })}
                className="border-line bg-surface-alt text-foreground inline-flex h-11 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition-colors hover:bg-surface"
              >
                Reset
              </Link>
            ) : null}
          </form>
        </div>
      </div>

      <div className="mt-5">
        {applications.length > 0 ? (
          <>
            <ApplicationsTable
              applications={applications}
              returnTo={currentPageHref}
              sortBy={sortBy}
              sortDirection={sortDirection}
              search={search}
            />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-muted text-sm">
                Showing {rangeStart}-{rangeEnd} of {totalApplications}
              </p>

              {totalPages > 1 ? (
                <div className="flex items-center gap-3">
                  {hasPreviousPage ? (
                    <Link
                      href={buildApplicationsPageHref({
                        page: page - 1,
                        search,
                        sortBy,
                        sortDirection,
                      })}
                      className="border-line bg-surface-alt text-foreground inline-flex h-10 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition-colors hover:bg-surface"
                    >
                      Previous
                    </Link>
                  ) : (
                    <span className="border-line bg-surface-alt text-muted inline-flex h-10 cursor-not-allowed items-center justify-center rounded-xl border px-4 text-sm font-semibold opacity-60">
                      Previous
                    </span>
                  )}
                  <span className="text-muted text-sm">
                    Page {page} of {totalPages}
                  </span>
                  {hasNextPage ? (
                    <Link
                      href={buildApplicationsPageHref({
                        page: page + 1,
                        search,
                        sortBy,
                        sortDirection,
                      })}
                      className="border-line bg-surface-alt text-foreground inline-flex h-10 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition-colors hover:bg-surface"
                    >
                      Next
                    </Link>
                  ) : (
                    <span className="border-line bg-surface-alt text-muted inline-flex h-10 cursor-not-allowed items-center justify-center rounded-xl border px-4 text-sm font-semibold opacity-60">
                      Next
                    </span>
                  )}
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <div className="border-line bg-surface-alt rounded-xl border p-6">
            <h2 className="text-foreground text-xl font-semibold tracking-[-0.03em]">
              No applications found
            </h2>
            <p className="text-muted mt-3 text-sm leading-7">
              {search
                ? "Try a different search term or clear the current filter."
                : "Add your first role from the Overview page to populate this table."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
