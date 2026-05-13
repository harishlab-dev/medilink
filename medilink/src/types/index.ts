// ─── Core Entities ───────────────────────────────────────────────────────────

export interface Patient {
  patient_id: number;
  name: string;
  email: string;
  gender: string;
  date_of_birth: string;
}

export interface Doctor {
  doctor_id: number;
  hospital_id: number;
  name: string;
  email: string;
  hospital_name?: string;
  specialization?: string;
}

export interface Hospital {
  hospital_id: number;
  name: string;
  location: string;
}

export interface AvailabilitySlot {
  slot_id: number;
  doctor_id: number;
  date: string;
  start_time: string;
  doctor_name?: string;
}

export interface Appointment {
  appointment_id: number;
  slot_id: number;
  patient_id: number;
  diagnosis: string;
  patient_name?: string;
  doctor_name?: string;
  date?: string;
  start_time?: string;
}

export interface Prescription {
  prescription_id: number;
  doctor_id: number;
  diagnosis: string;
  doctor_name?: string;
}

export interface Medicine {
  medicine_id: number;
  medicine_name: string;
}

export interface Contain {
  prescription_id: number;
  medicine_id: number;
  dosage: string;
  medicine_name?: string;
}

// ─── Forms ───────────────────────────────────────────────────────────────────

export interface PatientForm {
  name: string;
  email: string;
  gender: string;
  date_of_birth: string;
}

export interface DoctorForm {
  hospital_id: number | string;
  name: string;
  email: string;
  specialization?: string;
}

export interface HospitalForm {
  name: string;
  location: string;
}

export interface SlotForm {
  doctor_id: number | string;
  date: string;
  start_time: string;
}

export interface AppointmentForm {
  slot_id: number | string;
  patient_id: number | string;
  diagnosis: string;
}

// ─── API Response ─────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export interface DashboardStats {
  total_patients: number;
  total_doctors: number;
  total_hospitals: number;
  total_appointments: number;
}

// ─── Report Types ─────────────────────────────────────────────────────────────

export interface AppointmentReport {
  appointment_id: number;
  patient_name: string;
  doctor_name: string;
  hospital_name: string;
  date: string;
  start_time: string;
  diagnosis: string;
}

export interface PrescriptionReport {
  prescription_id: number;
  doctor_name: string;
  diagnosis: string;
  medicine_name: string;
  dosage: string;
}
