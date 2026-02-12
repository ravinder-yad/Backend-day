const mongoose = require("mongoose");

/* DOCTOR SCHEMA */
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
});

/*PATIENT SCHEMA*/
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  disease: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

/* APPOINTMENT SCHEMA  */
const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: String,
    required: true,
  },
  patient: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
});

// register
const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirm: {
    type: String,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
const Patient = mongoose.model("Patient", patientSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);
const Register = mongoose.model("Register", registerSchema);

module.exports = { Doctor, Patient, Appointment, Register };
