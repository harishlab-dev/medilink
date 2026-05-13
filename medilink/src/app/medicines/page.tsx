"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { LoadingState, ErrorState, EmptyState } from "@/components/ui";
import { medicinesApi } from "@/lib/api";
import { Medicine } from "@/types";
import { Pill, Search } from "lucide-react";

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [filtered, setFiltered] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await medicinesApi.getAll();
      setMedicines(data);
      setFiltered(data);
    } catch (e: any) {
      setError(e.message || "Failed to load medicines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(medicines.filter((m) => m.medicine_name.toLowerCase().includes(q) || String(m.medicine_id).includes(q)));
  }, [search, medicines]);

  // Group alphabetically
  const grouped = filtered.reduce<Record<string, Medicine[]>>((acc, m) => {
    const letter = m.medicine_name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(m);
    return acc;
  }, {});

  return (
    <AppShell>
      <div className="section-header mb-5">
        <div>
          <h2 className="page-title">Medicines</h2>
          <p className="page-subtitle">{medicines.length} medicines in catalog</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicines…"
            className="input-field pl-9 w-52"
          />
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading medicines…" />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Pill className="w-6 h-6" />}
          title="No medicines found"
          description={search ? "Try a different search term" : "Medicine catalog is empty"}
        />
      ) : (
        <div className="card">
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="table-header">Medicine ID</th>
                  <th className="table-header">Medicine Name</th>
                  <th className="table-header">Category</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.medicine_id} className="table-row">
                    <td className="table-cell"><span className="badge-slate">#{m.medicine_id}</span></td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Pill className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="font-medium text-slate-800">{m.medicine_name}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="badge-teal">{m.medicine_name.charAt(0).toUpperCase()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AppShell>
  );
}
