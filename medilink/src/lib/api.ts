const API_BASE_URL = "http://127.0.0.1:5000";

// ======================================================
// TYPES
// ======================================================

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
}

export interface Hospital {
  hospital_id: number;
  name: string;
  location: string;
}

export interface Appointment {
  appointment_id: number;
  slot_id: number;
  patient_id: number;
  patient_name?: string;
  doctor_name?: string;
  date?: string;
  start_time?: string;
  diagnosis: string;
}

export interface AvailabilitySlot {
  slot_id: number;
  doctor_id: number;
  date: string;
  start_time: string;
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

export interface MedicineForm {
  medicine_name: string;
}

interface ApiError extends Error {
  status?: number;
  data?: any;
}

// ======================================================
// GENERIC API CALL
// ======================================================

async function apiCall<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
): Promise<T> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    // ✅ FIXED HERE
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      options
    );

    if (!response.ok) {
      const error = new Error(
        `API Error: ${response.statusText}`
      ) as ApiError;

      error.status = response.status;

      try {
        error.data = await response.json();
      } catch {}

      throw error;
    }

    return (await response.json()) as T;

  } catch (error: any) {
    throw new Error(
      error.message || "Failed to fetch from API"
    );
  }
}

// ======================================================
// PATIENTS
// ======================================================

export const patientsApi = {
  getAll: (): Promise<Patient[]> =>
    apiCall<Patient[]>("/patients"),

  create: (data: Partial<Patient>) =>
    apiCall("/add_patient", "POST", data),

  update: (id: number, data: Partial<Patient>) =>
    apiCall(`/update_patient/${id}`, "PUT", data),

  delete: (id: number) =>
    apiCall(`/delete_patient/${id}`, "DELETE"),
};

// ======================================================
// DOCTORS
// ======================================================

export const doctorsApi = {
  getAll: (): Promise<Doctor[]> =>
    apiCall<Doctor[]>("/doctors"),

  create: (data: Partial<Doctor>) =>
    apiCall("/add_doctor", "POST", data),

  update: (id: number, data: Partial<Doctor>) =>
    apiCall(`/update_doctor/${id}`, "PUT", data),

  delete: (id: number) =>
    apiCall(`/delete_doctor/${id}`, "DELETE"),
};

// ======================================================
// HOSPITALS
// ======================================================

export const hospitalsApi = {
  getAll: (): Promise<Hospital[]> =>
    apiCall<Hospital[]>("/hospitals"),

  create: (data: Partial<Hospital>) =>
    apiCall("/add_hospital", "POST", data),

  update: (id: number, data: Partial<Hospital>) =>
    apiCall(`/update_hospital/${id}`, "PUT", data),

  delete: (id: number) =>
    apiCall(`/delete_hospital/${id}`, "DELETE"),
};

// ======================================================
// APPOINTMENTS
// ======================================================

export const appointmentsApi = {
  getAll: (): Promise<Appointment[]> =>
    apiCall<Appointment[]>("/appointments"),

  create: (data: Partial<Appointment>) =>
    apiCall("/add_appointment", "POST", data),

  delete: (id: number) =>
    apiCall(`/delete_appointment/${id}`, "DELETE"),
};

// ======================================================
// AVAILABILITY
// ======================================================

export const availabilityApi = {
  getAll: (): Promise<AvailabilitySlot[]> =>
    apiCall<AvailabilitySlot[]>("/availability_slots"),

  create: (data: Partial<AvailabilitySlot>) =>
    apiCall("/add_availability_slot", "POST", data),

  delete: (id: number) =>
    apiCall(`/delete_availability_slot/${id}`, "DELETE"),
};

// ======================================================
// PRESCRIPTIONS
// ======================================================

export const prescriptionsApi = {
  getAll: (): Promise<Prescription[]> =>
    apiCall<Prescription[]>("/prescriptions"),

  create: (data: Partial<Prescription>) =>
    apiCall("/add_prescription", "POST", data),

  update: (id: number, data: Partial<Prescription>) =>
    apiCall(`/update_prescription/${id}`, "PUT", data),

  delete: (id: number) =>
    apiCall(`/delete_prescription/${id}`, "DELETE"),
};

// ======================================================
// MEDICINES
// ======================================================

export const medicinesApi = {
  getAll: (): Promise<Medicine[]> =>
    apiCall<Medicine[]>("/medicines"),

  create: (data: Partial<Medicine>) =>
    apiCall("/add_medicine", "POST", data),

  update: (id: number, data: Partial<Medicine>) =>
    apiCall(`/update_medicine/${id}`, "PUT", data),

  delete: (id: number) =>
    apiCall(`/delete_medicine/${id}`, "DELETE"),
};

// ======================================================
// DASHBOARD STATS
// ======================================================

export async function getDashboardStats() {
  try {
    const [
      patients,
      doctors,
      hospitals,
      appointments,
    ] = await Promise.all([
      apiCall<Patient[]>("/patients"),
      apiCall<Doctor[]>("/doctors"),
      apiCall<Hospital[]>("/hospitals"),
      apiCall<Appointment[]>("/appointments"),
    ]);

    return {
      totalPatients: patients.length,
      totalDoctors: doctors.length,
      totalHospitals: hospitals.length,
      totalAppointments: appointments.length,
    };

  } catch (error) {
    throw new Error(
      "Failed to fetch dashboard statistics"
    );
  }
}