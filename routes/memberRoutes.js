const express = require("express");
const router = express.Router();
const {getAllMember, getMemberById} = require("../controllers/memberController")

// get all member
router.get("/", getAllMember);

router.get("/:id", getMemberById);

module.exports = router;
