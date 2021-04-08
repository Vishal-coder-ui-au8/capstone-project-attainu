var mongoose = require('mongoose');

var StaffSchema = new mongoose.Schema({
    empid:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    category: {
        type: String,
        required: true
    },    
    joiningdate: {
        type: Date,
        required: true
    },    
    dept: {
        type: String,
        required: false
    },
    basicsalary: {
        type: Number,
        required: false
    },
    bonus: {
        type: Number,
        required: false
    },
    deductions: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});



const Staff = mongoose.model('staff',StaffSchema)

module.exports = Staff;