import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import { useNavigate } from "react-router";
import {
  Download,
  LogOut,
  Search,
  RefreshCw,
  Trash2,
  X,
  Eye,
  CalendarDays,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

type FormType = "contact" | "admissions" | "careers";
type EmailStatus = "pending" | "sent" | "failed";
type Submission = {
  id: number;
  formType: FormType;
  name: string;
  email: string;
  phone: string;
  details: Record<string, unknown>;
  emailStatus: EmailStatus;
  emailErrorCode: string | null;
  createdAt: string;
};
type ApiResult = { items: Submission[]; total: number };
type Tab = "all" | FormType;
const tabs: Tab[] = ["all", "admissions", "contact", "careers"];
const label: Record<FormType, string> = {
  admissions: "Admissions",
  contact: "Contact",
  careers: "Careers",
};
const fieldLabels: Record<string, string> = {
  parentName: "Parent / guardian",
  childName: "Child",
  childAge: "Child age",
  grade: "Grade",
  source: "How they found us",
  subject: "Subject",
  message: "Message / Cover note",
  position: "Position",
  experience: "Experience",
};

function cell(value: unknown): string {
  return typeof value === "object" && value !== null
    ? JSON.stringify(value)
    : String(value ?? "");
}
function csvSafe(value: unknown): string {
  const valueString = cell(value);
  const safe = /^\s*[=+\-@\t\r]/.test(valueString)
    ? `'${valueString}`
    : valueString;
  return `"${safe.replace(/"/g, '""')}"`;
}

/** Read-only submission detail modal. Keeps the table height unchanged. */
function SubmissionDetailsModal({
  submission,
  onClose,
}: {
  submission: Submission;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const details = Object.entries(submission.details ?? {}).filter(
    ([key]) => !["name", "email", "phone"].includes(key),
  );

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  const statusStyle =
    submission.emailStatus === "sent"
      ? "bg-green-100 text-green-700"
      : submission.emailStatus === "failed"
        ? "bg-red-100 text-red-700"
        : "bg-amber-100 text-amber-700";
  const statusText =
    submission.emailStatus === "sent"
      ? "Email sent"
      : submission.emailStatus === "failed"
        ? "Email failed"
        : "Email pending";

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] overflow-y-auto bg-slate-950/65 p-3 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="flex min-h-full items-center justify-center py-4"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="submission-dialog-title"
          className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          <div className="flex items-start justify-between gap-4 bg-primary px-5 py-5 text-white sm:px-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                {label[submission.formType]} form
              </p>
              <h2
                id="submission-dialog-title"
                className="mt-1 text-xl font-bold sm:text-2xl"
              >
                Submission details
              </h2>
              <p className="mt-1 text-sm text-white/75">
                Reference #{submission.id}
              </p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close submission details"
              title="Close"
              onClick={onClose}
              className="rounded-lg p-2 text-white hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <X size={22} />
            </button>
          </div>

          <div className="max-h-[min(70vh,700px)] overflow-y-auto px-5 py-6 sm:px-7">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CalendarDays size={17} />
                <span>
                  {new Date(submission.createdAt).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="text-right">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
                >
                  {statusText}
                </span>
                {submission.emailErrorCode && (
                  <p className="mt-1 text-xs text-gray-500">
                    Error: {submission.emailErrorCode}
                  </p>
                )}
              </div>
            </div>

            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-600">
              Applicant / visitor
            </h3>
            <div className="mb-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase text-gray-500">
                  <UserRound size={14} /> Name
                </p>
                <p className="break-words font-semibold text-gray-900">
                  {submission.name || "—"}
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase text-gray-500">
                  <Phone size={14} /> Phone
                </p>
                {submission.phone ? (
                  <a
                    href={`tel:${submission.phone}`}
                    className="break-all text-primary hover:underline"
                  >
                    {submission.phone}
                  </a>
                ) : (
                  <span className="text-gray-500">—</span>
                )}
              </div>
              <div className="rounded-xl border border-gray-200 p-4 sm:col-span-2">
                <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase text-gray-500">
                  <Mail size={14} /> Email address
                </p>
                <a
                  href={`mailto:${submission.email}`}
                  className="break-all text-primary hover:underline"
                >
                  {submission.email}
                </a>
              </div>
            </div>

            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-600">
              {label[submission.formType]} form information
            </h3>
            {details.length ? (
              <dl className="grid gap-3 sm:grid-cols-2">
                {details.map(([key, value]) => (
                  <div
                    key={key}
                    className="min-w-0 rounded-xl border border-gray-200 p-4"
                  >
                    <dt className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {fieldLabels[key] ??
                        key.replace(/([a-z])([A-Z])/g, "$1 $2")}
                    </dt>
                    <dd className="whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-900">
                      {cell(value) || "—"}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                No additional information.
              </p>
            )}
          </div>

          <div className="flex justify-end border-t bg-gray-50 px-5 py-4 sm:px-7">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function AdminEnquiries() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<Submission | null>(null);
  const closeModal = useCallback(() => setViewing(null), []);
  const [selected, setSelected] = useState<Set<number>>(() => new Set());

  async function load(nextPage: number) {
    setLoading(true);
    setError("");
    try {
      const response = await globalThis.fetch(
        `/api/admin/enquiries?page=${nextPage}`,
        {
          credentials: "same-origin",
          cache: "no-store",
        },
      );
      if (response.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }
      if (!response.ok)
        throw new Error("Unable to load submissions from the database.");
      const data = (await response.json()) as ApiResult;
      if (!Array.isArray(data.items) || !Number.isFinite(data.total)) {
        throw new Error("The server returned invalid submission data.");
      }
      setItems((previous) =>
        nextPage === 1 ? data.items : [...previous, ...data.items],
      );
      setTotal(data.total);
      setPage(nextPage);
      if (nextPage === 1) setSelected(new Set());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load submissions.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load(1);
  }, []);

  const visible = useMemo(
    () =>
      items.filter((item) => {
        if (tab !== "all" && item.formType !== tab) return false;
        const haystack = [
          item.name,
          item.email,
          item.phone,
          item.formType,
          JSON.stringify(item.details),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(search.trim().toLowerCase());
      }),
    [items, tab, search],
  );
  const selectedVisibleIds = visible
    .filter((item) => selected.has(item.id))
    .map((item) => item.id);
  const allVisibleSelected =
    visible.length > 0 && selectedVisibleIds.length === visible.length;

  function toggleSelected(id: number) {
    setSelected((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleAllVisible() {
    setSelected((previous) => {
      const next = new Set(previous);
      if (allVisibleSelected) visible.forEach((item) => next.delete(item.id));
      else visible.forEach((item) => next.add(item.id));
      return next;
    });
  }

  async function deleteEntries(ids: number[]) {
    if (ids.length === 0 || deleting) return;
    const text =
      ids.length === 1
        ? "Permanently delete this submission from the database? This cannot be undone."
        : `Permanently delete ${ids.length} selected submissions from the database? This cannot be undone.`;
    if (!window.confirm(text)) return;

    setDeleting(true);
    setError("");
    setMessage("");
    let failedMessage = "";
    try {
      let removed = 0;
      // Keep requests small; the backend accepts at most 100 IDs per request.
      for (let index = 0; index < ids.length; index += 100) {
        const batch = ids.slice(index, index + 100);
        const response = await globalThis.fetch("/api/admin/enquiries", {
          method: "DELETE",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: batch }),
        });
        if (response.status === 401) {
          navigate("/admin/login", { replace: true });
          return;
        }
        const payload = (await response.json().catch(() => null)) as {
          ok?: boolean;
          deleted?: number;
          error?: string;
        } | null;
        if (!response.ok || !payload?.ok) {
          throw new Error(
            payload?.error || `Delete failed (HTTP ${response.status}).`,
          );
        }
        removed += payload.deleted ?? 0;
      }
      setViewing(null);
      setMessage(
        `${removed} submission${removed === 1 ? "" : "s"} deleted successfully.`,
      );
    } catch (err) {
      failedMessage =
        err instanceof Error ? err.message : "Could not delete entries.";
    } finally {
      // Reload from MySQL, even after a partial bulk-delete failure.
      await load(1);
      if (failedMessage) setError(failedMessage);
      setDeleting(false);
    }
  }

  function exportCSV() {
    const rows = [
      [
        "ID",
        "Form",
        "Submitted",
        "Name",
        "Email",
        "Phone",
        "Email Status",
        "Email Error",
        "All Form Fields",
      ],
      ...visible.map((item) => [
        item.id,
        label[item.formType],
        item.createdAt,
        item.name,
        item.email,
        item.phone,
        item.emailStatus,
        item.emailErrorCode ?? "",
        JSON.stringify(item.details),
      ]),
    ];
    const csv =
      "\ufeff" + rows.map((row) => row.map(csvSafe).join(",")).join("\r\n");
    const url = globalThis.URL.createObjectURL(
      new globalThis.Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `trium-form-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    globalThis.URL.revokeObjectURL(url);
  }

  async function signOut() {
    const response = await globalThis.fetch("/api/admin/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    if (response.ok) navigate("/admin/login", { replace: true });
    else setError("Could not sign out. Please try again.");
  }

  return (
    <>
      <Helmet>
        <title>Form Submissions — Trium School Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-[#F5F6FA]">
        <header className="bg-primary text-white px-6 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <img
              src="/airo-assets/images/layouts/header/the-trium-school"
              alt="The Trium School"
              className="h-9 w-auto bg-white rounded p-1"
            />
            <span className="font-semibold">Form Submissions — Admin</span>
          </div>
          <button
            type="button"
            onClick={() => void signOut()}
            className="inline-flex items-center gap-2 text-sm hover:underline"
          >
            <LogOut size={16} /> Sign out
          </button>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              ["Total submissions", total],
              [
                "Admissions loaded",
                items.filter((i) => i.formType === "admissions").length,
              ],
              [
                "Contact loaded",
                items.filter((i) => i.formType === "contact").length,
              ],
              [
                "Careers loaded",
                items.filter((i) => i.formType === "careers").length,
              ],
            ].map(([heading, number]) => (
              <div
                key={String(heading)}
                className="bg-white border rounded-xl p-4 shadow-sm"
              >
                <p className="text-xs text-gray-500">{heading}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {number}
                </p>
              </div>
            ))}
          </div>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 flex flex-wrap gap-3 items-center justify-between border-b">
              <div className="flex flex-wrap gap-2">
                {tabs.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTab(t);
                      setSelected(new Set());
                    }}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold ${tab === t ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
                  >
                    {t === "all" ? "All forms" : label[t]}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search
                    size={15}
                    className="absolute top-3 left-3 text-gray-500"
                  />
                  <input
                    aria-label="Search loaded submissions"
                    type="search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setSelected(new Set());
                    }}
                    placeholder="Search loaded entries"
                    className="rounded-lg border pl-9 pr-3 py-2 text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => void load(1)}
                  disabled={loading || deleting}
                  title="Refresh"
                  className="border rounded-lg px-3 py-2 disabled:opacity-50"
                >
                  <RefreshCw size={16} />
                </button>
                <button
                  type="button"
                  onClick={exportCSV}
                  disabled={visible.length === 0 || deleting}
                  className="border rounded-lg px-3 py-2 text-sm flex items-center gap-2 disabled:opacity-40"
                >
                  <Download size={16} /> Export visible
                </button>
              </div>
            </div>

            <div className="px-5 py-3 flex flex-wrap items-center gap-3 border-b bg-gray-50">
              <span className="text-sm text-gray-600">
                {selectedVisibleIds.length} selected (visible entries)
              </span>
              <button
                type="button"
                disabled={
                  selectedVisibleIds.length === 0 || loading || deleting
                }
                onClick={() => void deleteEntries(selectedVisibleIds)}
                className="rounded-lg bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm inline-flex items-center gap-2 disabled:opacity-40"
              >
                <Trash2 size={15} />{" "}
                {deleting ? "Deleting…" : "Delete selected"}
              </button>
            </div>

            {error && (
              <p role="alert" className="text-red-700 bg-red-50 px-5 py-3">
                {error}
              </p>
            )}
            {message && (
              <p role="status" className="text-green-700 bg-green-50 px-5 py-3">
                {message}
              </p>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 text-left">
                  <tr>
                    <th className="px-4 py-3">
                      <input
                        type="checkbox"
                        aria-label="Select all visible submissions"
                        checked={allVisibleSelected}
                        onChange={toggleAllVisible}
                        disabled={loading || deleting}
                      />
                    </th>
                    {[
                      "Date",
                      "Form",
                      "Name",
                      "Email",
                      "Phone",
                      "Email status",
                      "Details",
                      "Actions",
                    ].map((h) => (
                      <th key={h} className="px-4 py-3 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {visible.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 align-top">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          aria-label={`Select submission ${item.id}`}
                          checked={selected.has(item.id)}
                          onChange={() => toggleSelected(item.id)}
                          disabled={deleting}
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                        })}
                      </td>
                      <td className="px-4 py-3">{label[item.formType]}</td>
                      <td className="px-4 py-3 font-semibold">{item.name}</td>
                      <td className="px-4 py-3">
                        <a
                          href={`mailto:${item.email}`}
                          className="text-primary"
                        >
                          {item.email}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`tel:${item.phone}`} className="text-primary">
                          {item.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            item.emailStatus === "sent"
                              ? "bg-green-100 text-green-700"
                              : item.emailStatus === "failed"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {item.emailStatus === "sent"
                            ? "Sent"
                            : item.emailStatus === "failed"
                              ? "Email failed"
                              : "Pending"}
                        </span>
                        {item.emailErrorCode && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item.emailErrorCode}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => setViewing(item)}
                          className="inline-flex items-center gap-1 text-primary underline"
                          aria-label={`View details for submission ${item.id}`}
                        >
                          <Eye size={14} /> View
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => void deleteEntries([item.id])}
                          disabled={deleting || loading}
                          title="Permanently delete submission"
                          className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 disabled:opacity-40"
                        >
                          <Trash2 size={15} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {loading && (
                <p className="p-6 text-center text-gray-500">
                  Loading submissions…
                </p>
              )}
              {!loading && visible.length === 0 && (
                <p className="p-10 text-center text-gray-500">
                  No matching submissions.
                </p>
              )}
            </div>
            <div className="flex items-center justify-between gap-3 p-4 border-t text-sm text-gray-500 flex-wrap">
              <span>
                Loaded {items.length} of {total} submissions. Search, selection
                and export apply to loaded entries.
              </span>
              {items.length < total && (
                <button
                  type="button"
                  disabled={loading || deleting}
                  onClick={() => void load(page + 1)}
                  className="bg-primary text-white rounded-lg px-4 py-2 disabled:opacity-50"
                >
                  {loading ? "Loading…" : "Load more"}
                </button>
              )}
            </div>
          </section>
        </main>
      </div>
      {viewing && (
        <SubmissionDetailsModal submission={viewing} onClose={closeModal} />
      )}
    </>
  );
}
