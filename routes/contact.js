let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to model
let Contact = require('../models/contact');

//Manage routes
router.get('/', (req, res, next) => {
    Contact.find((err, contactList) => {
        if(err){
            return console.error(err);
        }else{
            
            res.render('contact/list', {title: 'Contact Info', ContactList: contactList})
        }
    });
});

// to open add contact page
router.get('/add', (req, res, next) => {
    res.render('contact/add', {title: 'Add Contact'})
});

// insert contact data into mongoDB collection
router.post('/add', (req, res, next) => {
    //getting data from form
    let newContact = Contact({
        "fname": req.body.fname,
        "lname": req.body.lname,
        "cphone": req.body.cphone,
        "cemail": req.body.cemail,
        "cmessage" : req.body.cmessage,
        "createdDate": Date.now(),
        "updatedDate": Date.now()
    });

    //insert data into the mongoDB
    Contact.create(newContact, (err, Contact) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/contacts')
        }
    });
});

//Retrieve data from MongoDB and Open it in view (FORM)
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contactToEdit) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            //write code to display data in view
            res.render('contact/edit', { title : 'Edit Contact', contact: contactToEdit})
        }
    });
});

//write code to store updated data into MongoDB
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updatedContact = Contact({
        "_id": id,
        "fname": req.body.fname,
        "lname": req.body.lname,
        "cphone": req.body.cphone,
        "cemail": req.body.cemail,
        "cmessage" : req.body.cmessage,
        "updatedDate": Date.now()
    });


    Contact.findByIdAndUpdate(id, updatedContact, { new: true }, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/contacts');
        }
    });
    

});

//to delete documents from the collection
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/contacts');
        }
    });
});

module.exports = router;