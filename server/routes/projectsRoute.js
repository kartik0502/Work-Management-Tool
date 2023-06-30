const router = require('express').Router();

const Project = require('../models/projectModel');
const authMiddleware = require('../middlewares/authMiddleware');

// create a project

router.post('/create-project', authMiddleware, async (req, res) => {
    try{
        console.log(req.body)
        const newProject = new Project(req.body);
        console.log(newProject)
        await newProject.save();
        res.send({
            success: true,
            message: 'Project created successfully',
            data: newProject
        });
    }
    catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
});

// get all projects

router.get('/get-projects', authMiddleware, async (req, res) => {
    try{
        const projects = await Project.find({ owner: req.user._id });
        res.send({
            success: true,
            message: 'Projects fetched successfully',
            data: projects
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