const express = require("express");
const Joi = require("joi");

const contactsService = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone number field",
  }),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const foundContact = await contactsService.getContactById(contactId);

    if (!foundContact) {
      throw HttpError(404, "Not found");
    }

    res.json(foundContact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const addedContact = await contactsService.addContact(req.body);
    res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const updatedContact = await contactsService.updateContact(
      contactId,
      req.body
    );

    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contactsService.removeContact(contactId);

    if (!deletedContact) {
      throw HttpError(404, "Not found");
    }

    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
