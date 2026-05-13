"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { StatCard, LoadingState, ErrorState } from "@/components/ui";
import { getDashboardStats } from "@/lib/api";
import { Users, Stethoscope, Building2, CalendarCheck } from "lucide-react";

interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalHospitals: number;
  totalAppointments: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <AppShell>
        <LoadingState message="Loading dashboard..." />
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </AppShell>
    );
  }

  if (!stats) {
    return (
      <AppShell>
        <ErrorState message="No data available" onRetry={() => window.location.reload()} />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back — here's what's happening today</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={<Users className="w-5 h-5" />}
            color="teal"
            change="Active in system"
          />
          <StatCard
            title="Total Doctors"
            value={stats.totalDoctors}
            icon={<Stethoscope className="w-5 h-5" />}
            color="blue"
            change="Registered professionals"
          />
          <StatCard
            title="Total Hospitals"
            value={stats.totalHospitals}
            icon={<Building2 className="w-5 h-5" />}
            color="amber"
            change="Partner locations"
          />
          <StatCard
            title="Total Appointments"
            value={stats.totalAppointments}
            icon={<CalendarCheck className="w-5 h-5" />}
            color="purple"
            change="Scheduled consultations"
          />
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <a
              href="/patients"
              className="btn-secondary w-full justify-center"
            >
              Manage Patients
            </a>
            <a
              href="/doctors"
              className="btn-secondary w-full justify-center"
            >
              View Doctors
            </a>
            <a
              href="/hospitals"
              className="btn-secondary w-full justify-center"
            >
              See Hospitals
            </a>
            <a
              href="/appointments"
              className="btn-secondary w-full justify-center"
            >
              Schedule Appointment
            </a>
          </div>
        </div>

        {/* Info Card */}
        <div className="card bg-gradient-to-r from-teal-50 to-teal-100 border-teal-200">
          <h3 className="font-semibold text-teal-900">System Status</h3>
          <p className="text-sm text-teal-700 mt-1">✓ All systems operational. Backend connected successfully.</p>
        </div>
      </div>
    </AppShell>
  );
}