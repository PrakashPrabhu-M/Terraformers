const { find, findOne } = require("../models/job.model");
const jobModel = require("../models/job.model");
const CommonServices = require("./common.service");

class Service extends CommonServices {
  async interestedUsers(jobId) {
    const users = await jobModel.find(
      { _id: jobId },
      { interestedUsers: 1, _id: 0 }
    );
    return users;
  }

  async markInterest(jobId, email) {
    const interestedUsers = await jobModel.findOne(
      { _id: jobId },
      { _id: 0, interestedUsers: 1 }
    );

    if (interestedUsers && interestedUsers.interestedUsers.includes(email)) {
      throw "User already marked";
    }

    const newData = await jobModel.findOneAndUpdate(
      { _id: jobId },
      { $push: { interestedUsers: email } },
      { new: true }
    );

    if (!newData) throw "No job found";

    return newData;
  }

  async unMarkInterest(jobId, email) {
    const interestedUsers = await jobModel.findOne(
      { _id: jobId },
      { _id: 0, interestedUsers: 1 }
    );

    if (interestedUsers && !interestedUsers.interestedUsers.includes(email)) {
      throw "User does not exist";
    }

    const newData = await jobModel.findOneAndUpdate(
      { _id: jobId },
      { $pull: { interestedUsers: email } },
      { new: true }
    );

    if (!newData) throw "No job found";

    return newData;
  }

  async activeJobs() {
    const jobs = await jobModel.find({ status: "active" });
    return jobs;
  }

  async archivedJobs() {
    const jobs = await jobModel.find({ status: "archive" });
    return jobs;
  }

  async noOfjobs() {
    const count = await jobModel.find({}).count();
    return count;
  }

  async addJob(
    title,
    description,
    location,
    deadline,
    phno,
    email,
    status,
    addedBy
  ) {
    const order = await this.noOfjobs();
    const job = await jobModel.create({
      title,
      description,
      location,
      deadline,
      phno,
      email,
      status,
      order,
      addedBy,
    });
    this.save(job);
  }

  // To archive a job
  setKey = (key) => async (jobId, value) => {
    const updatedData = await jobModel.findOneAndUpdate(
      { _id: jobId },
      { [key]: value },
      { new: true }
    );
    return updatedData;
  };

  async remove(jobId) {
    await jobModel.findOneAndDelete({ _id: jobId });
  }

  async markedJob(email) {
    const jobs = await jobModel.find({
      interestedUsers: { $elemMatch: { $in: email } },
    });
    return jobs;
  }
}

module.exports = Service;
