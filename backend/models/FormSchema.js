var mongoose = require('mongoose');


var FormSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

mongoose.model('Form',FormSchema);
module.exports = mongoose.model('Form');