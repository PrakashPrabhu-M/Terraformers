const validator = require("validator");

const template = (value, verify) => {
  const isValid = validator[verify](value);
  return isValid;
};

const password = (value, helper) => {
  if (template(value, "isStrongPassword")) return true;
  return helper.message(
    "Password must contain atleast 8 charaters, 1 uppercase, 1 lowercase and a symbol"
  );
};

const email = (value, helper) => {
  if (template(value, "isEmail")) return true;
  return helper.message("Invalid email");
};

module.exports = { password, email };
