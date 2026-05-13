"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Building2,
  CalendarCheck,
  Clock,
  FileText,
  Pill,
  BarChart3,
  Heart,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

const nav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Patients", href: "/patients", icon: Users },
  { label: "Doctors", href: "/doctors", icon: Stethoscope },
  { label: "Hospitals", href: "/hospitals", icon: Building2 },
  { label: "Appointments", href: "/appointments", icon: CalendarCheck },
  { label: "Availability", href: "/availability", icon: Clock },
  { label: "Prescriptions", href: "/prescriptions", icon: FileText },
  { label: "Medicines", href: "/medicines", icon: Pill },
  { label: "Reports", href: "/reports", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside
      className="fixed top-0 left-0 h-screen bg-white border-r border-slate-100 flex flex-col z-40"
      style={{ width: "256px" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
        <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Heart className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-base font-bold text-slate-800 leading-none">MediLink</p>
          <p className="text-xs text-slate-400 mt-0.5">Healthcare System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin space-y-0.5">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
          Main Menu
        </p>
        {nav.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className={`sidebar-link ${isActive ? "active" : ""}`}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-slate-100 p-4">
        <div className="flex items-center gap-3 px-1 mb-3">
          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-teal-700">
              {user?.name?.charAt(0).toUpperCase() ?? "U"}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-700 truncate">{user?.name ?? "User"}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email ?? ""}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="sidebar-link w-full text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
