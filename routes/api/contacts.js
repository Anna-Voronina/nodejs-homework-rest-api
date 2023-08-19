const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../decorators");

const schemas = require("../../schemas/contacts");

const addContactValidate = validateBody(schemas.contactAddSchema);

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", addContactValidate, ctrl.addNewContact);

router.put("/:contactId", addContactValidate, ctrl.updateContact);

router.delete("/:contactId", ctrl.deleteContact);

module.exports = router;
