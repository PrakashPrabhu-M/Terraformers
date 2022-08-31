const schemaValidator = (schema, from) => (req, res, next) => {
  const data = req[from];
  const isValid = schema.validate(data);
  if (!isValid.error) return next();
  res.json(isValid.error);
};

module.exports = schemaValidator;
