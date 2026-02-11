const { Doctor, Patient, Appointment } = require("../models/models");
//post
const addDoctor = async (req, res) => {
  try {
    const { name, email, phone, specialization, experience, fees } = req.body;

    const doctor = await Doctor.create({
      name,
      email,
      phone,
      specialization,
      experience,
      fees,
    });

    res.status(201).json(doctor);
  } catch (error) {
    console.log(error);
  }
};
// get
const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.find();
    res.status(200).json(doctor);
  } catch (error) {
    console.log(error);
  }
};

// delete
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.log(error);
  }
};


// put
const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
    });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.log(error);
  }
};





// post
const addPatient = async (req, res) => {
  try {
    const { name, age, gender, phone, disease, address } = req.body;

    const patient = await Patient.create({
      name,
      age,
      gender,
      phone,
      disease,
      address,
    });

    res.status(201).json(patient);
  } catch (error) {
    console.log(error);
  }
};

// get 
const getPatient = async (req, res) => {
  try {
    const patient = await Patient.find();
    res.status(200).json(patient);
  } catch (error) {
    console.log(error);
  }
};

// delete
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.log(error);
  }
};

// put
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.log(error);
  }
};




// post
const addAppointment = async (req, res) => {
  try {
    const { doctor, patient, date, time, status, notes } = req.body;
    const appointment = await Appointment.create({
      doctor,
      patient,
      date,
      time,
      status,
      notes,
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.log(error);
  }
};
// get
const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.find();
    res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
  }
};

// delete
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
  }
};

// put
const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addDoctor,getDoctor,updateDoctor,deleteDoctor,addPatient, getPatient,deletePatient,updatePatient,addAppointment,getAppointment, deleteAppointment, updateAppointment,};
