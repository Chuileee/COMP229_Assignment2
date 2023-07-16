let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to model
let Project = require('../models/project');

//Manage routes
router.get('/', (req, res, next) => {
    Project.find((err, projectList) => {
        if(err){
            return console.error(err);
        }else{
            
            res.render('project/list', {title: 'Project Info', ProjectList: projectList})
            
        }
    });
});

// to open add student page
router.get('/add', (req, res, next) => {
    res.render('project/add', {title: 'Add Project'})
});

// insert student data into mongoDB collection
router.post('/add', (req, res, next) => {
    //getting data from form
    let newProject = Project({
        "pname": req.body.pname,
        "pdescription" : req.body.pdescription,
        "pdeadline" : req.body.pdeadline,
        "loanApplied" : req.body.loanApplied === 'on', 
        "createdDate": Date.now(),
        "updatedDate": Date.now()
    });

    //insert data into the mongoDB
    Project.create(newProject, (err, project) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/projects')
        }
    });
});

//Retrieve data from MongoDB and Open it in view (FORM)
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    Project.findById(id, (err, projectToEdit) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            //write code to display data in view
            res.render('project/edit', { title : 'Edit Project', project: projectToEdit})
            
        }
    });
});

//write code to store updated data into MongoDB
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updatedProject = Project({
        "_id": id,
        "pname": req.body.pname,
        "pdescription" : req.body.pdescription,
        "pdeadline" : req.body.pdeadline,
        "loanApplied" : req.body.loanApplied === 'on',
        "updatedDate": Date.now()
    });


    Project.findByIdAndUpdate(id, updatedProject, { new: true }, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/projects');
        }
    });
    

});

//to delete documents from the collection
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    Project.remove({_id: id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/projects');
        }
    });
});

module.exports = router;