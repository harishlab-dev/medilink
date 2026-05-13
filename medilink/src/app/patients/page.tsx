"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Modal, ConfirmDialog, LoadingState, ErrorState, EmptyState, FormField } from "@/components/ui";
import { patientsApi } from "@/lib/api";
import { Patient, PatientForm } from "@/types";
import { Plus, Search, Edit2, Trash2, Users } from "lucide-react";

const emptyForm: PatientForm = { name: "", email: "", gender: "Male", date_of_birth: "" };

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filtered, setFiltered] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Patient | null>(null);
  const [form, setForm] = useState<PatientForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<Patient | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await patientsApi.getAll();
      setPatients(data);
      setFiltered(data);
    } catch (e: any) {
      setError(e.message || "Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      patients.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.gender.toLowerCase().includes(q)
      )
    );
  }, [search, patients]);

  const openCreate = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (p: Patient) => {
    setEditTarget(p);
    setForm({ name: p.name, email: p.email, gender: p.gender, date_of_birth: p.date_of_birth });
    setFormError("");
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.email || !form.date_of_birth) {
      setFormError("Name, email, and date of birth are required.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      if (editTarget) {
        await patientsApi.update(editTarget.patient_id, form);
      } else {
        await patientsApi.create(form);
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
      await patientsApi.delete(deleteTarget.patient_id);
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
        {/* Header */}
        <div className="section-header flex-col sm:flex-row gap-3">
          <div>
            <h2 className="page-title">Patients</h2>
            <p className="page-subtitle">{patients.length} total patients registered</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patients…"
                className="input-field pl-9 w-52"
              />
            </div>
            <button onClick={openCreate} className="btn-primary">
              <Plus className="w-4 h-4" /> Add Patient
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <LoadingState message="Loading patients…" />
        ) : error ? (
          <ErrorState message={error} onRetry={load} />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Users className="w-6 h-6" />}
            title="No patients found"
            description={search ? "Try a different search term" : "Add your first patient to get started"}
            action={
              !search ? (
                <button onClick={openCreate} className="btn-primary">
                  <Plus className="w-4 h-4" /> Add Patient
                </button>
              ) : undefined
            }
          />
        ) : (
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="table-header rounded-tl-xl">ID</th>
                  <th className="table-header">Name</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Gender</th>
                  <th className="table-header">Date of Birth</th>
                  <th className="table-header rounded-tr-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.patient_id} className="table-row">
                    <td className="table-cell">
                      <span className="badge-slate">#{p.patient_id}</span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-teal-700">
                            {p.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium text-slate-800">{p.name}</span>
                      </div>
                    </td>
                    <td className="table-cell text-slate-500">{p.email}</td>
                    <td className="table-cell">
                      <span className={p.gender === "Male" ? "badge-blue" : "badge-teal"}>
                        {p.gender}
                      </span>
                    </td>
                    <td className="table-cell text-slate-500">{p.date_of_birth}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => openEdit(p)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-teal-600 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                        >
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

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editTarget ? "Edit Patient" : "Add New Patient"}
      >
        <div className="space-y-4">
          {formError && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
              {formError}
            </div>
          )}
          <FormField label="Full Name">
            <input
              className="input-field"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. John Doe"
            />
          </FormField>
          <FormField label="Email Address">
            <input
              type="email"
              className="input-field"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="john@example.com"
            />
          </FormField>
          <FormField label="Gender">
            <select
              className="input-field"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </FormField>
          <FormField label="Date of Birth">
            <input
              type="date"
              className="input-field"
              value={form.date_of_birth}
              onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
            />
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="btn-secondary" disabled={saving}>
              Cancel
            </button>
            <button onClick={handleSave} className="btn-primary" disabled={saving}>
              {saving && <div className="loading-spinner border-white/30 border-t-white" />}
              {editTarget ? "Save Changes" : "Add Patient"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message={`Delete patient "${deleteTarget?.name}"? This cannot be undone.`}
      />
    </AppShell>
  );
}
