const userServices = require("../services/user.service");
const User = new userServices();

const jwt = require("jsonwebtoken");
const secret = process.env.ACCESS_TOKEN;

const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.login(username, password);

    if (user) {
      const accessToken = jwt.sign({user}, secret, { expiresIn: "1hr" });
      res.json({ accessToken });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const postRegister = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    await User.register(username, password, email);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { postLogin, postRegister };
