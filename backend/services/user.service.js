const userModel = require("../models/user.model");
const CommonServices = require("./common.service");

class Service extends CommonServices {
  async login(username, password) {
    const user = await userModel.findOne({ username });
    if (!user) throw "Invalid username";

    const hashedPassword = user.password;
    const passwordMatch = await this.verifyHash(hashedPassword, password);
    if (!passwordMatch) throw "Incorrect password";

    return user;
  }

  async register(username, password, email) {
    const hashedPassword = await this.hash(password);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    await this.save(newUser);
  }

  async getByMail(email) {
    const user = await userModel.findOne({ email });
    return user;
  }
}

module.exports = Service;
