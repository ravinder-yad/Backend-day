const { Auth } = require("../models/authmodels");

// ADD (POST)
const add = async (req, res) => {
  try {
    const { Tiktname, Parice, Movename, contectnumber, Address } = req.body;

    const data = await Auth.create({
      Tiktname,
      Parice,
      Movename, 
      contectnumber,
      Address,
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
const getall = async (req, res) => {
  try {
    const data = await Auth.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE
const getone = async (req, res) => {
  try {
    const data = await Auth.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Data not found" });
  }
};

// UPDATE
const update = async (req, res) => {
  try {
    const data = await Auth.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const del = async (req, res) => {
  try {
    await Auth.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { add, getall, getone, update, del };
