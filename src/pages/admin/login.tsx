import React, { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useNavigate } from "react-router";
export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password
        })
      });
      if (res.ok) {
        navigate('/admin/enquiries');
      } else {
        setError('Incorrect password. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  return <>
      <Helmet>
        <title>Admin Login — The Trium School</title>
        <meta name="description" content="Admin login for The Trium School." />
        <link rel="canonical" href="https://triumschool.in/admin/login" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <img src="/airo-assets/images/layouts/header/the-trium-school" alt="The Trium School" className="h-12 w-auto mx-auto mb-6 object-contain" />
            <h1 className="text-2xl font-bold text-foreground" style={{
            fontFamily: 'var(--font-heading)'
          }}>
              Admin Access
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Enter your password to view admissions enquiries
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="mb-5">
              <label htmlFor="password" className="block text-xs font-semibold text-foreground mb-1.5">
                Password
              </label>
              <input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" placeholder="Enter admin password" />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </main>
    </>;
}
