const Contact = require("../models/model");

// post
const createContact = async (req, res) => {
    try {
        const { name, phone, email, address, company, jobTitle, profileurl, notes, birthdate } = req.body;

        const contact = await Contact.create({ name, phone, email, address, company, jobTitle, profileurl, notes, birthdate });
        res.status(201).json(contact);
    } catch (error) {
        console.log(error);
    }
}

// get all
const getContact = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.log(error);
    }
}

// get by id
const getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        // if (!contact) {
        //     return res.status(404).json({ message: "Contact not found" });
        // }
        res.status(200).json(contact);
    } catch (error) {
        console.log(error);
    }
}

// put (update)
const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        // if (!updatedContact) {
        //     return res.status(404).json({ message: "Contact not found" });
        // }
        res.status(200).json(updatedContact);
    } catch (error) {
        console.log(error);
    }
}

// delete
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContact = await Contact.findByIdAndDelete(id);
        // if (!deletedContact) {
        //     return res.status(404).json({ message: "Contact not found" });
        // }
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createContact, getContact, getContactById, updateContact, deleteContact };
