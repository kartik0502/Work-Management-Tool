const router = require('express').Router();
const Task = require('../models/taskModel');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/userModel');
const Project = require('../models/projectModel');

// create a task
console.log('tasksRoute.js');
router.post('/create-task', authMiddleware, async (req, res) => {
    try{
        const newTask = new Task(req.body);
        await newTask.save();
        res.send({
            success: true,
            message: 'Task created successfully',
            data: newTask
        });
    }
    catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
});

// get all tasks

router.post('/get-tasks', authMiddleware, async (req, res) => {
    try{
        const tasks = await Task.find({projectId: req.body.projectId}).sort({updatedAt: -1}).populate('assignedTo').populate('assignedBy').populate('projectId')
        res.send({
            success: true,
            message: 'Tasks fetched successfully',
            data: tasks
        });
    }
    catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
});

// update a task
router.post('/update-task', authMiddleware, async (req, res) => {
    try{
        await Task.findByIdAndUpdate(req.body.taskId, req.body);
        res.send({
            success: true,
            message: 'Task updated successfully'
        });
    }
    catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
});

// delete a task
router.post('/delete-task', authMiddleware, async (req, res) => {
    try{
        await Task.findByIdAndDelete(req.body.taskId);
        res.send({
            success: true,
            message: 'Task deleted successfully'
        });
    }
    catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
});
module.exports = router;