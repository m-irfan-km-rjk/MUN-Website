'use client';

import { useEffect, useMemo, useState } from "react";

const committees = ["All", "UNGA", "UNHRC", "UNSC", "IP", "KLA"];

export default function AllotmentTracker() {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [committee, setCommittee] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchRows = async () => {
    try {
      const params = new URLSearchParams({ q: query, committee });
      const response = await fetch(`/api/allotments?${params}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load allotments");
      setRows(await response.json());
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
  }, [query, committee]);

  const totals = useMemo(() => ({
    confirmed: rows.filter((row) => row.status === "confirmed").length,
    pending: rows.filter((row) => row.status === "pending").length,
  }), [rows]);

  return (
    <section id="allotments" className="max-w-6xl mx-auto px-5 md:px-12 py-24 relative z-10">
      <div className="text-center mb-9">
        <span className="font-display text-[10px] text-gold-light tracking-[0.25em] uppercase font-bold">Live Delegate Register</span>
        <h2 className="text-4xl text-cream font-semibold mt-1 uppercase">Allotment Tracker</h2>
      </div>
      <div className="bg-maroon-dark border border-gold/60 rounded-lg p-4 md:p-6 shadow-2xl">
        <div className="grid md:grid-cols-[1fr_auto] gap-3 mb-5">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, delegation, country or committee"
            className="w-full bg-cream text-maroon-dark border border-gold px-4 py-3 rounded outline-none focus:ring-2 focus:ring-gold-light" />
          <select value={committee} onChange={(event) => setCommittee(event.target.value)}
            className="bg-cream text-maroon-dark border border-gold px-4 py-3 rounded min-w-40">
            {committees.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div className="flex gap-6 mb-4 text-xs font-display uppercase tracking-wider text-gold-light">
          <span>Confirmed: {totals.confirmed}</span><span>Pending: {totals.pending}</span><span className="ml-auto flex items-center gap-2"><i className="w-2 h-2 rounded-full bg-gold animate-pulse" />Live</span>
        </div>
        <div className="overflow-x-auto">
          {loading ? <p className="py-10 text-center text-cream/70">Loading allotments…</p> : rows.length === 0 ? (
            <div className="py-10 text-center border border-dashed border-gold/40 rounded text-cream/75">
              No matching allotments yet. Updates appear here automatically.
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead><tr className="text-gold-light font-display text-[10px] uppercase tracking-wider border-b border-gold/30"><th className="py-3">Delegate</th><th>Delegation</th><th>Committee</th><th>Country / Portfolio</th><th>Status</th></tr></thead>
              <tbody>{rows.map((row) => (
                <tr key={row._id || `${row.name}-${row.committee}`} className="border-b border-gold/10 text-cream">
                  <td className="py-3 font-semibold">{row.name}</td><td>{row.delegation}</td><td>{row.committee}</td><td>{row.country || "—"}</td>
                  <td><span className={`inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-wider ${row.status === "confirmed" ? "bg-gold text-maroon-dark" : row.status === "waitlisted" ? "bg-cream text-maroon-dark" : "border border-gold/60 text-gold-light"}`}>{row.status}</span></td>
                </tr>
              ))}</tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
