
"use client";

import { useEffect, useState } from "react";

import AppShell from "@/components/layout/AppShell";

import {
  Modal,
  ConfirmDialog,
  LoadingState,
  ErrorState,
  EmptyState,
  FormField,
} from "@/components/ui";

import {
  prescriptionsApi,
  doctorsApi,
} from "@/lib/api";

import {
  Prescription,
  PrescriptionForm,
  Doctor,
} from "@/types";

import {
  FileText,
  Search,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";

const emptyForm: PrescriptionForm = {
  doctor_id: "",
  diagnosis: "",
};

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filtered, setFiltered] = useState<Prescription[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] =
    useState<Prescription | null>(null);

  const [form, setForm] =
    useState<PrescriptionForm>(emptyForm);

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] =
    useState<Prescription | null>(null);

  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const [p, d] = await Promise.all([
        prescriptionsApi.getAll(),
        doctorsApi.getAll(),
      ]);

      setPrescriptions(p);
      setFiltered(p);
      setDoctors(d);
    } catch (e: any) {
      setError(
        e.message ||
          "Failed to load prescriptions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();

    setFiltered(
      prescriptions.filter(
        (p) =>
          p.diagnosis
            .toLowerCase()
            .includes(q) ||
          (p.doctor_name ?? "")
            .toLowerCase()
            .includes(q) ||
          String(
            p.prescription_id
          ).includes(q)
      )
    );
  }, [search, prescriptions]);

  const openCreate = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (
    p: Prescription
  ) => {
    setEditTarget(p);

    setForm({
      doctor_id: p.doctor_id,
      diagnosis: p.diagnosis,
    });

    setFormError("");
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (
      !form.doctor_id ||
      !form.diagnosis
    ) {
      setFormError(
        "Doctor and diagnosis are required."
      );
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      const dataToSend = {
        ...form,
        doctor_id: Number(form.doctor_id),
      };
      if (editTarget) {
        await prescriptionsApi.update(
          editTarget.prescription_id,
          dataToSend
        );
      } else {
        await prescriptionsApi.create(
          dataToSend
        );
      }

      setModalOpen(false);
      load();
    } catch (e: any) {
      setFormError(
        e.message ||
          "Failed to save prescription"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      await prescriptionsApi.delete(
        deleteTarget.prescription_id
      );

      setDeleteTarget(null);

      load();
    } catch (e: any) {
      alert(
        e.message ||
          "Delete failed"
      );
    } finally {
      setDeleting(false);
    }
  };
  return (
  <AppShell>
    <div className="card">
      <div className="section-header flex-col sm:flex-row gap-3">
        <div>
          <h2 className="page-title">Prescriptions</h2>
          <p className="page-subtitle">
            {prescriptions.length} total prescriptions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prescriptions..."
              className="input-field pl-9 w-52"
            />
          </div>

          <button
            onClick={openCreate}
            className="btn-primary"
          >
            <Plus className="w-4 h-4" />
            Add Prescription
          </button>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading prescriptions..." />
      ) : error ? (
        <ErrorState
          message={error}
          onRetry={load}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-6 h-6" />}
          title="No prescriptions found"
          description="Add your first prescription"
        />
      ) : (
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
               <th className="table-header">
  Prescription ID
</th>

<th className="table-header">
  Doctor ID
</th>

<th className="table-header">
  Doctor
</th>

<th className="table-header">
  Diagnosis
</th>
                <th className="table-header text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.prescription_id}
                  className="table-row"
                >
                  <td className="table-cell">
  <span className="badge-slate">
    #{p.prescription_id}
  </span>
</td>

<td className="table-cell">
  <span className="badge-slate">
    #{p.doctor_id}
  </span>
</td>

<td className="table-cell">
  <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-purple-700">
                          {(p.doctor_name ?? "D")
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      </div>

                      <span className="font-medium text-slate-800">
                        {p.doctor_name ||
                          `Doctor #${p.doctor_id}`}
                      </span>
                    </div>
                  </td>

                  <td className="table-cell text-slate-600">
                    {p.diagnosis}
                  </td>

                  <td className="table-cell">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() =>
                          openEdit(p)
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-teal-600 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() =>
                          setDeleteTarget(p)
                        }
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

    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      title={
        editTarget
          ? "Edit Prescription"
          : "Add Prescription"
      }
    >
      <div className="space-y-4">

        {formError && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
            {formError}
          </div>
        )}

        <FormField label="Doctor">
          <select
            className="input-field"
            value={form.doctor_id}
            onChange={(e) =>
              setForm({
                ...form,
                doctor_id: e.target.value,
              })
            }
          >
            <option value="">
              Select Doctor
            </option>

            {doctors.map((d) => (
              <option
                key={d.doctor_id}
                value={d.doctor_id}
              >
                {d.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Diagnosis">
          <textarea
            className="input-field resize-none h-24"
            value={form.diagnosis}
            onChange={(e) =>
              setForm({
                ...form,
                diagnosis:
                  e.target.value,
              })
            }
            placeholder="Enter diagnosis"
          />
        </FormField>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() =>
              setModalOpen(false)
            }
            className="btn-secondary"
            disabled={saving}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="btn-primary"
            disabled={saving}
          >
            {saving && (
              <div className="loading-spinner border-white/30 border-t-white" />
            )}

            {editTarget
              ? "Save Changes"
              : "Add Prescription"}
          </button>
        </div>

      </div>
    </Modal>

    <ConfirmDialog
      open={!!deleteTarget}
      onClose={() =>
        setDeleteTarget(null)
      }
      onConfirm={handleDelete}
      loading={deleting}
      title="Delete Prescription"
      message={`Delete prescription #${deleteTarget?.prescription_id}?`}
    />
  </AppShell>
);
}