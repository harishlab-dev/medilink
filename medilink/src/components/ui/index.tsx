"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

// ─── Modal ────────────────────────────────────────────────────────────────────

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── Loading State ────────────────────────────────────────────────────────────

export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="loading-spinner" />
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
        <span className="text-xl">⚠️</span>
      </div>
      <p className="text-sm text-slate-500 max-w-xs text-center">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary mt-1">
          Try again
        </button>
      )}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state gap-3">
      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-slate-700">{title}</p>
        <p className="text-sm text-slate-400 mt-0.5">{description}</p>
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────

interface ConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure? This action cannot be undone.",
  loading = false,
}: ConfirmProps) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
            <span className="text-lg">🗑️</span>
          </div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
        </div>
        <p className="text-sm text-slate-500 mb-5">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="btn-secondary" disabled={loading}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <div className="loading-spinner" /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Form Field ───────────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  children: ReactNode;
  error?: string;
}

export function FormField({ label, children, error }: FieldProps) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

// ─── Stats Card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: "teal" | "blue" | "amber" | "purple";
  change?: string;
}

const colorMap = {
  teal: { bg: "bg-teal-50", icon: "text-teal-600", text: "text-teal-700" },
  blue: { bg: "bg-blue-50", icon: "text-blue-600", text: "text-blue-700" },
  amber: { bg: "bg-amber-50", icon: "text-amber-600", text: "text-amber-700" },
  purple: { bg: "bg-purple-50", icon: "text-purple-600", text: "text-purple-700" },
};

export function StatCard({ title, value, icon, color, change }: StatCardProps) {
  const colors = colorMap[color];
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
          {change && <p className="text-xs text-slate-400 mt-1">{change}</p>}
        </div>
        <div className={`w-11 h-11 ${colors.bg} rounded-xl flex items-center justify-center ${colors.icon}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
