const express = require("express");

const ctrl = require("../../controllers/users");

const { validateBody } = require("../../decorators");

const { authenticate, upload } = require("../../middlewares");

const schemas = require("../../schemas/users");

const router = express.Router();

const registerValidate = validateBody(schemas.userRegisterSchema);
const loginValidate = validateBody(schemas.userLoginSchema);
const updateSubscriptionValidate = validateBody(
  schemas.updateSubscriptionSchema
);
const emailValidate = validateBody(schemas.emailSchema);

router.post("/register", registerValidate, ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", emailValidate, ctrl.resendVerificationEmail);

router.post("/login", loginValidate, ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  updateSubscriptionValidate,
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
