const express = require("express");
const router = express.Router();
const Employee = require('../models/employeeModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const empauthMiddleware = require("../middleware/empauthMiddleware"); // Changed middleware name

router.post("/empregister", async (req, res) => {
    try {
        const employeeExists = await Employee.findOne({ empemail: req.body.empemail });
        if (employeeExists) {
            return res.status(200).send({ message: "employee already exists", success: false });
        }
        const emppassword = req.body.emppassword;
        const salt = await bcrypt.genSalt(10);
        const hashedempPassword = await bcrypt.hash(emppassword, salt);
        req.body.emppassword = hashedempPassword;
        const newemployee = new Employee(req.body); // Corrected variable name
        await newemployee.save(); // Corrected variable name
        res.status(200).send({ message: "employee Created Successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "employee Creation Failed", success: false, error });
    }
});

router.post("/emplogin", async (req, res) => {
    try {
        const employee = await Employee.findOne({ empemail: req.body.empemail });
        if (!employee) {
            return res.status(200).send({ message: "employee does not exist", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.emppassword, employee.emppassword);
        if (!isMatch) {
            return res.status(200).send({ message: "Password is incorrect", success: false });
        } else {
            const tokens = jwt.sign({ empid: employee._id }, process.env.JWT_SECRET, { // Changed property name
                expiresIn: "1d"
            });
            res.status(200).send({ message: "Login Successful", success: true, data: tokens }); // Changed variable name
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error login in", success: false, error });
    }
});

router.post('/get-employee-info-by-id', empauthMiddleware, async (req, res) => { // Changed middleware name
    try {
        const employee = await Employee.findOne({ _id: req.body.employeeId });
        // employee.emppassword = undefined;
        if (!employee) {
            return res.status(200).send({ message: "employee does not exist", success: false });
        } else {
            res.status(200).send({
                message: "employee found", success: true, data: {
                    empid:employee._id,
                    empemail: employee.empemail,
                    empname: employee.empname,
                    empdob:employee.empdob,
                    empgender:employee.empgender,
                    empemployeeType:employee.empemployeeType,
                    empaddress:employee.empaddress,
                    empworkExperienceQualifications:employee.empworkExperienceQualifications,



                }
            });
        }
    } catch (error) {
        res.status(500).send({ message: "Error getting employee info", success: false, error });
    }
});

//new added
router.get('/getempregister', async (req, res) => {
    try {
        const employee = await Employee.find(); 
        if (!employee || employee.length === 0) {
            return res.status(404).send({ message: "No employee found.", success: false });
        }
        res.status(200).send({ employee, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to retrieve employee.", success: false, error });
    }
});


//delete 
router.delete('/deletebooking/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).send({ message: "Employee not found.", success: false });
        }
        res.status(200).send({ message: "Employee deleted successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to delete Employee.", success: false, error });
    }
});


router.get('/getEmpRegister2/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).send({ message: "No Employee found.", success: false });
        }
        res.status(200).send({ employee, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to retrieve Employee.", success: false, error });
    }
});

router.put('/updateEmpRegister/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Employee.findByIdAndUpdate(id, req.body, { new: true });
        if(!updated) {
            return res.status(404).json({ success: false, message: "Detail not found." });
        }
        res.json({ success: true, message: "Employee details updated successfully.", booking: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

module.exports = router;
