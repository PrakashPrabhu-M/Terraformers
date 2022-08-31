const router = require("express").Router();

// controller
const {
  getInterestedUsers,
  getMarkedJobs,
  getJobs,
  postaddJob,
  patchInterest,
  unPatchInterest,
} = require("../../controllers/job.controller");

// schema validator
const schemaValidator = require("../../middlewares/schemaValidator");

// InterestedUsers schema
const {
  interestedUsersSchema,
  addJob,
} = require("../../validators/job.validators");

// InterestedUsers schema validator
const interestedUsers = schemaValidator(interestedUsersSchema, "body");
const verifyJob = schemaValidator(addJob, "body");

// token verifier
const verifytoken = require("../../middlewares/tokenVerifier");

router.get("/all", verifytoken, getJobs);
router.get("/marked", verifytoken, getMarkedJobs);
router.get(
  "/interested-users",
  verifytoken,
  interestedUsers,
  getInterestedUsers
);
router.post("/add", verifytoken, verifyJob, postaddJob);
router.patch("/mark", verifytoken, patchInterest);
router.patch("/unmark", verifytoken, unPatchInterest);

module.exports = router;
