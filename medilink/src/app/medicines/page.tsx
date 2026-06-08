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

import { medicinesApi } from "@/lib/api";

import { Medicine, MedicineForm } from "@/types";

import {
  Pill,
  Search,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";

const emptyForm: MedicineForm = {
  medicine_name: "",
};

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [filtered, setFiltered] = useState<Medicine[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] =
    useState<Medicine | null>(null);

  const [form, setForm] =
    useState<MedicineForm>(emptyForm);

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] =
    useState<Medicine | null>(null);

  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await medicinesApi.getAll();

      setMedicines(data);
      setFiltered(data);
    } catch (e: any) {
      setError(e.message || "Failed to load medicines");
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
      medicines.filter(
        (m) =>
          m.medicine_name
            .toLowerCase()
            .includes(q) ||
          String(m.medicine_id).includes(q)
      )
    );
  }, [search, medicines]);

  const openCreate = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (m: Medicine) => {
    setEditTarget(m);

    setForm({
      medicine_name: m.medicine_name,
    });

    setFormError("");
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.medicine_name) {
      setFormError(
        "Medicine name is required."
      );
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      if (editTarget) {
        await medicinesApi.update(
          editTarget.medicine_id,
          form
        );
      } else {
        await medicinesApi.create(form);
      }

      setModalOpen(false);
      load();
    } catch (e: any) {
      setFormError(
        e.message || "Failed to save"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      await medicinesApi.delete(
        deleteTarget.medicine_id
      );

      setDeleteTarget(null);

      load();
    } catch (e: any) {
      alert(
        e.message || "Delete failed"
      );
    } finally {
      setDeleting(false);
    }
  };
  return (
  <AppShell>
    <div className="section-header mb-5">
      <div>
        <h2 className="page-title">Medicines</h2>
        <p className="page-subtitle">
          {medicines.length} medicines in catalog
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicines..."
            className="input-field pl-9 w-52"
          />
        </div>

        <button
          onClick={openCreate}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          Add Medicine
        </button>
      </div>
    </div>

    {loading ? (
      <LoadingState message="Loading medicines..." />
    ) : error ? (
      <ErrorState
        message={error}
        onRetry={load}
      />
    ) : filtered.length === 0 ? (
      <EmptyState
        icon={<Pill className="w-6 h-6" />}
        title="No medicines found"
        description={
          search
            ? "Try a different search term"
            : "Medicine catalog is empty"
        }
      />
    ) : (
      <div className="card">
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="table-header">
                  Medicine ID
                </th>
                <th className="table-header">
                  Medicine Name
                </th>
                <th className="table-header text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((m) => (
                <tr
                  key={m.medicine_id}
                  className="table-row"
                >
                  <td className="table-cell">
                    <span className="badge-slate">
                      #{m.medicine_id}
                    </span>
                  </td>

                  <td className="table-cell">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Pill className="w-4 h-4 text-emerald-600" />
                      </div>

                      <span className="font-medium text-slate-800">
                        {m.medicine_name}
                      </span>
                    </div>
                  </td>

                  <td className="table-cell">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => openEdit(m)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-teal-600 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() =>
                          setDeleteTarget(m)
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
      </div>
    )}

    <Modal
      open={modalOpen}
      onClose={() =>
        setModalOpen(false)
      }
      title={
        editTarget
          ? "Edit Medicine"
          : "Add Medicine"
      }
    >
      <div className="space-y-4">
        {formError && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
            {formError}
          </div>
        )}

        <FormField label="Medicine Name">
          <input
            className="input-field"
            value={form.medicine_name}
            onChange={(e) =>
              setForm({
                ...form,
                medicine_name:
                  e.target.value,
              })
            }
            placeholder="Enter medicine name"
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
              : "Add Medicine"}
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
      title="Delete Medicine"
      message={`Delete "${deleteTarget?.medicine_name}"? This cannot be undone.`}
    />
  </AppShell>
);
}