from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = "medilink.db"


# =====================================================
# DATABASE CONNECTION
# =====================================================

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


# =====================================================
# HOME ROUTE
# =====================================================

@app.route("/")
def home():
    return "MediLink Backend Running Successfully"


# =====================================================
# GET ALL HOSPITALS
# =====================================================

@app.route("/hospitals", methods=["GET"])
def get_hospitals():

    conn = get_db_connection()

    hospitals = conn.execute("""
        SELECT * FROM Hospital
    """).fetchall()

    conn.close()

    return jsonify([dict(row) for row in hospitals])


# =====================================================
# GET ALL DOCTORS
# =====================================================

@app.route("/doctors", methods=["GET"])
def get_doctors():

    conn = get_db_connection()

    doctors = conn.execute("""
    SELECT
        Doctor.doctor_id,
        Doctor.name,
        Doctor.email,
        Doctor.hospital_id,
        Hospital.name AS hospital_name,
        Hospital.location

    FROM Doctor

    JOIN Hospital
    ON Doctor.hospital_id = Hospital.hospital_id
""").fetchall()

    conn.close()

    return jsonify([dict(row) for row in doctors])


# =====================================================
# GET ALL PATIENTS
# =====================================================

@app.route("/patients", methods=["GET"])
def get_patients():

    conn = get_db_connection()

    patients = conn.execute("""
        SELECT * FROM Patient
    """).fetchall()

    conn.close()

    return jsonify([dict(row) for row in patients])


# =====================================================
# GET ALL APPOINTMENTS
# =====================================================

@app.route("/appointments", methods=["GET"])
def get_appointments():

    conn = get_db_connection()

    appointments = conn.execute("""
    SELECT
        Appointment.appointment_id,
        Appointment.patient_id,
        Appointment.slot_id,
        Appointment.diagnosis,
        Patient.name AS patient_name,
        Doctor.name AS doctor_name,
        Availability_Slot.date,
        Availability_Slot.start_time

    FROM Appointment

    JOIN Patient
    ON Appointment.patient_id = Patient.patient_id

    JOIN Availability_Slot
    ON Appointment.slot_id = Availability_Slot.slot_id

    JOIN Doctor
    ON Availability_Slot.doctor_id = Doctor.doctor_id
""").fetchall()

    conn.close()

    return jsonify([dict(row) for row in appointments])


# =====================================================
# GET ALL PRESCRIPTIONS
# =====================================================

@app.route("/prescriptions", methods=["GET"])
def get_prescriptions():

    conn = get_db_connection()

    prescriptions = conn.execute("""
       SELECT
    Prescription.prescription_id,
    Prescription.doctor_id,
    Doctor.name AS doctor_name,
    Prescription.diagnosis
                                 
        FROM Prescription

        JOIN Doctor
        ON Prescription.doctor_id = Doctor.doctor_id
    """).fetchall()

    conn.close()

    return jsonify([dict(row) for row in prescriptions])


# =====================================================
# GET ALL MEDICINES
# =====================================================

@app.route("/medicines", methods=["GET"])
def get_medicines():

    conn = get_db_connection()

    medicines = conn.execute("""
        SELECT * FROM Medicine
    """).fetchall()

    conn.close()

    return jsonify([dict(row) for row in medicines])


# =====================================================
# ADD PATIENT
# =====================================================

@app.route("/add_patient", methods=["POST"])
def add_patient():

    data = request.get_json()

    name = data["name"]
    email = data["email"]
    gender = data["gender"]
    date_of_birth = data["date_of_birth"]

    conn = get_db_connection()

    conn.execute("""
        INSERT INTO Patient
        (name, email, gender, date_of_birth)

        VALUES (?, ?, ?, ?)
    """, (name, email, gender, date_of_birth))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Patient added successfully"
    })


# =====================================================
# UPDATE PATIENT
# =====================================================

@app.route("/update_patient/<int:id>", methods=["PUT"])
def update_patient(id):

    data = request.get_json()

    name = data["name"]
    email = data["email"]
    gender = data["gender"]
    date_of_birth = data["date_of_birth"]

    conn = get_db_connection()

    conn.execute("""
        UPDATE Patient

        SET
            name = ?,
            email = ?,
            gender = ?,
            date_of_birth = ?

        WHERE patient_id = ?
    """, (name, email, gender, date_of_birth, id))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Patient updated successfully"
    })


# =====================================================
# DELETE PATIENT
# =====================================================

@app.route("/delete_patient/<int:id>", methods=["DELETE"])
def delete_patient(id):

    conn = get_db_connection()

    conn.execute("""
        DELETE FROM Patient
        WHERE patient_id = ?
    """, (id,))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Patient deleted successfully"
    })


# =====================================================
# ADD APPOINTMENT
# =====================================================

@app.route("/add_appointment", methods=["POST"])
def add_appointment():

    data = request.get_json()

    slot_id = data["slot_id"]
    patient_id = data["patient_id"]
    diagnosis = data["diagnosis"]

    conn = get_db_connection()

    conn.execute("""
        INSERT INTO Appointment
        (slot_id, patient_id, diagnosis)

        VALUES (?, ?, ?)
    """, (slot_id, patient_id, diagnosis))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Appointment added successfully"
    })


# =====================================================
# DELETE APPOINTMENT
# =====================================================

@app.route("/delete_appointment/<int:id>", methods=["DELETE"])
def delete_appointment(id):

    conn = get_db_connection()

    conn.execute("""
        DELETE FROM Appointment
        WHERE appointment_id = ?
    """, (id,))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Appointment deleted successfully"
    })


# =====================================================
# ADD PRESCRIPTION
# =====================================================

@app.route("/add_prescription", methods=["POST"])
def add_prescription():

    data = request.get_json()

    doctor_id = data["doctor_id"]
    diagnosis = data["diagnosis"]

    conn = get_db_connection()

    conn.execute("""
        INSERT INTO Prescription
        (doctor_id, diagnosis)

        VALUES (?, ?)
    """, (doctor_id, diagnosis))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Prescription added successfully"
    })


# =====================================================
# DELETE PRESCRIPTION
# =====================================================

@app.route("/delete_prescription/<int:id>", methods=["DELETE"])
def delete_prescription(id):

    conn = get_db_connection()

    conn.execute("""
        DELETE FROM Prescription
        WHERE prescription_id = ?
    """, (id,))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Prescription deleted successfully"
    })


# =====================================================
# ADD DOCTOR
# =====================================================

@app.route("/add_doctor", methods=["POST"])
def add_doctor():

    data = request.get_json()

    hospital_id = data["hospital_id"]
    name = data["name"]
    email = data["email"]

    conn = get_db_connection()

    conn.execute("""
        INSERT INTO Doctor
        (hospital_id, name, email)

        VALUES (?, ?, ?)
    """, (hospital_id, name, email))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Doctor added successfully"
    })


# =====================================================
# UPDATE DOCTOR
# =====================================================

@app.route("/update_doctor/<int:id>", methods=["PUT"])
def update_doctor(id):

    data = request.get_json()

    hospital_id = data["hospital_id"]
    name = data["name"]
    email = data["email"]

    conn = get_db_connection()

    conn.execute("""
        UPDATE Doctor

        SET
            hospital_id = ?,
            name = ?,
            email = ?

        WHERE doctor_id = ?
    """, (hospital_id, name, email, id))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Doctor updated successfully"
    })


# =====================================================
# DELETE DOCTOR
# =====================================================

@app.route("/delete_doctor/<int:id>", methods=["DELETE"])
def delete_doctor(id):

    conn = get_db_connection()

    conn.execute("""
        DELETE FROM Doctor
        WHERE doctor_id = ?
    """, (id,))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Doctor deleted successfully"
    })


# =====================================================
# ADD HOSPITAL
# =====================================================

@app.route("/add_hospital", methods=["POST"])
def add_hospital():

    data = request.get_json()

    name = data["name"]
    location = data["location"]

    conn = get_db_connection()

    conn.execute("""
        INSERT INTO Hospital
        (name, location)

        VALUES (?, ?)
    """, (name, location))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Hospital added successfully"
    })


# =====================================================
# UPDATE HOSPITAL
# =====================================================

@app.route("/update_hospital/<int:id>", methods=["PUT"])
def update_hospital(id):

    data = request.get_json()

    name = data["name"]
    location = data["location"]

    conn = get_db_connection()

    conn.execute("""
        UPDATE Hospital

        SET
            name = ?,
            location = ?

        WHERE hospital_id = ?
    """, (name, location, id))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Hospital updated successfully"
    })


# =====================================================
# DELETE HOSPITAL
# =====================================================

@app.route("/delete_hospital/<int:id>", methods=["DELETE"])
def delete_hospital(id):

    conn = get_db_connection()

    conn.execute("""
        DELETE FROM Hospital
        WHERE hospital_id = ?
    """, (id,))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Hospital deleted successfully"
    })


# =====================================================
# GET ALL AVAILABILITY SLOTS
# =====================================================

@app.route("/availability_slots", methods=["GET"])
def get_availability_slots():

    conn = get_db_connection()

    slots = conn.execute("""
        SELECT
            Availability_Slot.slot_id,
            Availability_Slot.doctor_id,
            Availability_Slot.date,
            Availability_Slot.start_time,
            Doctor.name AS doctor_name

        FROM Availability_Slot

        JOIN Doctor
        ON Availability_Slot.doctor_id = Doctor.doctor_id
    """).fetchall()

    conn.close()

    return jsonify([dict(row) for row in slots])


# =====================================================
# ADD AVAILABILITY SLOT
# =====================================================

@app.route("/add_availability_slot", methods=["POST"])
def add_availability_slot():

    data = request.get_json()

    doctor_id = data["doctor_id"]
    date = data["date"]
    start_time = data["start_time"]

    conn = get_db_connection()

    conn.execute("""
        INSERT INTO Availability_Slot
        (doctor_id, date, start_time)

        VALUES (?, ?, ?)
    """, (doctor_id, date, start_time))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Availability slot added successfully"
    })


# =====================================================
# DELETE AVAILABILITY SLOT
# =====================================================

@app.route("/delete_availability_slot/<int:id>", methods=["DELETE"])
def delete_availability_slot(id):

    conn = get_db_connection()

    conn.execute("""
        DELETE FROM Availability_Slot
        WHERE slot_id = ?
    """, (id,))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Availability slot deleted successfully"
    })


# =====================================================
# ADD MEDICINE
# =====================================================

@app.route("/add_medicine", methods=["POST"])
def add_medicine():

    data = request.get_json()

    medicine_name = data["medicine_name"]

    conn = get_db_connection()

    conn.execute("""
        INSERT INTO Medicine
        (medicine_name)

        VALUES (?)
    """, (medicine_name,))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Medicine added successfully"
    })


# =====================================================
# UPDATE MEDICINE
# =====================================================

@app.route("/update_medicine/<int:id>", methods=["PUT"])
def update_medicine(id):

    data = request.get_json()

    medicine_name = data["medicine_name"]

    conn = get_db_connection()

    conn.execute("""
        UPDATE Medicine

        SET
            medicine_name = ?

        WHERE medicine_id = ?
    """, (medicine_name, id))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Medicine updated successfully"
    })


# =====================================================
# DELETE MEDICINE
# =====================================================

@app.route("/delete_medicine/<int:id>", methods=["DELETE"])
def delete_medicine(id):

    conn = get_db_connection()

    conn.execute("""
        DELETE FROM Medicine
        WHERE medicine_id = ?
    """, (id,))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Medicine deleted successfully"
    })


# =====================================================
# UPDATE PRESCRIPTION
# =====================================================

@app.route("/update_prescription/<int:id>", methods=["PUT"])
def update_prescription(id):

    data = request.get_json()

    doctor_id = data["doctor_id"]
    diagnosis = data["diagnosis"]

    conn = get_db_connection()

    conn.execute("""
        UPDATE Prescription

        SET
            doctor_id = ?,
            diagnosis = ?

        WHERE prescription_id = ?
    """, (doctor_id, diagnosis, id))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Prescription updated successfully"
    })


# =====================================================
# RUN SERVER
# =====================================================

if __name__ == "__main__":
    app.run(debug=True)