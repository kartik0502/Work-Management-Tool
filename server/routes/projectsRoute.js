const router = require('express').Router();

const Project = require('../models/projectModel');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/userModel');

// create a project

router.post('/create-project', authMiddleware, async (req, res) => {
    try{
        const newProject = new Project(req.body);
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

router.post('/get-projects', authMiddleware, async (req, res) => {
    try{
        const projects = await Project.find({owner : req.body.userId}).sort({updatedAt: -1});
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

// get a project by role

router.post('/get-project-by-role', authMiddleware, async (req, res) => {
    try{
        const userId = req.body.userId;
        const projects = await Project.find({ "members.user": userId })
        .sort({
          createdAt: -1,
        }).populate("owner")
    
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

// get a project by id

router.post('/get-project-by-id', authMiddleware, async (req, res) => {
    try{
        const project = await Project.findById(req.body.id).populate("owner").populate("members.user");
        res.send({
            success: true,
            message: 'Project fetched successfully!',
            data: project
        });
    }
    catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
});

// edit a project

router.post('/edit-project', authMiddleware, async (req, res) => {
    try{
        await Project.findByIdAndUpdate(req.body.projectId, req.body);
        res.send({
            success: true,
            message: 'Project updated successfully'
        });
    }
    catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
});

// delete a project

router.post('/delete-project', authMiddleware, async (req, res) => {
    try{
        console.log(req.body);
        await Project.findByIdAndDelete(req.body.projectId);
        res.send({
            success: true,
            message: 'Project deleted successfully'
        });
    }
    catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
});


// add a member to a project

router.post('/add-member', authMiddleware, async (req, res) => {
    try{
        const { projectId, email, role } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.send({
                success: false,
                message: 'User not found!'
            });
        }
        
        const project = await Project.findByIdAndUpdate(projectId, {
            $push: {
                members: {
                    user: user._id,
                    role
                }
            }
        });
        
        res.send({
            success: true,
            message: 'Member added successfully',
            data: project
        });

    }
    catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
});

// remove a member from a project

router.post('/remove-member', authMiddleware, async (req, res) => {
    try{
        const project = await Project.findById(req.body.projectId);
        console.log(project);
        project.members.pull(req.body.memberId);
        await project.save();
        res.send({
            success: true,
            message: 'Member removed successfully'
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