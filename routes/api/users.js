const express = require("express");

const ctrl = require("../../controllers/users");

const { validateBody } = require("../../decorators");

const { authenticate } = require("../../middlewares");

const schemas = require("../../schemas/users");

const router = express.Router();

const registerValidate = validateBody(schemas.userRegisterSchema);
const loginValidate = validateBody(schemas.userLoginSchema);
const updateSubscriptionValidate = validateBody(
  schemas.updateSubscriptionSchema
);

router.post("/register", registerValidate, ctrl.register);

router.post("/login", loginValidate, ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  updateSubscriptionValidate,
  ctrl.updateSubscription
);

module.exports = router;
