const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../decorators");

const { isValidId, authenticate } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const addContactValidate = validateBody(schemas.contactAddSchema);
const updateContactFavoriteValidate = validateBody(
  schemas.contactUpdateFavoriteSchema
);

const router = express.Router();

router.use(authenticate);

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", addContactValidate, ctrl.addNewContact);

router.put("/:contactId", isValidId, addContactValidate, ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  updateContactFavoriteValidate,
  ctrl.updateStatusContact
);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

module.exports = router;
