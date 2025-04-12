const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
const getContacts = asyncHandler(async (req, res) => {
   const contacts = await Contact.find(); // Fetch all contacts
   res.status(200).json(contacts);
});

// @desc    Get a single contact by ID
// @route   GET /api/contacts/:id
// @access  Public
const getContact = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id);
   if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
   }
   res.status(200).json(contact);
});

// @desc    Create a new contact
// @route   POST /api/contacts
// @access  Public
const createContact = asyncHandler(async (req, res) => {
   const { name, email, phone } = req.body;

   if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All fields are mandatory!");
   }

   const contact = await Contact.create({ name, email, phone });
   res.status(201).json(contact);
});

// @desc    Update a contact
// @route   PUT /api/contacts/:id
// @access  Public
const updateContact = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id);

   if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
   }

   const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated doc
   );

   res.status(200).json(updatedContact);
});

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Public
const deleteContact = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id);

   if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
   }

   await contact.deleteOne(); // or Contact.findByIdAndDelete(req.params.id)

   res.status(200).json({ message: `Deleted contact ${req.params.id}` });
});

module.exports = {
   getContact,
   createContact,
   getContacts,
   updateContact,
   deleteContact,
};
