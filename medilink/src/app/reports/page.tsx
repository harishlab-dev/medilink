"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { LoadingState, ErrorState, EmptyState } from "@/components/ui";
import { appointmentsApi, prescriptionsApi } from "@/lib/api";
import { BarChart3, FileText, RefreshCw } from "lucide-react";

type ReportTab = "appointments" | "prescriptions";

export default function ReportsPage() {
  const [tab, setTab] = useState<ReportTab>("appointments");
  const [appointmentData, setAppointmentData] = useState<any[]>([]);
  const [prescriptionData, setPrescriptionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadAppointments = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await appointmentsApi.getAll();
      setAppointmentData(data);
    } catch (e: any) {
      setError(e.message || "Failed to load appointment report");
    } finally {
      setLoading(false);
    }
  };

  const loadPrescriptions = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await prescriptionsApi.getAll();
      setPrescriptionData(data);
    } catch (e: any) {
      setError(e.message || "Failed to load prescription report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tab === "appointments") loadAppointments();
    else loadPrescriptions();
  }, [tab]);

  return (
    <AppShell>
      {/* Tab Header */}
      <div className="card mb-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="page-title">Reports & Analytics</h2>
            <p className="page-subtitle">Relational JOIN query results from the database</p>
          </div>
          <button
            onClick={() => tab === "appointments" ? loadAppointments() : loadPrescriptions()}
            className="btn-secondary"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mt-5 border-b border-slate-100 -mx-6 px-6">
          <button
            onClick={() => setTab("appointments")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              tab === "appointments"
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Appointment Report
          </button>
          <button
            onClick={() => setTab("prescriptions")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              tab === "prescriptions"
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <FileText className="w-4 h-4" />
            Prescription Report
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div className="card">
        {loading ? (
          <LoadingState message="Running query…" />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={tab === "appointments" ? loadAppointments : loadPrescriptions}
          />
        ) : tab === "appointments" ? (
          appointmentData.length === 0 ? (
            <EmptyState
              icon={<BarChart3 className="w-6 h-6" />}
              title="No appointment data"
              description="No results returned from the report query"
            />
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4">
                <span className="badge-teal">{appointmentData.length} records</span>
                <span className="text-xs text-slate-400">
                  JOIN: Appointment ▸ Patient ▸ Slot ▸ Doctor
                </span>
              </div>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      {Object.keys(appointmentData[0] || {}).map((col) => (
                        <th key={col} className="table-header whitespace-nowrap">
                          {col.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {appointmentData.map((row, i) => (
                      <tr key={i} className="table-row">
                        {Object.values(row).map((val: any, j) => (
                          <td key={j} className="table-cell whitespace-nowrap">
                            {val ?? <span className="text-slate-300 italic">—</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )
        ) : prescriptionData.length === 0 ? (
          <EmptyState
            icon={<FileText className="w-6 h-6" />}
            title="No prescription data"
            description="No results returned from the report query"
          />
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4">
              <span className="badge-teal">{prescriptionData.length} records</span>
              <span className="text-xs text-slate-400">
                JOIN: Prescription ▸ Doctor
              </span>
            </div>
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    {Object.keys(prescriptionData[0] || {}).map((col) => (
                      <th key={col} className="table-header whitespace-nowrap">
                        {col.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prescriptionData.map((row, i) => (
                    <tr key={i} className="table-row">
                      {Object.values(row).map((val: any, j) => (
                        <td key={j} className="table-cell whitespace-nowrap">
                          {val ?? <span className="text-slate-300 italic">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
