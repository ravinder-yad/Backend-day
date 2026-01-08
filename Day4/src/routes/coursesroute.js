// const express = require("express");
// const { courseAdd } = require("../controller/courses");

// const router = express.Router();

// router.post("/add", courseAdd);

// module.exports = router;

const express = require("express");
const {
  courseAdd,
  courseGet,
  courseUpdate,
  courseDelete,
} = require("../controller/courses");

const router = express.Router();

router.post("/add", courseAdd);
router.get("/all", courseGet);
router.put("/update/:id", courseUpdate);
router.delete("/delete/:id", courseDelete);

module.exports = router;
