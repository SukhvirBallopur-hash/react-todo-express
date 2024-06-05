var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        default: ''
    },
    taskDescription: {
        type: String
    },
    taskStartingTime: {
        type: String,
        default: ''
    }
});
var task = new mongoose.model('Task', schema);
module.exports = task;