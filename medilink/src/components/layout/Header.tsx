"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { useAuth } from "@/lib/auth";

const titles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Welcome back — here's what's happening today" },
  "/patients": { title: "Patients", subtitle: "Manage patient records and information" },
  "/doctors": { title: "Doctors", subtitle: "Medical staff directory and management" },
  "/hospitals": { title: "Hospitals", subtitle: "Partner hospital network" },
  "/appointments": { title: "Appointments", subtitle: "Schedule and manage patient appointments" },
  "/availability": { title: "Availability Slots", subtitle: "Doctor scheduling and availability" },
  "/prescriptions": { title: "Prescriptions", subtitle: "Patient prescription records" },
  "/medicines": { title: "Medicines", subtitle: "Medicine inventory and catalog" },
  "/reports": { title: "Reports", subtitle: "Analytics and relational data reports" },
};

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();

  const pageKey = Object.keys(titles).find((k) =>
    pathname === k || (k !== "/dashboard" && pathname.startsWith(k))
  ) ?? "/dashboard";

  const { title, subtitle } = titles[pageKey];

  return (
    <header
      className="fixed top-0 right-0 bg-white border-b border-slate-100 z-30 flex items-center justify-between px-6"
      style={{ left: "256px", height: "64px" }}
    >
      <div>
        <h1 className="text-lg font-semibold text-slate-800 leading-none">{title}</h1>
        <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Quick search…"
            className="pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-52 transition-all"
          />
        </div>
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
          <Bell className="w-4 h-4 text-slate-500" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-teal-500 rounded-full" />
        </button>
        <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-semibold text-white">
            {user?.name?.charAt(0).toUpperCase() ?? "U"}
          </span>
        </div>
      </div>
    </header>
  );
}
