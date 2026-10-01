import { useEffect, useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useNavigate } from "react-router";
import { LogOut, Users, Phone, Mail, GraduationCap, Calendar, Search, Download } from 'lucide-react';
interface Enquiry {
  id: number;
  parentName: string;
  childName: string;
  childAge: string;
  grade: string;
  phone: string;
  email: string;
  source: string;
  createdAt: string;
}
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}
function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });
}
export default function AdminEnquiries() {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetch('/api/admin/enquiries').then(r => {
      if (r.status === 401) {
        navigate('/admin/login');
        return null;
      }
      if (!r.ok) throw new Error('Failed to load');
      return r.json();
    }).then(data => {
      if (data) setEnquiries(data);
    }).catch(() => setError('Failed to load enquiries. Please refresh.')).finally(() => setLoading(false));
  }, [navigate]);
  async function handleLogout() {
    await fetch('/api/admin/logout', {
      method: 'POST'
    });
    navigate('/admin/login');
  }
  function exportCSV() {
    const headers = ['ID', 'Parent Name', 'Child Name', 'Age', 'Grade', 'Phone', 'Email', 'Source', 'Date'];
    const rows = filtered.map(e => [e.id, e.parentName, e.childName, e.childAge, e.grade, e.phone, e.email, e.source, formatDate(e.createdAt)]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], {
      type: 'text/csv'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trium-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  const filtered = enquiries.filter(e => {
    const q = search.toLowerCase();
    return !q || e.parentName.toLowerCase().includes(q) || e.childName.toLowerCase().includes(q) || e.grade.toLowerCase().includes(q) || e.phone.includes(q) || e.email.toLowerCase().includes(q);
  });

  // Stats
  const gradeCount: Record<string, number> = {};
  const sourceCount: Record<string, number> = {};
  enquiries.forEach(e => {
    gradeCount[e.grade] = (gradeCount[e.grade] || 0) + 1;
    sourceCount[e.source] = (sourceCount[e.source] || 0) + 1;
  });
  const topGrade = Object.entries(gradeCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';
  const topSource = Object.entries(sourceCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';
  return <>
      <Helmet>
        <title>Admissions Enquiries — Admin</title>
        <meta name="description" content="Admin dashboard for admissions enquiries." />
        <link rel="canonical" href="https://triumschool.in/admin/enquiries" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#F5F6FA]">
        {/* Header */}
        <header className="bg-primary text-white px-6 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <img src="/airo-assets/images/layouts/header/the-trium-school" alt="The Trium School" className="h-9 w-auto object-contain brightness-0 invert" />
            <div className="hidden sm:block h-6 w-px bg-white/30" />
            <span className="hidden sm:block text-sm font-medium text-white/80">
              Admissions Dashboard
            </span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
            <LogOut size={15} />
            <span>Sign out</span>
          </button>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="sr-only">Admissions Enquiries Dashboard</h1>
          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[{
            label: 'Total Enquiries',
            value: enquiries.length,
            icon: Users,
            color: 'text-primary'
          }, {
            label: 'This Month',
            value: enquiries.filter(e => new Date(e.createdAt).getMonth() === new Date().getMonth()).length,
            icon: Calendar,
            color: 'text-accent'
          }, {
            label: 'Top Grade',
            value: topGrade,
            icon: GraduationCap,
            color: 'text-emerald-600'
          }, {
            label: 'Top Source',
            value: topSource,
            icon: Mail,
            color: 'text-violet-600'
          }].map(stat => <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium text-gray-500">{stat.label}</p>
                  <stat.icon size={16} className={stat.color} />
                </div>
                <p className="text-2xl font-bold text-gray-900" style={{
              fontFamily: 'var(--font-heading)'
            }}>
                  {loading ? '—' : stat.value}
                </p>
              </div>)}
          </div>

          {/* Table card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Toolbar */}
            <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <h2 className="text-base font-bold text-gray-900" style={{
              fontFamily: 'var(--font-heading)'
            }}>
                All Enquiries
                {filtered.length !== enquiries.length && <span className="ml-2 text-sm font-normal text-gray-400">
                    ({filtered.length} of {enquiries.length})
                  </span>}
              </h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search by name, grade, phone…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-56" />
                </div>
                <button onClick={exportCSV} disabled={filtered.length === 0} className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40">
                  <Download size={14} />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
              </div>
            </div>

            {loading ? <div className="py-20 text-center text-gray-400 text-sm">Loading enquiries…</div> : error ? <div className="py-20 text-center text-red-500 text-sm">{error}</div> : filtered.length === 0 ? <div className="py-20 text-center text-gray-400 text-sm">
                {search ? 'No results match your search.' : 'No enquiries yet.'}
              </div> : <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      {['Date', 'Parent', 'Child', 'Age', 'Grade', 'Phone', 'Email', 'Source'].map(h => <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">
                          {h}
                        </th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map(e => <tr key={e.id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <p className="text-gray-900 font-medium">{formatDate(e.createdAt)}</p>
                          <p className="text-gray-400 text-xs">{formatTime(e.createdAt)}</p>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{e.parentName}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{e.childName}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{e.childAge}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                            {e.grade}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <a href={`tel:${e.phone}`} className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors">
                            <Phone size={12} />
                            {e.phone}
                          </a>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <a href={`mailto:${e.email}`} className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors">
                            <Mail size={12} />
                            {e.email}
                          </a>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-accent/10 text-amber-700 text-xs font-medium">
                            {e.source}
                          </span>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>}
          </div>
        </main>
      </div>
    </>;
}
