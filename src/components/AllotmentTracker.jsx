'use client';

import { useEffect, useState } from "react";

const statusFilters = [
  { key: "available", label: "Available / Left" },
  { key: "allotted", label: "Allotted" },
  { key: "allotted-not-confirmed", label: "Allotted, Not Confirmed" },
];

const committeeFilters = [
  { key: "others", label: "Others" },
  { key: "unga", label: "UNGA" },
  { key: "unhrc", label: "UNHRC" },
  { key: "war-cabinet", label: "War Cabinet" },
  { key: "ip", label: "International Press" },
  { key: "kla", label: "KLA" },
];

export default function AllotmentTracker() {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [committeeFilter, setCommitteeFilter] = useState("others");
  const [loading, setLoading] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [totals, setTotals] = useState({ allotted: 0, "allotted-not-confirmed": 0, available: 0 });

  const fetchRows = async () => {
    try {
      const params = new URLSearchParams({ q: query, committee: committeeFilter });
      if (statusFilter) params.set("status", statusFilter);
      const response = await fetch(`/api/allotments/sheet?${params}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load allotments");
      setRows(await response.json());

      const totalsResponse = await fetch(`/api/allotments/sheet?committee=${committeeFilter}`, { cache: "no-store" });
      if (totalsResponse.ok) {
        const allCountries = await totalsResponse.json();
        setAllCountries(allCountries);
        setTotals({
          allotted: allCountries.filter((country) => country.status === "allotted").length,
          "allotted-not-confirmed": allCountries.filter((country) => country.status === "allotted-not-confirmed").length,
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
    setLoading(true);
    fetchRows();
    const timer = setInterval(fetchRows, 15000);
    return () => clearInterval(timer);
  }, [query, statusFilter, committeeFilter]);

  const suggestions = query.trim()
    ? [...new Map(
        allCountries
          .filter((country) => country.name.toLowerCase().startsWith(query.trim().toLowerCase()))
          .map((country) => [country.name.toLowerCase(), country])
      ).values()].slice(0, 8)
    : [];

  return (
    <section id="allotments" className="max-w-6xl mx-auto px-5 md:px-12 py-24 relative z-10">
      <div className="text-center mb-9">
        <span className="font-display text-[10px] text-gold-light tracking-[0.25em] uppercase font-bold">Live Delegate Register</span>
        <h2 className="text-4xl text-cream font-semibold mt-1 uppercase">Allotment Tracker</h2>
      </div>
      <div className="bg-maroon-dark border border-gold/60 rounded-lg p-4 md:p-6 shadow-2xl">
        <div className="grid md:grid-cols-[1fr_220px_220px] gap-3 mb-5">
          <div className="relative">
            <input value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="Search country"
              autoComplete="off"
              className="w-full bg-cream text-maroon-dark border border-gold px-4 py-3 rounded outline-none focus:ring-2 focus:ring-gold-light" />
            {showSuggestions && suggestions.length > 0 ? (
              <div className="absolute z-20 left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded border border-gold/60 bg-cream shadow-xl">
                {suggestions.map((country) => (
                  <button
                    key={`${country.committee}-${country.name}`}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      setQuery(country.name);
                      setShowSuggestions(false);
                    }}
                    className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-maroon-dark hover:bg-gold/20"
                  >
                    <span className="font-semibold">{country.name}</span>
                    <span className="text-xs text-maroon-dark/60">
                      {committeeFilters.find((item) => item.key === country.committee)?.label || country.committee}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}
            className="bg-cream text-maroon-dark border border-gold px-4 py-3 rounded">
            <option value="">Status</option>
            {statusFilters.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
          </select>
          <select value={committeeFilter} onChange={(event) => setCommitteeFilter(event.target.value)}
            className="bg-cream text-maroon-dark border border-gold px-4 py-3 rounded">
            <option value="">Select Committee</option>
            {committeeFilters.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
          </select>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-xs font-display uppercase tracking-wider text-gold-light">
          <span>Allotted: {totals.allotted}</span>
          <span>Allotted, Not Confirmed: {totals["allotted-not-confirmed"]}</span>
          <span>Available / Left: {totals.available}</span>
          <span className="ml-auto flex items-center gap-2"><i className="w-2 h-2 rounded-full bg-gold animate-pulse" />Live</span>
        </div>
        <div className="overflow-x-auto">
          {loading ? <p className="py-10 text-center text-cream/70">Loading allotments…</p> : rows.length === 0 ? (
            <div className="py-10 text-center border border-dashed border-gold/40 rounded text-cream/75">
              {query.trim() ? "No matching allotments found." : "No allotments found."}
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead><tr className="text-gold-light font-display text-[10px] uppercase tracking-wider border-b border-gold/30"><th className="py-3">Committee</th><th>Country / Portfolio</th><th>Status</th></tr></thead>
              <tbody>{rows.map((row) => (
                <tr key={`${row.committee}-${row.name}`} className="border-b border-gold/10 text-cream">
                  <td className="py-3 pr-4 text-gold-light">{committeeFilters.find((item) => item.key === row.committee)?.label || row.committee}</td>
                  <td className="py-3 font-semibold pr-4">{row.name}{row.detail ? <span className="block text-xs text-cream/60">{row.detail}</span> : null}</td>
                  <td><span className={`inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-wider ${
                    row.status === "allotted" ? "bg-gold text-maroon-dark" :
                    row.status === "allotted-not-confirmed" ? "border border-gold bg-maroon-dark text-gold-light" :
                    "border border-gold/60 text-gold-light"
                  }`}>
                    {row.status === "allotted" ? "Allotted" :
                     row.status === "allotted-not-confirmed" ? "Allotted, Not Confirmed" :
                     "Available / Left"}
                  </span></td>
                </tr>
              ))}</tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
