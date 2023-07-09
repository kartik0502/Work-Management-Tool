const router = require('express').Router();
const notification = require('../models/notificationsModel');
const authMiddleware = require('../middlewares/authMiddleware');

// add notification
router.post('/add', authMiddleware, async (req, res) => {
    console.log(req.body);
    try {
        const newNotification = new notification(req.body);
        await newNotification.save();
        res.send({
            success: true,
            data: newNotification,
            message: 'Notification added successfully'
        });
    } catch (err) {
        res.send({
            error: err.message,
            success: false
        })
    }
});

// get all notifications

router.get('/get-notification', authMiddleware, async (req, res) => {
    try {
        const notifications = await notification.find({ user: req.body.userId }).populate('user', 'name').sort({ createdAt: -1 });
        res.send({
            success: true,
            data: notifications,
            message: 'Notifications fetched successfully'
        });
    } catch (err) {
        res.send({
            error: err.message,
            success: false
        })
    }
});

// mark notification as read

router.post('/mark-as-read', authMiddleware, async (req, res) => {
    try {
        await notification.updateMany({
            user: req.body.userId,
            read: false
        }, {
            read: true
        });

        const response = await notification.find({ user: req.body.userId }).populate('user', 'name').sort({ createdAt: -1 });
        res.send({
            success: true,
            message: 'Notifications marked as read successfully',
            data: response
        });
    }
    catch (err) {
        res.send({
            error: err.message,
            success: false
        })
    }
});

// delete all notification  

router.delete('/delete-all', authMiddleware, async (req, res) => {
    try {
        await notification.deleteMany({
            user: req.body.userId
        });

        res.send({
            success: true,
            message: 'Notifications deleted successfully'
        });
    }
    catch (err) {
        res.send({
            error: err.message,
            success: false
        })
    }
});

module.exports = router;