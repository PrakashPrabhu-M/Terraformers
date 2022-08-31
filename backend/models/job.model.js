const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  title: { type: String, required: true, default: "Full Stack developer" },
  description: { type: String, required: true, default: "MERN" },
  location: { type: String, required: true, default: "WFH" },
  deadline: { type: Date, required: true },
  phno: { type: Number, required: true, default: 1234567890 },
  email: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "archive"],
    default: "active",
  },
  interestedUsers: { type: [String] },
  order: { type: Number, required: true, unique: true },
  addedBy: { type: String, required: true },
});

const jobModel = mongoose.model("jobs", jobSchema);

module.exports = jobModel;
