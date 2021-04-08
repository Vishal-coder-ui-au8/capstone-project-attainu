var mongoose = require('mongoose');

var ClassSchema = new mongoose.Schema({
    std:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    rollno: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    feesamt: {
        type: Number,
        required: true
    },
    feespaid: {
        type: Boolean,
        required: true
    },
    paymentmode: {
        type: String,
        required: false
    },
    paymentdate: {
        type: Date,
        required: false
    },
    firstreminder: {
        type: Boolean,
        required: false
    },
    secondreminder: {
        type: Boolean,
        required: false
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
});



const Standard = mongoose.model('standard',ClassSchema)

module.exports = Standard;