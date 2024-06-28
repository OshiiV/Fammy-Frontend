const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    empname: {
        type:String,
        required:true
    },
    empdob: {
        type:String,
        required:true
    },
    empgender: {
        type:String,
        required:true
    },
    empemployeeType: {
        type:String,
        required:true
    },
    empaddress: {
        type:String,
        required:true
    },
    empworkExperienceQualifications: {
        type:String,
        required:true
    },
    empemail: {
        type:String,
        required:true
    },
    emppassword: {
        type:String,
        required:true
    }
},
{

    timestamps: true
})

const employeeModel = mongoose.model("Employee", employeeSchema); // Use mongoose.model() instead of mongoose.Model()

module.exports = employeeModel;