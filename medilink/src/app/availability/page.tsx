"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Modal, ConfirmDialog, LoadingState, ErrorState, EmptyState, FormField } from "@/components/ui";
import { availabilityApi, doctorsApi } from "@/lib/api";
import { AvailabilitySlot, SlotForm, Doctor } from "@/types";
import { Plus, Clock, Trash2 } from "lucide-react";

const emptyForm: SlotForm = { doctor_id: "", date: "", start_time: "" };

export default function AvailabilityPage() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<SlotForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<AvailabilitySlot | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [s, d] = await Promise.all([availabilityApi.getAll(), doctorsApi.getAll()]);
      setSlots(s);
      setDoctors(d);
    } catch (e: any) {
      setError(e.message || "Failed to load slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const getDoctorName = (id: number) => doctors.find((d) => d.doctor_id === id)?.name ?? `Doctor #${id}`;

  const handleSave = async () => {
    if (!form.doctor_id || !form.date || !form.start_time) {
      setFormError("All fields are required.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      await availabilityApi.create(form);
      setModalOpen(false);
      load();
    } catch (e: any) {
      setFormError(e.message || "Failed to add slot");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await availabilityApi.delete(deleteTarget.slot_id);
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
            <h2 className="page-title">Availability Slots</h2>
            <p className="page-subtitle">{slots.length} slots configured</p>
          </div>
          <button onClick={() => { setForm(emptyForm); setFormError(""); setModalOpen(true); }} className="btn-primary">
            <Plus className="w-4 h-4" /> Add Slot
          </button>
        </div>

        {loading ? (
          <LoadingState message="Loading slots…" />
        ) : error ? (
          <ErrorState message={error} onRetry={load} />
        ) : slots.length === 0 ? (
          <EmptyState
            icon={<Clock className="w-6 h-6" />}
            title="No availability slots"
            description="Add doctor availability slots to allow appointment booking"
            action={<button onClick={() => setModalOpen(true)} className="btn-primary"><Plus className="w-4 h-4" />Add Slot</button>}
          />
        ) : (
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="table-header">Slot ID</th>
                  <th className="table-header">Doctor</th>
                  <th className="table-header">Date</th>
                  <th className="table-header">Start Time</th>
                  <th className="table-header text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((s) => (
                  <tr key={s.slot_id} className="table-row">
                    <td className="table-cell"><span className="badge-slate">#{s.slot_id}</span></td>
                    <td className="table-cell">
                      <span className="font-medium text-slate-800">
                        {s.doctor_name || getDoctorName(s.doctor_id)}
                      </span>
                    </td>
                    <td className="table-cell text-slate-600">{s.date}</td>
                    <td className="table-cell">
                      <span className="badge-teal">{s.start_time}</span>
                    </td>
                    <td className="table-cell">
                      <div className="flex justify-end">
                        <button
                          onClick={() => setDeleteTarget(s)}
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Availability Slot">
        <div className="space-y-4">
          {formError && <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">{formError}</div>}
          <FormField label="Doctor">
            <select className="input-field" value={form.doctor_id} onChange={(e) => setForm({ ...form, doctor_id: e.target.value })}>
              <option value="">Select doctor</option>
              {doctors.map((d) => <option key={d.doctor_id} value={d.doctor_id}>{d.name}</option>)}
            </select>
          </FormField>
          <FormField label="Date">
            <input type="date" className="input-field" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </FormField>
          <FormField label="Start Time">
            <input type="time" className="input-field" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} />
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="btn-secondary" disabled={saving}>Cancel</button>
            <button onClick={handleSave} className="btn-primary" disabled={saving}>
              {saving && <div className="loading-spinner border-white/30 border-t-white" />}
              Add Slot
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Remove Slot"
        message={`Remove slot #${deleteTarget?.slot_id}? Any appointments on this slot may be affected.`}
      />
    </AppShell>
  );
}
