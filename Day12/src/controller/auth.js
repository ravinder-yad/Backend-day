const { Doctor, Patient, Appointment, Register } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// register 

const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirm } = req.body

    const salt = 10;
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Register.create({
      name,
      email,
      password: hashedPassword,
      confirm
    });

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: '1d' })

    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

// login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Register.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: '1d' });

    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
};




const getStats = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    res.status(200).json({
      totalDoctors,
      totalPatients,
      totalAppointments
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching stats" });
  }
};

module.exports = { addDoctor, getDoctor, updateDoctor, deleteDoctor, addPatient, getPatient, deletePatient, updatePatient, addAppointment, getAppointment, deleteAppointment, updateAppointment, registerUser, loginUser, getStats };
