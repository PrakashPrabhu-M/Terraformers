const bcrypt = require("bcrypt");

class Common {
  async save(doc) {
    await doc.save();
  }

  async hash(data) {
    const hashedData = await bcrypt.hash(data, 10);
    return hashedData;
  }

  async verifyHash(hash, str) {
    const isEqual = await bcrypt.compare(str, hash);
    return isEqual;
  }
}

module.exports = Common;
