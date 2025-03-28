const asyncHandler = require("express-async-handler"); //no need to write try catch blocks everytime
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
   res.status(200).json({ message: "Get all contacts" });
});

//@desc Get a particular contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
   res.status(200).json({ message: `Get contact with id ${req.params.id}` });
});

//@desc Create a new contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
   console.log("The request body is:", req.body);

   const { name, email, phone } = req.body;

   if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All fields are mandatory!");
   }
   res.status(201).json({ message: "Create a new contact" });
});

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
   res.status(200).json({ message: `Update contact with id ${req.params.id}` });
});

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
   res.status(200).json({ message: `Delete contact with id ${req.params.id}` });
});

module.exports = { getContact, createContact, getContacts, updateContact, deleteContact };