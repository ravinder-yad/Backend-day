const express = require("express");
const router = express.Router();

const { addEmployee, getAllEmployees, getSingleEmployee, updateEmployee, deleteEmployee, searchEmployee } = require("../controllers/auth");

router.post("/add-employee", addEmployee);
router.get("/get-all-employees", getAllEmployees);
router.get("/get-single-employee/:id", getSingleEmployee);
router.put("/update-employee/:id", updateEmployee);
router.delete("/delete-employee/:id", deleteEmployee);
router.get("/search-employee", searchEmployee);

module.exports = router;