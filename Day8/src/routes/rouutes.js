const express = require("express");
const router = express.Router();

const { add, getall, getone, update, del } =
  require("../controller/auth");

router.post("/add", add);
router.get("/getall", getall);
router.get("/getone/:id", getone);
router.put("/update/:id", update);
router.delete("/delete/:id", del);

module.exports = router;
