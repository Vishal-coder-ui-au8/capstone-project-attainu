var mongoose = require('mongoose');


var TimetableSchema = new mongoose.Schema({
    _id:{
        type: Number,
        required:true
    },
    std: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    period: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    assignedto: {
        type: String,
        required: true
    },
   
}, { _id: false });

mongoose.model('Timetable',TimetableSchema);
module.exports = mongoose.model('Timetable');