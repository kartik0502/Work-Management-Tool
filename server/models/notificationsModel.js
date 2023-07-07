const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    onclick: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true});

module.exports = mongoose.model('Notifications', NotificationsSchema);