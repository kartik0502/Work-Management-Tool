const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    attachments: {
        type: Array,
        default: []
    },
}, { timestamps: true });

module.exports = mongoose.model('Tasks', taskSchema);
