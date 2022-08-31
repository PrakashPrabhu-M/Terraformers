const router = require("express").Router();

// controller
const {
  postLogin,
  postRegister,
} = require("../../controllers/user.controller");

// schema validator
const schemaValidator = require("../../middlewares/schemaValidator");

// login schema register schema
const {
  loginSchema,
  registerSchema,
} = require("../../validators/user.validators");

// login, register validation
const loginValidation = schemaValidator(loginSchema, "body");
const registerValidation = schemaValidator(registerSchema, "body");

router.post("/login", loginValidation, postLogin);
router.post("/register", registerValidation, postRegister);

module.exports = router;
