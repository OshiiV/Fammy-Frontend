const express = require("express");
const router = express.Router();
//Insert Model
const Infrom = require("../Model/AllocateModel");

//Insert Controller
const InformController = require("../controllers/InformControllers");

router.post("/", InformController.addInform);

//export
module.exports = router;