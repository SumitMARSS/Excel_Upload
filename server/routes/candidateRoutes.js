const express = require("express");
const { uploadCandidates } = require("../controllers/candidateController");

const router = express.Router();

router.post("/upload", uploadCandidates);

module.exports = router;
