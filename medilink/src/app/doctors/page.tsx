"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Modal, ConfirmDialog, LoadingState, ErrorState, EmptyState, FormField } from "@/components/ui";
import { doctorsApi, hospitalsApi } from "@/lib/api";
import { Doctor, DoctorForm, Hospital } from "@/types";
import { Plus, Search, Edit2, Trash2, Stethoscope } from "lucide-react";

const emptyForm: DoctorForm = { hospital_id: "", name: "", email: "", specialization: "" };

const specializations = [
  "General Medicine", "Cardiology", "Dermatology", "Neurology", "Orthopedics",
  "Pediatrics", "Psychiatry", "Radiology", "Surgery", "Oncology", "Other",
];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filtered, setFiltered] = useState<Doctor[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Doctor | null>(null);
  const [form, setForm] = useState<DoctorForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<Doctor | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [d, h] = await Promise.all([doctorsApi.getAll(), hospitalsApi.getAll()]);
      setDoctors(d);
      setFiltered(d);
      setHospitals(h);
    } catch (e: any) {
      setError(e.message || "Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      doctors.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.email.toLowerCase().includes(q) ||
          (d.specialization ?? "").toLowerCase().includes(q) ||
          (d.hospital_name ?? "").toLowerCase().includes(q)
      )
    );
  }, [search, doctors]);

  const getHospitalName = (id: number) =>
    hospitals.find((h) => h.hospital_id === id)?.name ?? `Hospital #${id}`;

  const openCreate = () => {
    setEditTarget(null);
    setForm({ ...emptyForm, hospital_id: hospitals[0]?.hospital_id ?? "" });
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (d: Doctor) => {
    setEditTarget(d);
    setForm({ hospital_id: d.hospital_id, name: d.name, email: d.email, specialization: d.specialization ?? "" });
    setFormError("");
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.email || !form.hospital_id) {
      setFormError("Name, email, and hospital are required.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      if (editTarget) {
        await doctorsApi.update(editTarget.doctor_id, form);
      } else {
        await doctorsApi.create(form);
      }
      setModalOpen(false);
      load();
    } catch (e: any) {
      setFormError(e.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await doctorsApi.delete(deleteTarget.doctor_id);
      setDeleteTarget(null);
      load();
    } catch (e: any) {
      alert(e.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AppShell>
      <div className="card">
        <div className="section-header flex-col sm:flex-row gap-3">
          <div>
            <h2 className="page-title">Doctors</h2>
            <p className="page-subtitle">{doctors.length} medical staff registered</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search doctors…"
                className="input-field pl-9 w-52"
              />
            </div>
            <button onClick={openCreate} className="btn-primary">
              <Plus className="w-4 h-4" /> Add Doctor
            </button>
          </div>
        </div>

        {loading ? (
          <LoadingState message="Loading doctors…" />
        ) : error ? (
          <ErrorState message={error} onRetry={load} />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Stethoscope className="w-6 h-6" />}
            title="No doctors found"
            description={search ? "Try a different search" : "Add your first doctor"}
            action={!search ? <button onClick={openCreate} className="btn-primary"><Plus className="w-4 h-4" /> Add Doctor</button> : undefined}
          />
        ) : (
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="table-header">ID</th>
                  <th className="table-header">Name</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Specialization</th>
                  <th className="table-header">Hospital</th>
                  <th className="table-header text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d.doctor_id} className="table-row">
                    <td className="table-cell"><span className="badge-slate">#{d.doctor_id}</span></td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-blue-700">{d.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="font-medium text-slate-800">{d.name}</span>
                      </div>
                    </td>
                    <td className="table-cell text-slate-500">{d.email}</td>
                    <td className="table-cell">
                      <span className="badge-blue">{d.specialization || "General"}</span>
                    </td>
                    <td className="table-cell text-slate-600">
                      {d.hospital_name || getHospitalName(d.hospital_id)}
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(d)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-teal-600 transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteTarget(d)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? "Edit Doctor" : "Add New Doctor"}>
        <div className="space-y-4">
          {formError && <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">{formError}</div>}
          <FormField label="Full Name">
            <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Dr. Jane Smith" />
          </FormField>
          <FormField label="Email Address">
            <input type="email" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="doctor@hospital.com" />
          </FormField>
          <FormField label="Specialization">
            <select className="input-field" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })}>
              <option value="">Select specialization</option>
              {specializations.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </FormField>
          <FormField label="Hospital">
            <select className="input-field" value={form.hospital_id} onChange={(e) => setForm({ ...form, hospital_id: e.target.value })}>
              <option value="">Select hospital</option>
              {hospitals.map((h) => <option key={h.hospital_id} value={h.hospital_id}>{h.name}</option>)}
            </select>
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="btn-secondary" disabled={saving}>Cancel</button>
            <button onClick={handleSave} className="btn-primary" disabled={saving}>
              {saving && <div className="loading-spinner border-white/30 border-t-white" />}
              {editTarget ? "Save Changes" : "Add Doctor"}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message={`Delete doctor "${deleteTarget?.name}"? This cannot be undone.`}
      />
    </AppShell>
  );
}
