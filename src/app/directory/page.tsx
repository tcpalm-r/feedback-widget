"use client";

import { useState, useEffect, useCallback } from "react";

interface DirectoryUser {
  id: string;
  email: string;
  full_name: string | null;
  given_name: string | null;
  family_name: string | null;
  department: string | null;
  job_title: string | null;
  location: string | null;
  phone_number: string | null;
  avatar_url: string | null;
  manager_email: string | null;
  role: string | null;
}

interface Department {
  name: string;
  count: number;
}

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  const [users, setUsers] = useState<DirectoryUser[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedUser, setSelectedUser] = useState<DirectoryUser | null>(null);

  const totalPages = Math.ceil(total / limit);

  // Fetch departments once
  useEffect(() => {
    fetch("/api/directory/departments")
      .then((r) => r.json())
      .then((data) => setDepartments(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  // Fetch users on search/filter/page change
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set("search", search);
    if (department) params.set("department", department);

    try {
      const res = await fetch(`/api/directory/users?${params}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to load users");
      setUsers(json.data);
      setTotal(json.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [search, department, page, limit]);

  useEffect(() => {
    const id = setTimeout(fetchUsers, search ? 300 : 0);
    return () => clearTimeout(id);
  }, [fetchUsers]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Directory
          </h1>
          <span className="text-sm text-zinc-500">
            {total} {total === 1 ? "person" : "people"}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Search & Filter */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search by name, email, or department..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
          <select
            value={department}
            onChange={(e) => { setDepartment(e.target.value); setPage(1); }}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          >
            <option value="">All departments</option>
            {departments.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name} ({d.count})
              </option>
            ))}
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-12 flex justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600" />
          </div>
        )}

        {/* User Grid */}
        {!loading && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-4 text-left transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/50"
              >
                <Avatar user={user} size={40} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {user.full_name ?? user.email}
                  </p>
                  {user.job_title && (
                    <p className="truncate text-xs text-zinc-500">{user.job_title}</p>
                  )}
                  {user.department && (
                    <p className="mt-1 truncate text-xs text-zinc-400">{user.department}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && users.length === 0 && !error && (
          <p className="mt-12 text-center text-sm text-zinc-400">No results found.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300"
            >
              Previous
            </button>
            <span className="text-sm text-zinc-500">
              {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <Avatar user={selectedUser} size={56} />
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {selectedUser.full_name ?? selectedUser.email}
                </h2>
                {selectedUser.job_title && (
                  <p className="text-sm text-zinc-500">{selectedUser.job_title}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <DetailRow label="Email" value={selectedUser.email} />
              <DetailRow label="Department" value={selectedUser.department} />
              <DetailRow label="Location" value={selectedUser.location} />
              <DetailRow label="Phone" value={selectedUser.phone_number} />
              <DetailRow label="Manager" value={selectedUser.manager_email} />
              <DetailRow label="Role" value={selectedUser.role} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Avatar({ user, size }: { user: DirectoryUser; size: number }) {
  const initials = user.full_name
    ? user.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : user.email[0].toUpperCase();

  if (user.avatar_url) {
    return (
      <img
        src={user.avatar_url}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4">
      <span className="text-zinc-400">{label}</span>
      <span className="truncate text-right text-zinc-700 dark:text-zinc-300">{value}</span>
    </div>
  );
}
