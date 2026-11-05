import { useEffect, useMemo, useState } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { useNavigate } from "react-router";
import {
  Download,
  LogOut,
  Search,
  RefreshCw,
  Eye,
  ChevronDown,
  ChevronUp,
  Mail,
  Users,
  GraduationCap,
  BriefcaseBusiness,
} from "lucide-react";

type FormType = "contact" | "admissions" | "careers";
type EmailStatus = "pending" | "sent" | "failed";
type FilterType = "all" | FormType;

interface Submission {
  id: number;
  formType: FormType;
  name: string;
  email: string;
  phone: string;
  details: Record<string, unknown>;
  emailStatus: EmailStatus;
  emailErrorCode: string | null;
  createdAt: string;
}

interface ApiResponse {
  items: Submission[];
  total: number;
}

const formLabels: Record<FormType, string> = {
  contact: "Contact",
  admissions: "Admissions",
  careers: "Careers",
};

const fieldLabels: Record<string, string> = {
  parentName: "Parent / Guardian",
  childName: "Child Name",
  childAge: "Child Age",
  grade: "Grade",
  name: "Name",
  email: "Email",
  phone: "Phone",
  subject: "Subject",
  message: "Message",
  position: "Position Applied For",
  experience: "Experience",
  source: "How They Found Us",
};

const filters: FilterType[] = ["all", "admissions", "contact", "careers"];

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function displayValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "—";
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
}

// Protect CSV cells from spreadsheet formula injection.
function escapeCSV(value: unknown): string {
  const text = displayValue(value);
  const safe = /^\s*[=+\-@\t\r]/.test(text) ? "'" + text : text;

  return `"${safe.replace(/"/g, '""')}"`;
}

function EmailStatusBadge({
  status,
  errorCode,
}: {
  status: EmailStatus;
  errorCode: string | null;
}) {
  const styles = {
    sent: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
  };

  const labels = {
    sent: "Sent",
    failed: "Email Failed",
    pending: "Pending",
  };

  return (
    <div>
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
      >
        {labels[status]}
      </span>

      {errorCode && <p className="text-xs text-red-500 mt-1">{errorCode}</p>}
    </div>
  );
}

function SubmissionRow({ submission }: { submission: Submission }) {
  const [expanded, setExpanded] = useState(false);

  const extraDetails = Object.entries(submission.details || {}).filter(
    ([key]) => !["name", "email", "phone"].includes(key),
  );

  return (
    <>
      <tr className="border-b hover:bg-gray-50">
        <td className="px-4 py-4 text-sm whitespace-nowrap">
          {formatDate(submission.createdAt)}
        </td>

        <td className="px-4 py-4">
          <span className="font-medium text-sm">
            {formLabels[submission.formType]}
          </span>
        </td>

        <td className="px-4 py-4 font-medium">{submission.name}</td>

        <td className="px-4 py-4">
          <a
            href={`mailto:${submission.email}`}
            className="text-blue-600 hover:underline"
          >
            {submission.email}
          </a>
        </td>

        <td className="px-4 py-4">
          {submission.phone ? (
            <a
              href={`tel:${submission.phone}`}
              className="text-blue-600 hover:underline"
            >
              {submission.phone}
            </a>
          ) : (
            "—"
          )}
        </td>

        <td className="px-4 py-4">
          <EmailStatusBadge
            status={submission.emailStatus}
            errorCode={submission.emailErrorCode}
          />
        </td>

        <td className="px-4 py-4">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-1 text-blue-600 hover:underline"
          >
            <Eye size={15} />
            {expanded ? "Hide" : "View"}

            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </td>
      </tr>

      {expanded && (
        <tr className="border-b bg-gray-50">
          <td colSpan={7} className="px-6 py-5">
            <h3 className="font-semibold mb-4">Submission #{submission.id}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {extraDetails.length === 0 && (
                <p className="text-gray-500">
                  No additional form details available.
                </p>
              )}

              {extraDetails.map(([key, value]) => (
                <div key={key} className="rounded-lg bg-white border p-3">
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    {fieldLabels[key] || key}
                  </p>

                  <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                    {displayValue(value)}
                  </p>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminEnquiries() {
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadSubmissions(requestedPage = 1): Promise<void> {
    if (requestedPage === 1) {
      setLoading(true);
    }

    setError("");

    try {
      const response = await window.fetch(
        `/api/admin/enquiries?page=${requestedPage}`,
        {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (response.status === 401) {
        navigate("/admin/login", {
          replace: true,
        });
        return;
      }

      if (!response.ok) {
        throw new Error(
          "Unable to load submissions. Please check the database connection.",
        );
      }

      const data = (await response.json()) as ApiResponse;

      if (!Array.isArray(data.items) || typeof data.total !== "number") {
        throw new Error("Unexpected server response.");
      }

      setSubmissions((previous) => {
        if (requestedPage === 1) {
          return data.items;
        }

        const byId = new Map(previous.map((item) => [item.id, item]));

        data.items.forEach((item) => {
          byId.set(item.id, item);
        });

        return Array.from(byId.values());
      });

      setTotal(data.total);
      setPage(requestedPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadSubmissions(1);
  }, []);

  // Search and filter currently loaded submissions.
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return submissions.filter((submission) => {
      if (activeFilter !== "all" && submission.formType !== activeFilter) {
        return false;
      }

      if (!term) return true;

      const searchable = [
        submission.name,
        submission.email,
        submission.phone,
        submission.formType,
        JSON.stringify(submission.details),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(term);
    });
  }, [submissions, activeFilter, search]);

  const statistics = useMemo(() => {
    return {
      admissions: submissions.filter((item) => item.formType === "admissions")
        .length,

      contact: submissions.filter((item) => item.formType === "contact").length,

      careers: submissions.filter((item) => item.formType === "careers").length,
    };
  }, [submissions]);

  function exportCSV(): void {
    const headings = [
      "ID",
      "Form Type",
      "Submission Date",
      "Name",
      "Email",
      "Phone",
      "Email Status",
      "Email Error",
      "Form Details",
    ];

    const rows = filtered.map((item) => [
      item.id,
      formLabels[item.formType],
      formatDate(item.createdAt),
      item.name,
      item.email,
      item.phone,
      item.emailStatus,
      item.emailErrorCode || "",
      JSON.stringify(item.details),
    ]);

    const csv =
      "\uFEFF" +
      [headings, ...rows]
        .map((row) => row.map(escapeCSV).join(","))
        .join("\r\n");

    const blob = new window.Blob([csv], {
      type: "text/csv;charset=utf-8",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `trium-submissions-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  }

  async function handleLogout(): Promise<void> {
    try {
      const response = await window.fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("Sign out failed.");
      }

      navigate("/admin/login", {
        replace: true,
      });
    } catch {
      setError("Unable to sign out. Please try again.");
    }
  }

  const stats = [
    {
      title: "Total Submissions",
      value: total,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Admissions Loaded",
      value: statistics.admissions,
      icon: GraduationCap,
      color: "text-green-600",
    },
    {
      title: "Contact Loaded",
      value: statistics.contact,
      icon: Mail,
      color: "text-orange-600",
    },
    {
      title: "Careers Loaded",
      value: statistics.careers,
      icon: BriefcaseBusiness,
      color: "text-purple-600",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Form Submissions | Trium School Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-5 py-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Trium School Admin
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Website Form Submissions
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-5 py-8">
          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="bg-white rounded-xl border shadow-sm p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">{stat.title}</p>

                    <Icon size={22} className={stat.color} />
                  </div>

                  <p className="text-3xl font-bold mt-3 text-gray-900">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Main table */}
          <section className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b flex flex-wrap gap-4 items-center justify-between">
              <h2 className="text-lg font-semibold">All Form Entries</h2>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => loadSubmissions(1)}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
                >
                  <RefreshCw size={16} />
                  Refresh
                </button>

                <button
                  type="button"
                  onClick={exportCSV}
                  disabled={filtered.length === 0}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50"
                >
                  <Download size={16} />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="p-5 border-b flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === filter
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {filter === "all" ? "All Forms" : formLabels[filter]}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search submissions..."
                  aria-label="Search loaded submissions"
                  className="border rounded-lg pl-10 pr-4 py-2 text-sm w-full sm:w-64"
                />
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="m-5 rounded-lg bg-red-50 border border-red-200 p-4 text-red-600 text-sm"
              >
                {error}
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-gray-100">
                  <tr className="text-xs uppercase text-gray-600">
                    <th className="px-4 py-4">Date</th>
                    <th className="px-4 py-4">Form</th>
                    <th className="px-4 py-4">Name</th>
                    <th className="px-4 py-4">Email</th>
                    <th className="px-4 py-4">Phone</th>
                    <th className="px-4 py-4">Email Status</th>
                    <th className="px-4 py-4">Details</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((submission) => (
                    <SubmissionRow
                      key={submission.id}
                      submission={submission}
                    />
                  ))}
                </tbody>
              </table>

              {loading && (
                <div className="p-10 text-center text-gray-500">
                  Loading submissions...
                </div>
              )}

              {!loading && filtered.length === 0 && (
                <div className="p-10 text-center text-gray-500">
                  No matching submissions found.
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="p-5 border-t flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-500">
                Loaded {submissions.length} of {total} submissions. Search and
                CSV export apply to loaded entries.
              </p>

              {submissions.length < total && (
                <button
                  type="button"
                  onClick={() => loadSubmissions(page + 1)}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50"
                >
                  Load More
                </button>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
