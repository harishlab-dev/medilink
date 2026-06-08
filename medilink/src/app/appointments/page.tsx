"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Modal, ConfirmDialog, LoadingState, ErrorState, EmptyState, FormField } from "@/components/ui";
import { appointmentsApi, availabilityApi, patientsApi } from "@/lib/api";
import { Appointment, AppointmentForm, AvailabilitySlot, Patient } from "@/types";
import { Plus, CalendarCheck, X } from "lucide-react";

const emptyForm: AppointmentForm = { slot_id: "", patient_id: "", diagnosis: "" };

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<AppointmentForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [a, s, p] = await Promise.all([
        appointmentsApi.getAll(),
        availabilityApi.getAll(),
        patientsApi.getAll(),
      ]);
      setAppointments(a);
      setSlots(s);
      setPatients(p);
    } catch (e: any) {
      setError(e.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const getPatientName = (id: number) => patients.find((p) => p.patient_id === id)?.name ?? `Patient #${id}`;
  const getSlotInfo = (id: number) => {
    const s = slots.find((sl) => sl.slot_id === id);
    return s ? `${s.date} at ${s.start_time}` : `Slot #${id}`;
  };

  const openBook = () => {
    setForm(emptyForm);
    setFormError("");
    setModalOpen(true);
  };

  const handleBook = async () => {
    if (!form.slot_id || !form.patient_id) {
      setFormError("Slot and patient are required.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      await appointmentsApi.create({
        ...form,
        slot_id: Number(form.slot_id),
        patient_id: Number(form.patient_id),
      });
      setModalOpen(false);
      load();
    } catch (e: any) {
      setFormError(e.message || "Failed to book appointment");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    if (!cancelTarget) return;
    setCancelling(true);
    try {
      await appointmentsApi.delete(cancelTarget.appointment_id);
      setCancelTarget(null);
      load();
    } catch (e: any) {
      alert(e.message || "Cancel failed");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <AppShell>
      <div className="card">
        <div className="section-header flex-col sm:flex-row gap-3">
          <div>
            <h2 className="page-title">Appointments</h2>
            <p className="page-subtitle">{appointments.length} total appointments</p>
          </div>
          <button onClick={openBook} className="btn-primary">
            <Plus className="w-4 h-4" /> Book Appointment
          </button>
        </div>

        {loading ? (
          <LoadingState message="Loading appointments…" />
        ) : error ? (
          <ErrorState message={error} onRetry={load} />
        ) : appointments.length === 0 ? (
          <EmptyState
            icon={<CalendarCheck className="w-6 h-6" />}
            title="No appointments yet"
            description="Book the first appointment to get started"
            action={<button onClick={openBook} className="btn-primary"><Plus className="w-4 h-4" />Book Appointment</button>}
          />
        ) : (
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full">
              <thead>
  <tr className="border-b border-slate-100">
    <th className="table-header">Appointment ID</th>
    <th className="table-header">Patient ID</th>
    <th className="table-header">Patient</th>
    <th className="table-header">Slot ID</th>
    <th className="table-header">Diagnosis</th>
    <th className="table-header text-right">Action</th>
  </tr>
</thead>
              <tbody>
  {appointments.map((a) => (
    <tr key={a.appointment_id} className="table-row">
      <td className="table-cell">
        <span className="badge-slate">
          #{a.appointment_id}
        </span>
      </td>

      <td className="table-cell">
        <span className="badge-slate">
          #{a.patient_id}
        </span>
      </td>

      <td className="table-cell">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-teal-700">
              {getPatientName(a.patient_id).charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="font-medium text-slate-800">
            {a.patient_name || getPatientName(a.patient_id)}
          </span>
        </div>
      </td>

      <td className="table-cell">
        <span className="badge-slate">
          #{a.slot_id}
        </span>
      </td>

      <td className="table-cell">
        <span className="text-slate-600">
          {a.diagnosis || (
            <span className="text-slate-300 italic">
              None
            </span>
          )}
        </span>
      </td>

      <td className="table-cell">
        <div className="flex justify-end">
          <button
            onClick={() => setCancelTarget(a)}
            className="btn-danger text-xs py-1.5 px-3"
          >
            <X className="w-3 h-3" />
            Cancel
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Book Appointment">
        <div className="space-y-4">
          {formError && <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">{formError}</div>}
          <FormField label="Patient">
  <select
    className="input-field"
    value={form.patient_id}
    onChange={(e) => setForm({ ...form, patient_id: e.target.value })}
  >
    <option value="">Select patient</option>

    {patients.map((p) => (
      <option
        key={p.patient_id}
        value={p.patient_id}
      >
        #{p.patient_id} - {p.name}
      </option>
    ))}
  </select>
</FormField>
          <FormField label="Availability Slot">
            <select className="input-field" value={form.slot_id} onChange={(e) => setForm({ ...form, slot_id: e.target.value })}>
              <option value="">Select slot</option>
              {slots.map((s) => (
                <option key={s.slot_id} value={s.slot_id}>
                  {s.date} at {s.start_time} {s.doctor_name ? `— Dr. ${s.doctor_name}` : ""}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Diagnosis / Notes (optional)">
            <textarea
              className="input-field resize-none h-24"
              value={form.diagnosis}
              onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
              placeholder="Initial notes or diagnosis…"
            />
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="btn-secondary" disabled={saving}>Cancel</button>
            <button onClick={handleBook} className="btn-primary" disabled={saving}>
              {saving && <div className="loading-spinner border-white/30 border-t-white" />}
              Book Appointment
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancel}
        loading={cancelling}
        title="Cancel Appointment"
        message={`Cancel appointment #${cancelTarget?.appointment_id}? This cannot be undone.`}
      />
    </AppShell>
  );
}
