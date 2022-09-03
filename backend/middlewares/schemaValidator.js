const schemaValidator = (schema, from) => (req, res, next) => {
  const data = req[from];
  console.log(data);
  const isValid = schema.validate(data);
  if (!isValid.error) return next();
  res.status(400).json(isValid.error);
};

module.exports = schemaValidator;
