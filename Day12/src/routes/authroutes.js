const express = require("express");
const router = express.Router();

const {
  addDoctor,
  addPatient,
  addAppointment,
  getDoctor,
  getPatient,
  getAppointment,
  deleteDoctor,
  deletePatient,
  deleteAppointment,
  updateDoctor,
  updatePatient,
  updateAppointment,
} = require("../controller/auth");

router.post("/doctor", addDoctor);
router.post("/patient", addPatient);
router.post("/appointment", addAppointment);
router.get("/doctor", getDoctor);
router.get("/patient", getPatient);
router.get("/appointment", getAppointment);
router.delete("/doctor/:id", deleteDoctor);
router.delete("/patient/:id", deletePatient);
router.delete("/appointment/:id", deleteAppointment);
router.put("/doctor/:id", updateDoctor);
router.put("/patient/:id", updatePatient);
router.put("/appointment/:id", updateAppointment);





module.exports = router;
