const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: String,
        required: true,
        default: 'active'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [MemberSchema]
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);

