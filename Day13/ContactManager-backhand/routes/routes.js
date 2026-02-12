const express = require("express");
const router = express.Router();
const { createContact, getContact, getContactById, updateContact, deleteContact } = require("../controller/authcontroller");

router.post("/createContact", createContact);
router.get("/getContact", getContact);
router.get("/getContact/:id", getContactById);
router.put("/updateContact/:id", updateContact);
router.delete("/deleteContact/:id", deleteContact);

module.exports = router;