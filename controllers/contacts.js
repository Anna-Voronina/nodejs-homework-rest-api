const contactsService = require("../models/contacts");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../decorators");

const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const foundContact = await contactsService.getContactById(contactId);

  if (!foundContact) {
    throw HttpError(404, "Not found");
  }

  res.json(foundContact);
};

const addNewContact = async (req, res) => {
  const addedContact = await contactsService.addContact(req.body);
  res.status(201).json(addedContact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateContact(
    contactId,
    req.body
  );

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await contactsService.removeContact(contactId);

  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }

  res.json({
    message: "contact deleted",
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addNewContact: ctrlWrapper(addNewContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
