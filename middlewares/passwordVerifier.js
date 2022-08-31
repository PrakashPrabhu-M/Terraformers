const { PASSWORD } = process.env;

const passwordVerifier = (req, res, next) => {
  const { password } = req.headers;
  if (!password) res.status(403).send("No password found in header");
  if (password !== PASSWORD) res.status(401).send("Header password Incorrect");
  return next();
};

module.exports = passwordVerifier;
