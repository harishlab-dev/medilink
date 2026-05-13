"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { LoadingState, ErrorState, EmptyState } from "@/components/ui";
import { prescriptionsApi } from "@/lib/api";
import { Prescription } from "@/types";
import { FileText, Search } from "lucide-react";

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filtered, setFiltered] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await prescriptionsApi.getAll();
      setPrescriptions(data);
      setFiltered(data);
    } catch (e: any) {
      setError(e.message || "Failed to load prescriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      prescriptions.filter(
        (p) =>
          p.diagnosis.toLowerCase().includes(q) ||
          (p.doctor_name ?? "").toLowerCase().includes(q) ||
          String(p.prescription_id).includes(q)
      )
    );
  }, [search, prescriptions]);

  return (
    <AppShell>
      <div className="card">
        <div className="section-header flex-col sm:flex-row gap-3">
          <div>
            <h2 className="page-title">Prescriptions</h2>
            <p className="page-subtitle">{prescriptions.length} total prescriptions</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prescriptions…"
              className="input-field pl-9 w-52"
            />
          </div>
        </div>

        {loading ? (
          <LoadingState message="Loading prescriptions…" />
        ) : error ? (
          <ErrorState message={error} onRetry={load} />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<FileText className="w-6 h-6" />}
            title="No prescriptions found"
            description={search ? "Try a different search" : "Prescriptions will appear here once added"}
          />
        ) : (
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="table-header">Rx ID</th>
                  <th className="table-header">Doctor</th>
                  <th className="table-header">Diagnosis</th>
                  <th className="table-header">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.prescription_id} className="table-row">
                    <td className="table-cell"><span className="badge-slate">Rx #{p.prescription_id}</span></td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-purple-700">
                            {(p.doctor_name ?? "D").charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium text-slate-800">
                          {p.doctor_name || `Doctor #${p.doctor_id}`}
                        </span>
                      </div>
                    </td>
                    <td className="table-cell text-slate-600">{p.diagnosis}</td>
                    <td className="table-cell">
                      <span className="badge-teal">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppShell>
  );
}
