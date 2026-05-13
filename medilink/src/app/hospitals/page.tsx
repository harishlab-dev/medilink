"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Modal, ConfirmDialog, LoadingState, ErrorState, EmptyState, FormField } from "@/components/ui";
import { hospitalsApi } from "@/lib/api";
import { Hospital, HospitalForm } from "@/types";
import { Plus, Search, Edit2, Trash2, Building2, MapPin } from "lucide-react";

const emptyForm: HospitalForm = { name: "", location: "" };

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filtered, setFiltered] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Hospital | null>(null);
  const [form, setForm] = useState<HospitalForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<Hospital | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await hospitalsApi.getAll();
      setHospitals(data);
      setFiltered(data);
    } catch (e: any) {
      setError(e.message || "Failed to load hospitals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(hospitals.filter((h) => h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q)));
  }, [search, hospitals]);

  const openCreate = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (h: Hospital) => {
    setEditTarget(h);
    setForm({ name: h.name, location: h.location });
    setFormError("");
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.location) {
      setFormError("Name and location are required.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      if (editTarget) {
        await hospitalsApi.update(editTarget.hospital_id, form);
      } else {
        await hospitalsApi.create(form);
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
      await hospitalsApi.delete(deleteTarget.hospital_id);
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
      {/* Cards view */}
      <div className="section-header mb-5">
        <div>
          <h2 className="page-title">Hospitals</h2>
          <p className="page-subtitle">{hospitals.length} partner hospitals</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search hospitals…" className="input-field pl-9 w-52" />
          </div>
          <button onClick={openCreate} className="btn-primary">
            <Plus className="w-4 h-4" /> Add Hospital
          </button>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading hospitals…" />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Building2 className="w-6 h-6" />}
          title="No hospitals found"
          description={search ? "Try a different search" : "Add your first hospital"}
          action={!search ? <button onClick={openCreate} className="btn-primary"><Plus className="w-4 h-4" />Add Hospital</button> : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((h) => (
            <div key={h.hospital_id} className="card hover:shadow-card-hover transition-shadow group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(h)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-teal-600 transition-colors">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setDeleteTarget(h)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">{h.name}</h3>
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {h.location}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-50">
                <span className="badge-slate text-xs">ID #{h.hospital_id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? "Edit Hospital" : "Add New Hospital"}>
        <div className="space-y-4">
          {formError && <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">{formError}</div>}
          <FormField label="Hospital Name">
            <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. City General Hospital" />
          </FormField>
          <FormField label="Location / Address">
            <input className="input-field" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. 123 Main St, New York" />
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="btn-secondary" disabled={saving}>Cancel</button>
            <button onClick={handleSave} className="btn-primary" disabled={saving}>
              {saving && <div className="loading-spinner border-white/30 border-t-white" />}
              {editTarget ? "Save Changes" : "Add Hospital"}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message={`Delete "${deleteTarget?.name}"? This cannot be undone.`}
      />
    </AppShell>
  );
}
