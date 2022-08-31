const jobServices = require("../services/job.service");
const userServices = require("../services/user.service");

const Job = new jobServices();
const User = new userServices();

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.activeJobs();
    res.status(200).json(jobs);
  } catch (error) {
    console.log(
      "------------------------in job controller--------------------------------",
      error
    );
    res.status(400).json(error);
  }
};

const getInterestedUsers = async (req, res) => {
  try {
    const jobId = req.body.jobId;
    const data = await Job.interestedUsers(jobId);
    console.log("user ids", data);
    const users = [];
    for (let obj of data) {
      const user = await User.getByMail(obj.interestedUsers);
      users.push(user);
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(
      "------------------------in job controller--------------------------------",
      error
    );
    res.status(400).json(error);
  }
};

const getMarkedJobs = async (req, res) => {
  try {
    const jobs = await Job.markedJob(req.user.email);
    res.json(jobs);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const postaddJob = async (req, res) => {
  try {
    const { title, description, location, deadline, phno, email, status } =
      req.body;
    const addedBy = req.user.email;
    // console.log(req.user);
    const newJob = await Job.addJob(
      title,
      description,
      location,
      deadline,
      phno,
      email,
      status,
      addedBy
    );
    res.json(newJob);
  } catch (error) {
    console.log(
      "------------------------in job controller--------------------------------",
      error
    );
    res.status(400).json(error);
  }
};

const patchInterest = async (req, res) => {
  try {
    const { jobId } = req.body;
    const update = await Job.markInterest(jobId, req.user.email);
    res.json(update);
  } catch (error) {
    console.log(
      "------------------------in job controller--------------------------------",
      error
    );
    res.status(400).json(error);
  }
};

const unPatchInterest = async (req, res) => {
  try {
    const { jobId } = req.body;
    const update = await Job.unMarkInterest(jobId, req.user.email);
    res.json(update);
  } catch (error) {
    console.log(
      "------------------------in job controller--------------------------------",
      error
    );
    res.status(400).json(error);
  }
};

module.exports = {
  getInterestedUsers,
  getJobs,
  getMarkedJobs,
  postaddJob,
  patchInterest,
  unPatchInterest,
};
