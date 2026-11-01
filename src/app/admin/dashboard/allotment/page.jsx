"use client";

import { useEffect, useState } from "react";

const blank = { name: "", delegation: "", committee: "", country: "", status: "pending" };

export default function AllotmentAdmin() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const response = await fetch("/api/allotments?committee=All", { cache: "no-store" });
    if (response.ok) setRows(await response.json());
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/allotments/${editing}` : "/api/allotments";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm(blank);
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    await fetch(`/api/allotments/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-gold-light uppercase mb-6">Allotment Management</h1>
      <div className="grid md:grid-cols-5 gap-3 mb-8 bg-maroon-dark border border-gold/50 rounded-lg p-5">
        {["name", "delegation", "committee", "country"].map((field) => (
          <input key={field} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            className="bg-cream text-maroon-dark px-3 py-2 rounded border border-gold" />
        ))}
        <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}
          className="bg-cream text-maroon-dark px-3 py-2 rounded border border-gold">
          <option>confirmed</option><option>pending</option><option>waitlisted</option>
        </select>
        <button onClick={save} className="md:col-span-5 justify-self-end bg-gold text-maroon-dark px-6 py-2 rounded font-display text-xs uppercase">
          {editing ? "Update Allotment" : "Add Allotment"}
        </button>
      </div>
      <div className="overflow-x-auto border border-gold/40 rounded">
        <table className="w-full text-sm">
          <thead><tr className="text-gold-light border-b border-gold/30"><th className="p-3 text-left">Delegate</th><th>Delegation</th><th>Committee</th><th>Country</th><th>Status</th><th /></tr></thead>
          <tbody>{rows.map((row) => (
            <tr key={row._id} className="border-b border-gold/10">
              <td className="p-3">{row.name}</td><td>{row.delegation}</td><td>{row.committee}</td><td>{row.country || "—"}</td><td>{row.status}</td>
              <td className="p-3 text-right whitespace-nowrap">
                <button onClick={() => { setEditing(row._id); setForm({ name: row.name, delegation: row.delegation, committee: row.committee, country: row.country || "", status: row.status }); }} className="mr-3 text-gold-light">Edit</button>
                <button onClick={() => remove(row._id)} className="text-red-300">Delete</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
