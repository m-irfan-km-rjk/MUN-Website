'use client';

import { useEffect, useState } from "react";

const statusFilters = [
  { key: "all", label: "All" },
  { key: "available", label: "Available / Left" },
  { key: "allotted", label: "Allotted" },
];

export default function AllotmentTracker() {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ allotted: 0, available: 0 });

  const fetchRows = async () => {
    try {
      const params = new URLSearchParams({ q: query, status: statusFilter });
      const response = await fetch(`/api/allotments/sheet?${params}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load allotments");
      setRows(await response.json());

      const totalsResponse = await fetch("/api/allotments/sheet?status=all", { cache: "no-store" });
      if (totalsResponse.ok) {
        const allCountries = await totalsResponse.json();
        setTotals({
          allotted: allCountries.filter((country) => country.status === "allotted").length,
          available: allCountries.filter((country) => country.status === "available").length,
        });
      }
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
    const timer = setInterval(fetchRows, 15000);
    return () => clearInterval(timer);
  }, [query, statusFilter]);

  return (
    <section id="allotments" className="max-w-6xl mx-auto px-5 md:px-12 py-24 relative z-10">
      <div className="text-center mb-9">
        <span className="font-display text-[10px] text-gold-light tracking-[0.25em] uppercase font-bold">Live Delegate Register</span>
        <h2 className="text-4xl text-cream font-semibold mt-1 uppercase">Allotment Tracker</h2>
      </div>
      <div className="bg-maroon-dark border border-gold/60 rounded-lg p-4 md:p-6 shadow-2xl">
        <div className="grid md:grid-cols-[1fr_auto] gap-3 mb-5">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search country"
            className="w-full bg-cream text-maroon-dark border border-gold px-4 py-3 rounded outline-none focus:ring-2 focus:ring-gold-light" />
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}
            className="bg-cream text-maroon-dark border border-gold px-4 py-3 rounded min-w-40">
            {statusFilters.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
          </select>
        </div>
        <div className="flex gap-6 mb-4 text-xs font-display uppercase tracking-wider text-gold-light">
          <span>Allotted: {totals.allotted}</span><span>Available / Left: {totals.available}</span><span className="ml-auto flex items-center gap-2"><i className="w-2 h-2 rounded-full bg-gold animate-pulse" />Live</span>
        </div>
        <div className="overflow-x-auto">
          {loading ? <p className="py-10 text-center text-cream/70">Loading allotments…</p> : rows.length === 0 ? (
            <div className="py-10 text-center border border-dashed border-gold/40 rounded text-cream/75">
              No matching allotments yet. Updates appear here automatically.
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead><tr className="text-gold-light font-display text-[10px] uppercase tracking-wider border-b border-gold/30"><th className="py-3">Country / Portfolio</th><th>Status</th></tr></thead>
              <tbody>{rows.map((row) => (
                <tr key={row.name} className="border-b border-gold/10 text-cream">
                  <td className="py-3 font-semibold">{row.name}</td>
                  <td><span className={`inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-wider ${row.status === "allotted" ? "bg-gold text-maroon-dark" : "border border-gold/60 text-gold-light"}`}>{row.status === "allotted" ? "Allotted" : "Available / Left"}</span></td>
                </tr>
              ))}</tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
