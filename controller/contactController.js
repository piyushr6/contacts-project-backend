//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = (req, res) => {
   res.status(200).json({ message: "Get all contacts" });
};

//@desc Get a particular contacts
//@route GET /api/contacts/:id
//@access public
const getContact = (req, res) => {
   res.status(200).json({ message: `Get contact with id ${req.params.id}` });
};

//@desc Create a new contact
//@route POST /api/contacts
//@access public
const createContact = (req, res) => {
   res.status(201).json({ message: "Create a new contact" });
};

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = (req, res) => {
   res.status(200).json({ message: `Update contact with id ${req.params.id}` });
};

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = (req, res) => {
   res.status(200).json({ message: `Delete contact with id ${req.params.id}` });
};

module.exports = { getContact, createContact, getContacts, updateContact, deleteContact };