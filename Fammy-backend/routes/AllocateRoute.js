const express = require("express");
const router = express.Router();
//Insert Model
const Allocate = require("../Model/AllocateModel");

//Insert Controller
const AllocateController = require("../controllers/AllocateControllers");

router.post("/", AllocateController.addAllocate);

//export
module.exports = router;