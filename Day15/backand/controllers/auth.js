const Auth = require("../models/models");
const mongoose = require("mongoose");


// ADD EMPLOYEE 

const addEmployee = async (req, res) => {
    try {
        const { Name, Email, Phone, Department, Role, JoiningDate } = req.body;
        if (!Name || !Email || !Phone || !Department || !Role || !JoiningDate) {
            return res.status(400).json({
                message: "All fields required"
            });
        }

        const checkExisting = await Auth.findOne({ $or: [{ Email }, { Phone }] });
        if (checkExisting) {
            return res.status(400).json({
                message: checkExisting.Email === Email ? "Employee with this Email already exists" : "Employee with this Phone already exists"
            });
        }

        const employee = await Auth.create({
            Name,
            Email,
            Phone,
            Department,
            Role,
            JoiningDate
        });
        res.status(201).json({
            message: "Employee Added Successfully",
            employee
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};



//  GET ALL 

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Auth.find().sort({ createdAt: -1 })
        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



// GET SINGLE 

const getSingleEmployee = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid employee id"
            });
        }
        const employee = await Auth.findById(req.params.id)
        if (!employee) {
            return res.status(404).json({
                message: "Employee Not Found"
            })
        }
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// UPDATE 

const updateEmployee = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid employee id"
            });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Update payload is required"
            });
        }

        const employee = await Auth.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!employee) {
            return res.status(404).json({
                message: "Employee Not Found"
            })
        }
        res.status(200).json({
            message: "Employee Updated Successfully",
            employee
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email or Phone already exists"
            });
        }
        res.status(500).json({
            message: error.message
        });
    }

};



// DELETE   
const deleteEmployee = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid employee id"
            });
        }

        const employee = await Auth.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee Not Found"
            });
        }

        res.status(200).json({
            message: "Employee Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// SEARCH 
const searchEmployee = async (req, res) => {
    try {
        if (!req.query.Name || !req.query.Name.trim()) {
            return res.status(400).json({
                message: "Name query is required"
            });
        }

        const search = await Auth.find({
            Name: { $regex: req.query.Name, $options: "i" }
        });

        res.status(200).json(search);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
}

module.exports = {
    addEmployee,
    getAllEmployees,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployee
};




