// const { course } = require("../models/courses");

// const courseAdd = async (req, res) => {
//   const { title, description, duration } = await req.body;

//   const added = await course.create({
//     title,
//     description,
//     duration
//   });

//   if (added) {
//     res.status(201).json({
//       message: " Course added successfully",
//       data: added,
//     });
//   } else {
//     res.status(409).json({
//       message: "Failed to add course",
//       error: error.message,
//     });
//   }
// };

// module.exports = { courseAdd };


const { course } = require("../models/courses");

const courseAdd = async (req, res) => {
  const { title, description, duration } = req.body;

  const added = await course.create({
    title,
    description,
    duration,
  });

  if (added) {
    res.status(201).json({
      message: "Course added successfully",
      data: added,
    });
  } else {
    res.status(409).json({
      message: "Failed to add course",
    });
  }
};

const courseGet = async (req, res) => {
  const data = await course.find();

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({
      message: "No courses found",
    });
  }
};


const courseUpdate = async (req, res) => {
  const { id } = req.params;

  const updated = await course.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  if (updated) {
    res.status(200).json({
      message: "Course updated successfully",
      data: updated,
    });
  } else {
    res.status(404).json({
      message: "Course not found",
    });
  }
};

const courseDelete = async (req, res) => {
  const { id } = req.params;

  const deleted = await course.findByIdAndDelete(id);

  if (deleted) {
    res.status(200).json({
      message: "Course deleted successfully",
    });
  } else {
    res.status(404).json({
      message: "Course not found",
    });
  }
};

module.exports = {
  courseAdd,
  courseGet,
  courseUpdate,
  courseDelete,
};
